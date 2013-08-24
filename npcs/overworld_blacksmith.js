/*
 mouinfo
 */
window.overworldBlacksmithScript = function (vnEngine) {
    var counter = 0;
    var space = function () {
        if (!vnEngine.isWriting() && !vnEngine.isAnimating()) {
            switch (counter) {
                case 0:
                    vnEngine.hideInteraction();

                    vnEngine.setName("鐵匠");
                    vnEngine.setText("您好～我是專門破解謊言的鐵匠。\n嗯，現在正偽裝成一顆大石頭。");
                    vnEngine.setPortrait("assets/blacksmith.png");
                    vnEngine.showDialog();
                    counter = 1;
                    break;

                case 1:
                    vnEngine.setText("資訊不對等，小心受騙上當~\n來點裝備吧！");
                    $.when(vnEngine.animateMessage()).then(function () {
                        $.when(vnEngine.promptQuestion(["求職小幫手！", "新聞小幫手！", "法規亦毒氣！"])).then(function (choice) {
                            switch (choice) {
                                case 1:
                                    Crafty.audio.muteMusic('music');
                                    openUrlInBox('http://jobhelper.g0v.ronny.tw/', {
                                        onClosed: function() {
                                            Crafty.audio.unmuteMusic('music');
                                        }
                                    });
                                    if (Hero.gameFlags.interacted_with_blacksmith) {
                                        break;
                                    }

                                    Hero.followers++;
                                    Hero.contributions += 10;
                                    Hero.gameFlags.interacted_with_blacksmith = true;
                                    Crafty.trigger("HeroObjectChanged");
                                    vnEngine.setText("你現在認識「求職小幫手！」了！ LV+1");
                                    vnEngine.animateMessage();
                                    break;
                                case 2:
                                    Crafty.audio.muteMusic('music');
                                    openUrlInBox('http://newshelper.g0v.tw/', {
                                        onClosed: function() {
                                            Crafty.audio.unmuteMusic('music');
                                        }
                                    });
                                    if (Hero.gameFlags.interacted_with_blacksmith) {
                                        break;
                                    }

                                    Hero.followers++;
                                    Hero.contributions += 10;
                                    Hero.gameFlags.interacted_with_blacksmith = true;
                                    Crafty.trigger("HeroObjectChanged");
                                    vnEngine.setText("你現在認識「新聞小幫手」了！ LV+1");
                                    vnEngine.animateMessage();
                                case 3:
                                    Crafty.audio.muteMusic('music');
                                    openUrlInBox('http://blog.g0v.tw/post/58402599490', {
                                        onClosed: function() {
                                            Crafty.audio.unmuteMusic('music');
                                        }
                                    });
                                    if (Hero.gameFlags.interacted_with_blacksmith) {
                                        break;
                                    }

                                    Hero.followers++;
                                    Hero.contributions += 10;
                                    Hero.gameFlags.interacted_with_blacksmith = true;
                                    Crafty.trigger("HeroObjectChanged");
                                    vnEngine.setText("你現在認識「法規亦毒氣！」了！ LV+1");
                                    vnEngine.animateMessage();
                                    break;
                            }
                        });
                    });
                    counter=2;
                    break;

                case 2:
                    vnEngine.setText("資訊是需要明辨的啊！");
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
