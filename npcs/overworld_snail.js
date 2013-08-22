/*
 mouinfo
 */
window.overworldAutolearnScript = function (vnEngine) {
    var counter = 0;
    var space = function () {
        if (!vnEngine.isWriting() && !vnEngine.isAnimating()) {
            switch (counter) {
                case 0:
                    vnEngine.hideInteraction();

                    vnEngine.setName("無殼蝸牛");
                    vnEngine.setText("HiHi，我是蝸牛。");
                    vnEngine.setPortrait("assets/autolearn.png");
                    vnEngine.showDialog();
                    counter = 1;
                    break;

                case 1:
                    vnEngine.setText("炒房價真不應該~\n我們來看看全台各地的房屋實價吧！");
                    $.when(vnEngine.animateMessage()).then(function () {
                        $.when(vnEngine.promptQuestion(["好極", "不想耶！"])).then(function (choice) {
                            switch (choice) {
                                case 1:  // 以下待修
                                    Crafty.audio.muteMusic('music');
                                    openUrlInBox('http://cop.alearn.org.tw/', {
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
                                    vnEngine.setText("你現在認識「自學2.0」了！ LV+1");
                                    vnEngine.animateMessage();
                                    break;
                                case 2:
                                    Crafty.audio.muteMusic('music');
                                    openUrlInBox('http://map.alearn.org.tw/', {
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
                                    vnEngine.setText("你現在認識「自學地圖」了！ LV+1");
                                    vnEngine.animateMessage();
                                case 3:
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
                    vnEngine.setText("若您準備自學，記得上「自學2.0」讓別人認識你喔！");
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
