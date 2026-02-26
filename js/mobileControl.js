// Mobile touch controls - tap-to-move with pathfinding
var isMobile = Crafty.mobile || ('ontouchstart' in window) || window.innerWidth < 900;
var lastTouchAt = 0;

Crafty.c('AutoWalk', {
  _waypoints: [],
  _walking: false,
  _targetNPC: null,
  _stuckFrames: 0,
  _lastDist: null,
  _destination: null,
  _repathAttempts: 0,
  _maxRepathAttempts: 3,

  init: function() {
    this.bind('EnterFrame', this._autoWalkFrame);
  },

  remove: function() {
    this.unbind('EnterFrame', this._autoWalkFrame);
  },

  walkTo: function(waypoints, onComplete) {
    this._waypoints = waypoints.slice();
    this._walking = true;
    this._stuckFrames = 0;
    this._lastDist = null;
    this._destination = this._waypoints.length > 0 ? this._waypoints[this._waypoints.length - 1] : null;
    this._repathAttempts = 0;
    this._onComplete = onComplete || null;
    return this;
  },

  stopWalk: function() {
    this._waypoints = [];
    this._walking = false;
    this._targetNPC = null;
    this._stuckFrames = 0;
    this._lastDist = null;
    this._destination = null;
    this._repathAttempts = 0;
  },

  _tryRepath: function() {
    if (!window.Pathfinder || !this._destination || this._repathAttempts >= this._maxRepathAttempts) {
      return false;
    }
    var fromX = this._x + this._w / 2;
    var fromY = this._y + this._h / 2;
    var newPath = Pathfinder.findPath(fromX, fromY, this._destination.x, this._destination.y);
    this._repathAttempts++;
    if (!newPath || newPath.length === 0) return false;

    this._waypoints = newPath;
    this._stuckFrames = 0;
    this._lastDist = null;
    return true;
  },

  _autoWalkFrame: function() {
    if (!this._walking || this._waypoints.length === 0) {
      this._walking = false;
      if (this._onComplete) {
        var cb = this._onComplete;
        this._onComplete = null;
        cb();
      }
      return;
    }

    var target = this._waypoints[0];
    var dx = target.x - (this._x + this._w / 2);
    var dy = target.y - (this._y + this._h / 2);
    var dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 8) {
      this._waypoints.shift();
      if (this._waypoints.length === 0) {
        this._walking = false;
        if (this._onComplete) {
          var cb = this._onComplete;
          this._onComplete = null;
          cb();
        }
      }
      return;
    }

    // Keep movement axis-aligned to match 4-way pathfinding grid.
    var primaryDirection = { x: 0, y: 0 };
    var secondaryDirection = { x: 0, y: 0 };
    if (Math.abs(dx) >= Math.abs(dy)) {
      primaryDirection.x = dx > 0 ? 1 : -1;
      if (Math.abs(dy) > 1) secondaryDirection.y = dy > 0 ? 1 : -1;
    } else {
      primaryDirection.y = dy > 0 ? 1 : -1;
      if (Math.abs(dx) > 1) secondaryDirection.x = dx > 0 ? 1 : -1;
    }
    this.trigger('NewDirection', primaryDirection);

    // Move using movable component
    if (this.moveSingleFrame) {
      var oldX = this._x;
      var oldY = this._y;
      this.moveSingleFrame(primaryDirection);
      var moved = (Math.abs(this._x - oldX) > 0.01) || (Math.abs(this._y - oldY) > 0.01);
      if (!moved && (secondaryDirection.x !== 0 || secondaryDirection.y !== 0)) {
        this.trigger('NewDirection', secondaryDirection);
        this.moveSingleFrame(secondaryDirection);
        moved = (Math.abs(this._x - oldX) > 0.01) || (Math.abs(this._y - oldY) > 0.01);
      }

      // Guard against getting stuck by collisions while trying to reach a waypoint.
      if (!moved || (this._lastDist !== null && dist >= this._lastDist - 0.5)) {
        this._stuckFrames++;
        if (this._stuckFrames >= 8) {
          if (!this._tryRepath()) {
            this._waypoints.shift();
            this._stuckFrames = 0;
            this._lastDist = null;
            if (this._waypoints.length === 0) {
              this._walking = false;
              if (this._onComplete) {
                var cb = this._onComplete;
                this._onComplete = null;
                cb();
              }
            }
          }
          return;
        }
      } else {
        this._stuckFrames = 0;
      }
      this._lastDist = dist;
    }
  }
});

