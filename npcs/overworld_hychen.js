window.overworldHychenScript = function (vnEngine) {
    var counter = 0;
    var choice1 = 0;
    var space = function () {
        if (!vnEngine.isWriting() && !vnEngine.isAnimating()) {
            switch (counter) {
                case 0:
                    vnEngine.hideInteraction();

                    vnEngine.setName("鄉民健忘症主治醫師");
                    vnEngine.setText(Hero.name + " 你好!");
                    vnEngine.setPortrait("assets/kuansim.png");
                    vnEngine.showDialog();
                    break;
                case 1:
                    var _hychen_bala = ["做壞事,神明不一定馬上處罰你,但說錯話,鄉民馬上就來桶你了...",
                        "這是個『舉頭三尺有鄉民』的時代。",
                        "我本來是個型男，但自從我膝蓋中了一鍵...",
                        "我要是有點嘴泡專精，就不會是這種鍵樣",
                        "你見過高村長了嗎? 他在右邊喔!"];
                    vnEngine.setText(_hychen_bala[_.random(0, _hychen_bala.length-1)]);
                    vnEngine.animateMessage();
                    break;
                case 2:
                    vnEngine.setText("鄉民關心你，專治鄉民健忘症");
                    vnEngine.animateMessage();
                    break;

                case 3:
                    vnEngine.setText(Hero.name + " 你想加入鄉民關心你這個專案嗎?");
                    $.when(vnEngine.animateMessage()).then(function () {
                        $.when(vnEngine.promptQuestion(["算我一個!", "這是什麼?", "不想耶!"])).then(function (choice) {
                            choice1 = choice;
                            switch (choice1) {
                                case 1:
                                    vnEngine.setText("非常好！");
                                    vnEngine.animateMessage();
                                    break;
                                case 2:
                                    vnEngine.setText("治療鄉民健忘症的計畫...");
                                    vnEngine.animateMessage();
                                    break;
                                case 3:
                                    vnEngine.setText("砂鍋大的拳頭，你有....");
                                    vnEngine.animateMessage();
                                    counter = -2;
                                    break;
                            }
                        })
                    });
                    break;
                case 4:
                    switch (choice1) {
                        case 1:
                            vnEngine.setText("研究一下怎麼報到吧!");
                            vnEngine.animateMessage();
                            break;
                        case 2:
                            vnEngine.setText("看一下影片吧....");
                            vnEngine.animateMessage();
                            break;
                    }
                    break;
                case 5:
                    switch (choice1) {
                        case 1:
                            setTimeout(openUrlInBox('https://g0v.hackpad.com/--1OaXIxVVPSd'), 1500);
                            vnEngine.setText("有問題的話就在IRC上問值日生吧!");
                            vnEngine.animateMessage();
                            counter = -4;
                            break;
                        case 2:
                            Crafty.audio.muteMusic('music');
                            setTimeout(openUrlInBox('http://www.youtube.com/embed/SpovzhVCg48?feature=player_detailpage', {
                                onClosed: function() {
                                    Crafty.audio.unmuteMusic('music');
                                }
                            }), 1500);
                            vnEngine.setText("所以...");
                            vnEngine.animateMessage();
                            counter = -4;
                            break;
                    }
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
        vnEngine.hideDialog();

        vnEngine.hideInteraction();
        counter = 0;
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
