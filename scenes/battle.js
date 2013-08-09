window.battleScene = function () {
    console.log("entering a battle");

    Crafty.background("#ccc");

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

    var clkaoScript = (function () {
        var counter = 0;
        var space = function () {
            console.log("space " + counter);
            switch (counter) {
                default:
                    btEngine.setName(Boss.name);
                    btEngine.setPortrait(Boss.avatar);
                    btEngine.setText(Boss.name + "> 單憑你一個人，想要挑戰我，那是不可能的！");
                    btEngine.showDialog();
                    counter = 1;
                    break;
                case 1:
                    btEngine.setText(Hero.name + "> 召喚 GitHub 上的 g0v 伙伴！");
                    btEngine.animateMessage();
                    counter++;
                    break;
                case 2:
                    btEngine.setText(HeroPartner.name + " 趕來幫助 " + Hero.name + "。");
                    btEngine.animateMessage();
                    counter++;
                    break;
                case 3:
                    btEngine.setText("（夥伴的 HP/LV 是由 contribution/followers 換算而來。）");
                    btEngine.animateMessage();
                    counter++;
                    break;
                case 4:
                    btEngine._heroPartnerBG.attr({alpha: 1});
                    btEngine._heroPartnerName.attr({alpha: 1});
                    btEngine._heroPartnerHP.attr({alpha: 1});
                    btEngine._heroPartnerLV.attr({alpha: 1});
                    btEngine.setText(HeroPartner.name + "> 我們一起對抗挖坑給人家跳的 " + Boss.name + "吧！");
                    btEngine.animateMessage();
                    counter = 6;
                    break;
                case 6:
                    btEngine.setText(HeroPartner.name + "> " + HeroPartner.bio);
                    btEngine.animateMessage();
                    counter = 7;
                    break;
                case 7:
                    btEngine.setText(Hero.name + "> 衝啊！");
                    btEngine.animateMessage();
                    counter = 8;
                    break;
                case 8:
                    btEngine.setText("/* 還沒寫完！Reload Browser 試試伙伴的手氣吧! */");
                    btEngine.animateMessage();
                    counter = 8;
                    break;

                /* battle dirty hack */
                case 1000:
                    vnEngine.setPortrait("assets/clkaoangry.png");
                    vnEngine.setText("選擇戰鬥指令：");
                    $.when(vnEngine.animateMessage()).then(function () {
                        $.when(vnEngine.promptQuestion(["戰鬥", "投", "我要挑戰村長!!!"])).then(function (choice) {

                        });
                    });
                    break;

                /* battle finished */
                case 5000:
                    break;
            }
        };
        var leave = function () {
            counter = 0;
        };
        var enter = function () {
        };
        return {
            spacebarCallback: space,
            leaveCallback: leave,
            enterCallback: enter
        };
    })();

    var clkao = Crafty.e("2D, Canvas, NPC").setupScript(clkaoScript);
    btEngine.addBoss(clkao);

    window.vt = btEngine;


};