function setupMobileControls(playerEntity) {
  if (!isMobile) return;

  // Bind to document — #herp WebGL canvas sits above #cr-stage and
  // intercepts all touch events, so we must listen at document level.
  document.addEventListener('click', function(e) {
    // Ignore synthetic click fired shortly after touchend on mobile browsers.
    if (Date.now() - lastTouchAt < 500) return;
    handleTap(e.clientX, e.clientY, playerEntity);
  });

  document.addEventListener('touchend', function(e) {
    lastTouchAt = Date.now();
    var touch = e.changedTouches[0];
    handleTap(touch.clientX, touch.clientY, playerEntity);
  });
}

function handleTap(screenX, screenY, playerEntity) {
  // Convert client coordinates to Crafty stage/world coordinates.
  var pos = Crafty.DOM.translate(screenX, screenY);
  var stageX = pos.x;
  var stageY = pos.y;

  // 對話顯示中：點擊 = 換下一句（等同空白鍵）；關閉動畫中不攔截，讓點擊可觸發 pathfinding
  var vnList = Crafty("NovelInterface");
  if (vnList.length > 0) {
    var vnEngine = new Crafty(vnList[0]);
    if (vnEngine.isShowing && vnEngine.isShowing() && (vnEngine.isHiding === undefined || !vnEngine.isHiding())) {
      // 選項選單中：用座標 hit-test 選項，觸控裝置上 #herp 會攔截事件，選項收不到 MouseUp
      if (vnEngine.isPrompting && vnEngine.isPrompting()) {
        var choice = vnEngine.hitTestChoice ? vnEngine.hitTestChoice(stageX, stageY) : 0;
        if (choice >= 1 && choice <= 3) {
          vnEngine.confirmChoice(choice);
          return;
        }
      }
      // 對話進行中優先推進目前對話中的 NPC，避免切換 NPC 後拿到錯的互動對象
      var activeNPC = window.MobileControl && window.MobileControl._activeNPC;
      if (activeNPC && activeNPC._interactionObj && !activeNPC.disableInteraction) {
        activeNPC.trigger('PlayerInteracted');
        return;
      }

      // 後備：找目前可互動的 NPC
      var npcs = Crafty("NPC");
      for (var i = 0; i < npcs.length; i++) {
        var npc = npcs[i];
        if (npc._interactionObj && npc._interactionObj.spacebarCallback && npc._canInteract && !npc.disableInteraction) {
          if (window.MobileControl) window.MobileControl._activeNPC = npc;
          npc.trigger('PlayerInteracted');
          return;
        }
      }
      Crafty.trigger("KeyDown", { key: 32 });
      return;
    }
  }

  // 對話框不在顯示狀態時，清掉上一次對話中的 NPC
  if (window.MobileControl) window.MobileControl._activeNPC = null;

  // stageX/stageY are already in world coordinate space.
  var worldX = stageX;
  var worldY = stageY;

  // Check if tapped on an NPC
  var tappedNPC = null;
  Crafty('NPC').each(function() {
    if (worldX >= this._x && worldX <= this._x + this._w &&
        worldY >= this._y && worldY <= this._y + this._h) {
      tappedNPC = this;
    }
  });

  var playerCX = playerEntity._x + playerEntity._w / 2;
  var playerCY = playerEntity._y + playerEntity._h / 2;

  if (tappedNPC) {
    // Navigate to NPC then interact
    var npcCX = tappedNPC._x + tappedNPC._w / 2;
    var npcCY = tappedNPC._y + tappedNPC._h / 2;
    var path = Pathfinder.findPath(playerCX, playerCY, npcCX, npcCY);
    if (path && path.length > 0) {
      // Remove last waypoint to stop just before NPC (not on top)
      if (path.length > 1) path.pop();
      playerEntity.walkTo(path, function() {
        // Face the NPC
        var dx = npcCX - (playerEntity._x + playerEntity._w / 2);
        var dy = npcCY - (playerEntity._y + playerEntity._h / 2);
        var dir = { x: dx / Math.max(1, Math.abs(dx) + Math.abs(dy)), y: dy / Math.max(1, Math.abs(dx) + Math.abs(dy)) };
        playerEntity.trigger('NewDirection', dir);
        playerEntity.trigger('NewDirection', { x: 0, y: 0 }); // stop animation
        // Trigger interaction on the NPC
        if (window.MobileControl) window.MobileControl._activeNPC = tappedNPC;
        tappedNPC.trigger('PlayerInteracted');
      });
    } else {
      // 已在 NPC 附近（或 pathfinder 回傳空路徑）時，直接觸發互動
      if (window.MobileControl) window.MobileControl._activeNPC = tappedNPC;
      tappedNPC.trigger('PlayerInteracted');
    }
  } else {
    // Navigate to tapped tile
    var path = Pathfinder.findPath(playerCX, playerCY, worldX, worldY);
    if (path && path.length > 0) {
      playerEntity.walkTo(path, null);
    }
  }
}

// Expose setup function for overworld.js to call
window.MobileControl = {
  setup: setupMobileControls,
  isMobile: isMobile,
  _activeNPC: null
};
