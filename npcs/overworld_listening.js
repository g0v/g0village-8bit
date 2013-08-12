/*
 mouinfo
 */
window.overworldListeningScript = function (vnEngine) {
    var counter = 0;
    var space = function () {
        if (!vnEngine.isWriting() && !vnEngine.isAnimating()) {
            switch (counter) {
                case 0:
                    vnEngine.hideInteraction();

                    vnEngine.setName("福利請聽");
                    vnEngine.setText("嗨! 您好～\n一個成功的社會，並不是看富裕的人過得多優渥，\n而是弱勢者如何自在的生存。");
                    vnEngine.setPortrait("assets/listening.png");
                    vnEngine.showDialog();
                    counter = 1;
                    break;

                case 1:
                    vnEngine.setText("想知道「福利請聽」都在做些什麼嗎？");
                    $.when(vnEngine.animateMessage()).then(function () {
                        $.when(vnEngine.promptQuestion(["想！", "不想耶！"])).then(function (choice) {
                            switch (choice) {
                                case 1:
                                    Crafty.audio.muteMusic('music');
                                    openUrlInBox('http://listening.g0v.tw/', {
                                        onClosed: function() {
                                            Crafty.audio.unmuteMusic('music');
                                        }
                                    });
                                    if (Hero.gameFlags.interacted_with_listening) {
                                        break;
                                    }

                                    Hero.followers++;
                                    Hero.contributions += 10;
                                    Hero.gameFlags.interacted_with_listening = true;
                                    Crafty.trigger("HeroObjectChanged");
                                    vnEngine.setText("你現在認識「福利請聽」了！ LV+1");
                                    vnEngine.animateMessage();
                                    break;
                                case 2:
                                    vnEngine.setText("沒關係，想知道時可以隨時問我！");
                                    counter = 3;
                                    vnEngine.animateMessage();
                                    break;
                            }
                        });
                    });
                    counter=2;
                    break;

                case 2:
                    vnEngine.setText("請您長期關注 http://listening.g0v.tw/ ");
                    $.when(vnEngine.animateMessage()).then(function () {
                        //derp
                    });
                    counter = -1;
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
