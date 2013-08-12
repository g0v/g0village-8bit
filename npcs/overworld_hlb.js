/*
 @hlb NPC
 */
window.overworldHlbScript = function (vnEngine) {
    var counter = 0;
    if (Hero.gameFlags&&Hero.gameFlags.hlb_fireapp) counter=4;
    var space = function () {
        if (!vnEngine.isWriting() && !vnEngine.isAnimating()) {
            switch (counter) {
                case 0:
                    vnEngine.hideInteraction();

                    vnEngine.setName("售票亭老板");
                    vnEngine.setText("Hey partner!");
                    vnEngine.setPortrait("assets/hlb.png");
                    vnEngine.showDialog();
                    counter = 1;
                    break;
                case 1:
                    vnEngine.setText(Hero.name + "! 你有在用 Fire.app 嗎?");
                    $.when(vnEngine.animateMessage()).then(function () {
                        $.when(vnEngine.promptQuestion(["有!", "沒有!", "..."])).then(function (choice) {
                            switch (choice) {
                                case 1:
                                    vnEngine.setPortrait("assets/hlb.png");
                                    vnEngine.setText("Cool! LV+10");
                                    Hero.followers += 10;
                                    Hero.contributions += 100;
                                    Hero.gameFlags.hlb_fireapp = true;
                                    Crafty.trigger("HeroObjectChanged");
                                    counter = 3;
                                    break;
                                case 2:
                                    vnEngine.setPortrait("assets/hlb.png");
                                    vnEngine.setText("如果您有需要使用 Fire.app 參與 g0v 專案，歡迎找我領取一套。");
                                    counter = 2;
                                    break;
                                case 3:
                                    vnEngine.setText("... 沉默是什麼意思呀?");
                                    counter = 2;
                                    break;

                            }
                            vnEngine.animateMessage();
                        });
                    })
                    break;
                case 2:
                    vnEngine.setText("你去找右上角的高村長聊聊吧!");
                    $.when(vnEngine.animateMessage()).then(function () {
                        //derp
                    });
                    counter = -1;
                    break;
                case 3:
                    vnEngine.setText("已知用火的勇者啊，去找右上角的高村長聊聊吧!");
                    vnEngine.animateMessage();
                    counter = 4;
                    break;
                case 4:
                    vnEngine.hideInteraction();

                    vnEngine.setName("售票亭老板");
                    vnEngine.setText("你已經會 Fire.app , 找右上角的高村長聊聊吧!");
                    vnEngine.setPortrait("assets/hlb.png");
                    vnEngine.showDialog();
                    break;
                default:
                    counter = -1;
                    vnEngine.hideDialog();
                    vnEngine.showInteraction();
                    counter++;
                    break;
            }
        } else if (vnEngine.isWriting()) {
            console.log("is writing");
            vnEngine.forceTextFinish();
        }
        console.log(counter);
    }
    var leave = function () {
        if (counter == 3 || counter == 4) counter = 4;
        else counter = 0;
        vnEngine.hideDialog();
        vnEngine.hideInteraction();

    }
    var enter = function () {
        vnEngine.showInteraction();
    }
    return {
        spacebarCallback: space,
        leaveCallback: leave,
        enterCallback: enter
    }
};
