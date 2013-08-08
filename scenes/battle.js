window.battleScene = function() {
    console.log("entering a battle");

    Crafty.background("#ccc");
    Crafty.audio.add({
            "battle_music": ["assets/dq3_battle.mp3","assets/dq3_bgm.ogg"]
    });
    Crafty.audio.play("battle_music", -1);

    Crafty.sprite(1, "assets/background_taiwan.png", {
            battle_bg: [0,0,768, 610]
    });
    var background = Crafty.e("2D, Canvas, battle_bg").attr({
            x:0,
            y:0,
            z:-1
    });

    var btEngine = Crafty.e("BattleEngine");

    var yukkikoScript = (function() {
        var counter = 0;
        var life = 3000;
        var act = 300;
        var space = function() {
            console.log("space " + counter);
            switch (counter) {
                default:
                    btEngine.setName("Yukkiko");
                    btEngine.setPortrait("assets/yukkiko.png");
                    btEngine.setText("我的加量 " + act);
                    btEngine.showDialog();
                    counter=1;
                    break;
                case 1:
                    btEngine.setText("DERPsadfasfasfssd" + new Date());
                    btEngine.animateMessage();
                    break;
            }
        };
        var leave = function() {
            counter = 0;
        };
        var enter = function() {
        };
        return {
            spacebarCallback: space,
            leaveCallback: leave,
            enterCallback: enter
        };
    })();

    var clkao = Crafty.e("2D, Canvas, NPC").setupScript(yukkikoScript);
    btEngine.addBoss(clkao);

    window.vt = btEngine;


};
