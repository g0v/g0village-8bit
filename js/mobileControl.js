// Mobile touch controls - tap-to-move with pathfinding
var isMobile = Crafty.mobile || ('ontouchstart' in window) || window.innerWidth < 900;

Crafty.c('AutoWalk', {
  _waypoints: [],
  _walking: false,
  _targetNPC: null,

  init: function() {
    this.bind('EnterFrame', this._autoWalkFrame);
  },

  remove: function() {
    this.unbind('EnterFrame', this._autoWalkFrame);
  },

  walkTo: function(waypoints, onComplete) {
    this._waypoints = waypoints.slice();
    this._walking = true;
    this._onComplete = onComplete || null;
    return this;
  },

  stopWalk: function() {
    this._waypoints = [];
    this._walking = false;
    this._targetNPC = null;
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

    // Update animation direction
    var direction = { x: dx / dist, y: dy / dist };
    this.trigger('NewDirection', direction);

    // Move using movable component
    if (this.moveSingleFrame) {
      this.moveSingleFrame(direction);
    }
  }
});

function setupMobileControls(playerEntity) {
  if (!isMobile) return;

  // Bind to document — #herp WebGL canvas sits above #cr-stage and
  // intercepts all touch events, so we must listen at document level.
  document.addEventListener('click', function(e) {
    handleTap(e.clientX, e.clientY, playerEntity);
  });

  document.addEventListener('touchend', function(e) {
    var touch = e.changedTouches[0];
    handleTap(touch.clientX, touch.clientY, playerEntity);
  });
}

function handleTap(screenX, screenY, playerEntity) {
  // 對話顯示中：點擊 = 換下一句（等同空白鍵）；關閉動畫中不攔截，讓點擊可觸發 pathfinding
  var vnList = Crafty("NovelInterface");
  if (vnList.length > 0) {
    var vnEngine = new Crafty(vnList[0]);
    if (vnEngine.isShowing && vnEngine.isShowing() && (vnEngine.isHiding === undefined || !vnEngine.isHiding())) {
      // 選項選單中：用座標 hit-test 選項，觸控裝置上 #herp 會攔截事件，選項收不到 MouseUp
      if (vnEngine.isPrompting && vnEngine.isPrompting()) {
        var choice = vnEngine.hitTestChoice ? vnEngine.hitTestChoice(screenX, screenY) : 0;
        if (choice >= 1 && choice <= 3) {
          vnEngine.confirmChoice(choice);
          return;
        }
      }
      Crafty.trigger("KeyDown", { key: 32 });
      return;
    }
  }

  // Convert screen coords to world coords
  var worldX = screenX - Crafty.viewport.x;
  var worldY = screenY - Crafty.viewport.y;

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
        playerEntity.trigger('NewDirection', { x: 0, y: 0 }); // stop animation
        // Trigger interaction on the NPC
        tappedNPC.trigger('PlayerInteracted');
      });
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
  isMobile: isMobile
};
