window.battleScene = function () {
    console.log("entering a battle");

    Crafty.background("#ccc");

    Crafty.audio.add({
        "music": ["assets/dq3_battle.mp3", "assets/dq3_battle.ogg"]
    });

    Crafty.audio.play("music", -1);

    Crafty.sprite(1, "assets/background_taiwan.png", {
        battle_bg: [0, 0, 768, 610]
    });
    var background = Crafty.e("2D, Canvas, battle_bg").attr({
        x: 0,
        y: 0,
        z: -1
    });

    Crafty.viewport.scroll('_x', 0);
    Crafty.viewport.scroll('_y', 0);

    var btEngine = Crafty.e("BattleEngine");


    var clkao = Crafty.e("2D, Canvas, NPC").setupScript(battleClkaoScript(btEngine));
    setupBattleTouchControls(btEngine, clkao);
    btEngine.addBoss(clkao);

    window.vt = btEngine;


};

function setupBattleTouchControls(btEngine, boss) {
    var isMobile = !!(Crafty.mobile || ('ontouchstart' in window) || navigator.maxTouchPoints > 0 || window.innerWidth < 900);
    if (!isMobile) return;

    if (window.BattleTouchControl && window.BattleTouchControl.teardown) {
        window.BattleTouchControl.teardown();
    }

    var lastTouchAt = 0;
    var handleTap = function (clientX, clientY) {
        if (Crafty._current !== "battle") return;

        if (btEngine && btEngine.isPrompting && btEngine.isPrompting()) {
            var pos = Crafty.DOM.translate(clientX, clientY);
            var choice = btEngine.hitTestChoice ? btEngine.hitTestChoice(pos.x, pos.y) : 0;
            if (choice >= 1 && choice <= 3) {
                btEngine.confirmChoice(choice);
                return;
            }
        }

        if (boss && !boss._destroyed) {
            boss.trigger("PlayerInteracted");
        } else {
            Crafty.trigger("KeyDown", { key: 32 });
        }
    };

    var onClick = function (e) {
        if (Date.now() - lastTouchAt < 500) return;
        handleTap(e.clientX, e.clientY);
    };

    var onTouchEnd = function (e) {
        lastTouchAt = Date.now();
        if (!e.changedTouches || e.changedTouches.length === 0) return;
        var touch = e.changedTouches[0];
        handleTap(touch.clientX, touch.clientY);
    };

    document.addEventListener('click', onClick);
    document.addEventListener('touchend', onTouchEnd);

    window.BattleTouchControl = {
        teardown: function () {
            document.removeEventListener('click', onClick);
            document.removeEventListener('touchend', onTouchEnd);
        }
    };
}
