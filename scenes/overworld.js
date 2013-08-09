window.overworldScene = function () {
    var vnEngine = Crafty.e("NovelInterface");
    Crafty.background("#ccc");
    Crafty.audio.add({
        "music": ["assets/dq3_bgm.mp3", "assets/dq3_bgm.ogg"]
    });
    Crafty.audio.play("music", -1);

    Crafty.sprite(768, "assets/background.png", {
        bg: [0, 0]
    });
    var background = Crafty.e("2D, Canvas, bg").attr({
        x: 0,
        y: 0,
        z: -1
    });


    /******************************************************************
     *
     *lol abstract the shit out of this. maybe write a higher level language like ren'py that handles the visual novel portions?
     */
    hlbScript = (function () {
        var counter = 0;
        var space = function () {
            if (!vnEngine.isWriting() && !vnEngine.isAnimating()) {
                switch (counter) {
                    case 0:
                        vnEngine.hideInteraction();

                        vnEngine.setName("售票亭老板");
                        vnEngine.setText("Hey partner!");
                        vnEngine.setPortrait("assets/hlb.png");
                        vnEngine.showDialog();
                        counter=1;
                        break;
                    case 1:
                        vnEngine.setText(Hero.name + "! 你有在用 Fire.app 嗎?");
                        $.when(vnEngine.animateMessage()).then(function () {
                            $.when(vnEngine.promptQuestion(["有!", "沒有!", "..."])).then(function (choice) {
                                switch (choice) {
                                    case 1:
                                        vnEngine.setPortrait("assets/hlb.png");
                                        vnEngine.setText("Cool! LV+10");
                                        Hero.followers+=10;
                                        Hero.contributions+=100;
                                        counter=3;
                                        break;
                                    case 2:
                                        vnEngine.setPortrait("assets/hlb.png");
                                        vnEngine.setText("如果您有需要使用 Fire.app 參與 g0v 專案，歡迎找我領取一套。");
                                        counter=2;
                                        break;
                                    case 3:
                                        vnEngine.setText("... 沉默是什麼意思呀?");
                                        counter=2;
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
            if(counter == 3 || counter == 4) counter=4;
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
    })()
    moeScript = (function () {
        var counter = 0;
        var space = function () {
            if (!vnEngine.isWriting() && !vnEngine.isAnimating()) {
                switch (counter) {
                    case 0:
                        vnEngine.hideInteraction();

                        vnEngine.setName("萌典小精靈");
                        vnEngine.setText(Hero.name + " 你好!");
                        vnEngine.setPortrait("assets/moe.png");
                        vnEngine.showDialog();
                        break;
                    case 1:
                        var w = [];
                        w[0] = MoedictWords[_.random(0, MoedictWords.length)];
                        w[1] = MoedictWords[_.random(0, MoedictWords.length)];
                        w[2] = MoedictWords[_.random(0, MoedictWords.length)];
                        vnEngine.setText("你想要利用「萌典」學習什麼成語嗎？");
                        $.when(vnEngine.animateMessage()).then(function () {
                            $.when(vnEngine.promptQuestion(w)).then(function (choice) {
                                openUrlInBox('https://moedict.tw/#'+w[choice-1]);
                                vnEngine.setText("你現在知道 " + w[choice-1] + " 的意思了！ LV+1");
                                Hero.followers++;
                                Hero.contributions += 10;
                                vnEngine.animateMessage();
                            });
                        })
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
    })()
    hychenScript = (function () {
        var counter = 0;
        var choice1 = 0;
        var space = function () {
            if (!vnEngine.isWriting() && !vnEngine.isAnimating()) {
                switch (counter) {
                    case 0:
                        vnEngine.hideInteraction();

                        vnEngine.setName("鄉民健忘症主治醫師");
                        vnEngine.setText(Hero.name + " 你好!");
                        vnEngine.setPortrait("assets/yosuke.png");
                        vnEngine.showDialog();
                        break;
                    case 1:
                        var _hychen_bala = ["做壞事,神明不一定馬上處罰你,但說錯話,鄉民馬上就來桶你了...",
                                               "這是個『舉頭三尺有鄉民』的時代。",
                                               "鄉民關心你，專治鄉民健忘症",
                                               "我本來是個型男，但自從我膝蓋中了一鍵...",
                                               "我要是有點嘴泡專精，就不會是這種鍵樣",
                                               "你見過高村長了嗎? 他在右邊喔!"];
		        vnEngine.setText(_hychen_bala[_.random(0, _hychen_bala.length)]);
                        vnEngine.animateMessage();
                        break;
		    case 2:
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
                                })});                      
                        break;
                    case 3:
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
                    case 4:
		        switch (choice1) {
			    case 1:
                                setTimeout(openUrlInBox('https://g0v.hackpad.com/--1OaXIxVVPSd'), 1500);
                                vnEngine.setText("有問題的話就在IRC上問值日生吧!");
                                vnEngine.animateMessage();
                                counter = - 4; 
                                break;
			    case 2:
                                setTimeout(openUrlInBox('http://www.youtube.com/embed/SpovzhVCg48?feature=player_detailpage'), 1500);
                                vnEngine.setText("所以...");
                                vnEngine.animateMessage();
                                counter = counter - 3; 
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
    })()

    clkaoScript = (function () {
        var counter = 0;
        var choice1 = 0;
        var space = function () {
            if (!vnEngine.isWriting() && !vnEngine.isAnimating()) {
                switch (counter) {
                    case 0:
                        vnEngine.hideInteraction();

                        vnEngine.setName("高村長");
                        vnEngine.setText("唷~ " + Hero.name + "!");
                        vnEngine.setPortrait("assets/clkao.png");
                        vnEngine.showDialog();
                        break;
                    case 1:
                        vnEngine.setText("你看來沒事做，去領個專案寫！！");
                        vnEngine.animateMessage();
                        break;
                    case 2:
                        vnEngine.setPortrait("assets/clkaoask.png");
                        vnEngine.setText(Hero.name + "! 你想要開始一個專案了嗎?");
                        $.when(vnEngine.animateMessage()).then(function () {
                            $.when(vnEngine.promptQuestion(["我很樂意!", "不想耶!", "我要挑戰村長!!!"])).then(function (choice) {
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
                                            setTimeout(openUrlInBox('https://www.moedict.tw/#!破少年'), 1500);
                                        });
                                        counter = -2;
                                        break;
                                    case 3:
                                        counter = -2;
                                        vnEngine.setPortrait("assets/clkaoangry.png");
                                        vnEngine.setText(Hero.name + "! 那沒什麼好說的，戰鬥吧！");
                                        $.when(vnEngine.animateMessage()).then(function () {
                                            setTimeout(function () {
                                                Crafty.audio.mute();
                                                Crafty.audio.mute();
                                                loadManager.loadScene(["assets/background_taiwan.png", "assets/pushenter.png", "assets/heroinfobox.png", "assets/dq3_battle.mp3", "assets/dq3_battle.ogg"], "battle");
                                            }, 2000);
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
                        window.openUrlInBox("http://g0v.tw/join.html");
                    /*
                     vnEngine.setPortrait("assets/clkaoangry.png");
                     vnEngine.setText("什麼! " + Hero.name +"! 你沒有 github 帳號!");
                     break;
                     */

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
    })()
    Crafty.sprite(32, "assets/soujisprite.png", {
        playerSprite: [1, 0]
    });
    Crafty.sprite(32, "assets/moesprite.png", {
        moeSprite: [1, 0]
    });
    Crafty.sprite(32, "assets/yosukesprite.png", {
        yosukeSprite: [1, 0]
    });
    Crafty.sprite(32, "assets/chiesprite.png", {
        chieSprite: [1, 0]
    });
    Crafty.sprite(32, "assets/shadowsprite.png", {
        shadowSprite: [0, 0]
    });
    Crafty.sprite(32, "assets/yosukesprite.png", {
        hychenSprite: [1, 0]
    });

    var chie = Crafty.e("2D, Canvas, chieSprite, NPC").attr({
        x: 510,
        y: 199
    })
        .setupScript(clkaoScript)
        .wander();

    var moe = Crafty.e("2D, Canvas, moeSprite, NPC").attr({
        x: 278,
        y: 519,
    })
        .setupScript(moeScript)
        .wander();
    var yosuke = Crafty.e("2D, Canvas, yosukeSprite, NPC").attr({
        x: 410,
        y: 413,
    })
        .setupScript(hlbScript)
        .wander();

    var hychen = Crafty.e("2D, Canvas, hychenSprite, NPC").attr({
        x: 250,
        y: 253,
    })
        .setupScript(hychenScript)
        .wander();

    var player1 = Crafty.e("Player").attr({
        x: 200,
        y: 223,
    }).centerCamera(background).bind("Moved", function () {

            //center the camera on the player
            this.centerCamera(background);

            //move the  interface
            vnEngine.updatePosition();
        });
    Crafty.sprite(32, "assets/tree.png", {
        tree: [0, 0, 2, 3]
    });

    Crafty.sprite(32, "assets/palmTree.png", {
        palmtree: [0, 0, 2, 3]
    });

    Crafty.sprite(32, "assets/rock.png", {
        rock: [0, 0]
    });

    Crafty.sprite(32, "assets/bush.png", {
        bush: [0, 0]
    });
    Crafty.sprite(32, "assets/smalltree.png", {
        smallTree: [0, 0]
    });
    Crafty.sprite(32, "assets/signSmall.png", {
        smallSign: [0, 0]
    });
    Crafty.sprite(32, "assets/signBig.png", {
        bigSign: [0, 0]
    });

    Crafty.sprite(32, "assets/hole.png", {
        hole: [0, 0]
    });

    var makeTreeAt = function (x, y) {
        Crafty.e("2D, Canvas, tree, Collision, RespectZIndex, Collidable").attr({
            x: x * 32,
            y: y * 32,
            w: 64,
            h: 96
        }).collision(new Crafty.polygon([5, 96], [54, 96], [54, 48], [5, 48]));
    }
    var makePalmTreeAt = function (x, y) {
        Crafty.e("2D, Canvas, palmtree, Collision, RespectZIndex, Collidable").attr({
            x: x * 32,
            y: y * 32,
            w: 64,
            h: 96
        }).collision(new Crafty.polygon([20, 96], [44, 96], [44, 64], [20, 64]));
    }
    var makeRockAt = function (x, y) {
        Crafty.e("2D, Canvas, rock, Collision, RespectZIndex, Collidable").attr({
            x: x * 32,
            y: y * 32,
        }).collision(new Crafty.polygon([0, 32], [32, 32], [32, 5], [0, 5]));
    }
    var makeBushAt = function (x, y) {
        Crafty.e("2D, Canvas, bush, Collision, RespectZIndex, Collidable").attr({
            x: x * 32,
            y: y * 32,
        }).collision(new Crafty.polygon([0, 32], [32, 32], [32, 20], [0, 20]));
    }
    var makeSmallTreeAt = function (x, y) {
        Crafty.e("2D, Canvas, smallTree, Collision, RespectZIndex, Collidable").attr({
            x: x * 32,
            y: y * 32,
        }).collision(new Crafty.polygon([0, 32], [32, 32], [32, 20], [0, 20]));
    };
    var setupSign = function (text, entity, url) {
        entity.setupScript({
            state: false,
            count: 0,
            enterCallback: function () {
                vnEngine.showInteraction();
            },
            leaveCallback: function () {
                vnEngine.hideInteraction();
                vnEngine.hideDialog();
                this.count = 0;
            },
            spacebarCallback: function () {
                if (this.count === 0) {
                    vnEngine.hideInteraction();
                    vnEngine.setPortrait("assets/empty.png");
                    vnEngine.setText("> " + text);
                    vnEngine.setName("");
                    vnEngine.showDialog();
                    this.count = 1;
                } else {
                    vnEngine.showInteraction();
                    vnEngine.hideDialog();
                    if (url) {
                        window.open(url)
                    }
                    ;
                    this.count = 0;
                }
            }
        });
    };
    var digHole = function (x, y) {
        setupSign("這裡有個大小剛好的坑，讓人有跳進去的衝動...",
            Crafty.e("2D, Canvas, hole, Collision, NPC, Collidable").attr({
                x: x * 32,
                y: y * 32,
            }).collision(new Crafty.polygon([0, 32], [32, 32], [32, 20], [0, 20]))
        );
    };
    var makeSmallSignAt = function (x, y) {
        setupSign("這裡是 g0v 新手村！",
            Crafty.e("2D, Canvas, smallSign, Collision, NPC, Collidable").attr({
                x: x * 32,
                y: y * 32,
            }).collision(new Crafty.polygon([0, 32], [32, 32], [32, 20], [0, 20]))
        );
    };
    var makeBigSignAt = function (x, y) {
        setupSign("零時政府首頁：http://g0v.tw/",
            Crafty.e("2D, Canvas, bigSign, Collision, NPC, RespectZIndex, Collidable").attr({
                x: x * 32,
                y: y * 32,
                z: 10,
            }).collision(new Crafty.polygon([0, 32], [32, 32], [32, 20], [0, 20])), "http://g0v.tw/"
        );
    }
    var makeBoundary = function (x, y, w, h) {

        Crafty.e("2D, Collision, Collidable").attr({
            x: x * 32,
            y: y * 32,
            h: h * 32,
            w: w * 32
        }).collision();
    }
    makeTreeAt(9, 9);
    makeTreeAt(16, 12);
    makeTreeAt(18, 12);
    makeTreeAt(18, 14);

    makePalmTreeAt(4, 5);
    makePalmTreeAt(9, 2);
    makePalmTreeAt(6, 12);

    makeRockAt(9, 13);
    makeRockAt(15, 13);
    makeRockAt(13, 18);
    makeRockAt(10, 6);
    makeRockAt(14, 4);

    makeBushAt(11, 12);
    makeBushAt(11, 16);
    makeBushAt(11, 10);
    makeBushAt(14, 10);
    makeBushAt(14, 11);
    makeBushAt(14, 12);
    makeBushAt(18, 8);
    makeBushAt(20, 8);

    makeSmallTreeAt(13, 9);
    makeSmallTreeAt(19, 18);

    digHole(7, 10);
    makeSmallSignAt(11, 7);
    makeSmallSignAt(19, 5);
    makeBigSignAt(10, 14);

    makeBoundary(3, 9, 3, 8);
    makeBoundary(3, 17, 2, 3);
    makeBoundary(5, 20, 15, 1);
    makeBoundary(20, 13, 1, 7);
    makeBoundary(20, 13, 1, 7);
    makeBoundary(15, 8, 3, 5);
    makeBoundary(18, 9, 4, 4);
    makeBoundary(22, 4, 1, 5);
    makeBoundary(6, 3, 16, 1);
    makeBoundary(15, 4, 3, 2);
    makeBoundary(3, 4, 3, 1);
    makeBoundary(2, 5, 1, 4);
    makeBoundary(15, 15, 3, 3);
    makeBoundary(16, 17, 3, 2);

};
