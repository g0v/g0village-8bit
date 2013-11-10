window.overworldClkaoScript = function (vnEngine) {
    var counter = 0;
    var choice1 = 0;
    var space = function () {
        if (!vnEngine.isWriting() && !vnEngine.isAnimating()) {
            switch (counter) {
                case 0:
                    vnEngine.hideInteraction();

                    if (window.finishGame) {
                        vnEngine.setName("(前)高挫折村長");
                    } else {
                        vnEngine.setName("高挫折村長");
                    }
                    vnEngine.setText("唷~ " + Hero.name + "!");
                    vnEngine.setPortrait("assets/clkao.png");
                    vnEngine.showDialog();
                    break;
                case 1:
                    if (window.finishGame) {
                        vnEngine.setText("你現在是村長了，帶頭做個專案吧！！");
                    }
                    else {
                        vnEngine.setText("你看來是高挫折的人，沒事做就去領個專案寫寫！！\n(高挫折: 由於蔡圓仔說「聲援大埔民眾　多數是高挫折的人 」\n導致村長想改名『高挫折』，就可擁有很多「高挫折的人」了)");                        
                    }

                    vnEngine.animateMessage();
                    break;
                case 2:
	//               openUrlInBox('https://g0v.hackpad.com/g0v--MI7fGNIdygb', {
   //                                             onClosed: function () {
  //                                                  Crafty.audio.unmuteMusic('music');
 //                                               }
//                                            })
                    vnEngine.setPortrait("assets/clkaoask.png");
                    vnEngine.setText(Hero.name + "! 你想要開始一個專案了嗎?");
                    var choices = ["我很樂意!", "不想耶!", "我要挑戰村長!!!"];
                    $.when(vnEngine.animateMessage()).then(function () {
                        $.when(vnEngine.promptQuestion(choices)).then(function (choice) {
                            choice1 = choice;

                            switch (choice1) {
                                case 1:
                                    vnEngine.setPortrait("assets/clkao.png");
                                    vnEngine.setText("非常好！");

                                    vnEngine.animateMessage();
                                    break;
                                case 2:
                                    vnEngine.setPortrait("assets/clkaoangry.png");
                                    vnEngine.setText("破少年！");
                                    $.when(vnEngine.animateMessage()).then(function () {
                                        setTimeout(function () {
                                            Crafty.audio.muteMusic('music');
                                            openUrlInBox('https://www.moedict.tw/#!破少年', {
                                                onClosed: function () {
                                                    Crafty.audio.unmuteMusic('music');
                                                }
                                            })
                                        }, 1500);
                                    });
                                    counter = -2;
                                    break;
                                case 3:
                                    counter = -2;
                                    vnEngine.setPortrait("assets/clkaoangry.png");
                                    if (window.finishGame) {
                                        vnEngine.setText(Hero.name + "! 你已經是村長了， 那我們就切磋切磋吧！");
                                    } else {
                                        vnEngine.setText(Hero.name + "! 那沒什麼好說的，戰鬥吧！");
                                    }
                                    $.when(vnEngine.animateMessage()).then(function () {
                                        // save hero data to firebase
                                        heroFBRef.update(Hero, function () {
                                            setTimeout(function () {
                                                Crafty.audio.mute();
                                                Crafty.audio.mute();
                                                loadManager.loadScene(["assets/background_taiwan.png", "assets/pushenter.png", "assets/heroinfobox.png"], "battle");
                                            }, 1000);
                                        });
                                    });
                                    break;

                            }
                        });
                    })
                    break;
                case 3:
                    switch (choice1) {
                        case 1:
                            vnEngine.setText("那你先到 http://g0v.tw/join.html 看完加入我們文案.");

                            vnEngine.animateMessage();
                            break;
                        case 2:
                            vnEngine.setText("> Clkao looks disappointed.");

                            vnEngine.animateMessage();
                            counter = -1;
                            break;
                    }
                    break;
                case 4:
                    Crafty.audio.muteMusic('music');
                    window.openUrlInBox("http://g0v.tw/join.html", {
                        onClosed: function () {
                            Crafty.audio.unmuteMusic('music');
                        }
                    });
                    break;

                default:
                    counter = -1;
                    vnEngine.hideDialog();
                    vnEngine.showInteraction();
            }
            counter++;
        } else if (vnEngine.isWriting()) {
            console.log("is writing");
            vnEngine.forceTextFinish();
        }
        console.log(counter);
    }
    var leave = function () {
        counter = 0;
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
