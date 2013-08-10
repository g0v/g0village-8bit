window.overworldScene = function () {
    var unit = 32;
    var _i = 0;

    var hooks = {setupSign: hookSetupSign};

    var boundaries = [
        [3, 9, 3, 8],
        [3, 17, 2, 3],
        [5, 20, 15, 1],
        [20, 13, 1, 7],
        [20, 13, 1, 7],
        [15, 8, 3, 5],
        [18, 9, 4, 4],
        [22, 4, 1, 5],
        [6, 3, 16, 1],
        [15, 4, 3, 2],
        [3, 4, 3, 1],
        [2, 5, 1, 4],
        [15, 15, 3, 3],
        [16, 17, 3, 2]
    ];

    var sprites = [
        {type: "tree", x: 9, y: 9},
        {type: "tree", x: 16, y: 12},
        {type: "tree", x: 18, y: 12},
        {type: "tree", x: 18, y: 14},
        {type: "palmtree", x: 4, y: 5},
        {type: "palmtree", x: 9, y: 2},
        {type: "palmtree", x: 6, y: 12},
        {type: "rock", x: 9, y: 13},
        {type: "rock", x: 15, y: 13},
        {type: "rock", x: 13, y: 18},
        {type: "rock", x: 10, y: 6},
        {type: "rock", x: 14, y: 4},
        {type: "bush", x: 11, y: 12},
        {type: "bush", x: 11, y: 16},
        {type: "bush", x: 11, y: 10},
        {type: "bush", x: 14, y: 10},
        {type: "bush", x: 14, y: 11},
        {type: "bush", x: 14, y: 12},
        {type: "bush", x: 18, y: 8},
        {type: "bush", x: 20, y: 8},
        {type: "smalltree", x: 13, y: 9},
        {type: "smalltree", x: 19, y: 18},
        {type: "hole", x: 7, y: 10, content: "這裡有個大小剛好的坑，讓人有跳進去的衝動...", hooks: ["setupSign"]},
        {type: "smallsign", x: 11, y: 7, content: "歡迎到 g0v 新手村！", hooks: ["setupSign"]},
        {type: "smallsign", x: 19, y: 5, content: "施工中！這裡有許多伐木工，新手村隨時都會有變動", hooks: ["setupSign"]},
        {type: "bigsign", x: 10, y: 14, content: "零時政府首頁：http://g0v.tw/", url: "http://g0v.tw/", hooks: ["setupSign"]}
    ];

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


    /*
     * @racklin NPC
     */
    racklinScript = (function () {
        var counter = 0;
        var space = function () {
            if (!vnEngine.isWriting() && !vnEngine.isAnimating()) {
                switch (counter) {
                    case 0:
                        vnEngine.hideInteraction();

                        vnEngine.setName("阿土伯");
                        vnEngine.setText("嗨! 年輕人!");
                        vnEngine.setPortrait("assets/racklin.png");
                        vnEngine.showDialog();
                        counter = 1;
                        break;
                    case 1:
                        vnEngine.setText(Hero.name + "! 你知道我是誰嗎?");
                        $.when(vnEngine.animateMessage()).then(function () {
                            $.when(vnEngine.promptQuestion(["知道!", "不知道!"])).then(function (choice) {
                                switch (choice) {
                                    case 1:
                                        vnEngine.setPortrait("assets/racklin.png");
                                        vnEngine.setText("噓! 我現在身份是新手村的掃地僧!");
                                        counter = 2;
                                        break;
                                    case 2:
                                        vnEngine.setPortrait("assets/racklin.png");
                                        vnEngine.setText("年輕的時侯來到這島建設，回想當時我也很『萌』.");
                                        counter = 2;
                                        break;
                                }
                                vnEngine.animateMessage();
                            });
                        })
                        break;
                    case 2:
                        vnEngine.setText("你去找左下角的萌典小精靈學習吧!");
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
    })();

    /*
     @hlb NPC
     */
    hlbScript = (function () {
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
    })();

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
                        w[0] = MoedictWords[_.random(0, MoedictWords.length-1)];
                        w[1] = MoedictWords[_.random(0, MoedictWords.length-1)];
                        w[2] = MoedictWords[_.random(0, MoedictWords.length-1)];
                        vnEngine.setText("你想要利用「萌典」學習什麼成語嗎？");
                        $.when(vnEngine.animateMessage()).then(function () {
                            $.when(vnEngine.promptQuestion(w)).then(function (choice) {
                                openUrlInBox('https://moedict.tw/#' + w[choice - 1]);
                                vnEngine.setText("你現在知道 " + w[choice - 1] + " 的意思了！ LV+1");
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
    })();

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
    })()

    clkaoScript = (function () {
        var counter = 0;
        var choice1 = 0;
        var space = function () {
            if (!vnEngine.isWriting() && !vnEngine.isAnimating()) {
                switch (counter) {
                    case 0:
                        vnEngine.hideInteraction();

                        if (window.finishGame) {
                            vnEngine.setName("(前)高村長");
                        } else {
                            vnEngine.setName("高村長");
                        }
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
                                            setTimeout(function () {
                                                openUrlInBox('https://www.moedict.tw/#!破少年')
                                            }, 1500);
                                        });
                                        counter = -2;
                                        break;
                                    case 3:
                                        counter = -2;
                                        vnEngine.setPortrait("assets/clkaoangry.png");
                                        vnEngine.setText(Hero.name + "! 那沒什麼好說的，戰鬥吧！");
                                        $.when(vnEngine.animateMessage()).then(function () {
                                            // save hero data to firebase
                                            heroFBRef.update(Hero, function() {
                                                setTimeout(function () {
                                                    Crafty.audio.mute();
                                                    Crafty.audio.mute();
                                                    loadManager.loadScene(["assets/background_taiwan.png", "assets/pushenter.png", "assets/heroinfobox.png", "assets/dq3_battle.mp3", "assets/dq3_battle.ogg"], "battle");
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
    })();

    // 玩家
    Crafty.sprite(32, "assets/soujisprite.png", {
        playerSprite: [1, 0]
    });
    // g0village 專案發起人
    Crafty.sprite(32, "assets/hlbsprite.png", {
        hlbSprite: [1, 0]
    });
    // g0village-8bit 專案開拓者
    Crafty.sprite(32, "assets/racklinsprite.png", {
        racklinSprite: [1, 0]
    });
    // 新手村長
    Crafty.sprite(32, "assets/clkaosprite.png", {
        clkaoSprite: [1, 0]
    });
    // 坑...
    Crafty.sprite(32, "assets/shadowsprite.png", {
        shadowSprite: [0, 0]
    });

    // 以下開放各專案 NPC 化

    // 萌典
    Crafty.sprite(32, "assets/moesprite.png", {
        moeSprite: [1, 0]
    });
    // 鄉民關心你
    Crafty.sprite(32, "assets/kuansimsprite.png", {
        kuansimSprite: [1, 0]
    });

    var clkao = Crafty.e("2D, Canvas, clkaoSprite, NPC").attr({
        x: 510,
        y: 199
    })
        .setupScript(clkaoScript)
        .wander();

    var moe = Crafty.e("2D, Canvas, moeSprite, NPC").attr({
        x: 278,
        y: 519
    })
        .setupScript(moeScript)
        .wander();
    var hlb = Crafty.e("2D, Canvas, hlbSprite, NPC").attr({
        x: 410,
        y: 413
    })
        .setupScript(hlbScript)
        .wander();

    var rackliln = Crafty.e("2D, Canvas, racklinSprite, NPC").attr({
        x: 110,
        y: 230
    }).setupScript(racklinScript).wander();

    var hychen = Crafty.e("2D, Canvas, kuansimSprite, NPC").attr({
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

    var mkPosFunc = function (unit, width, height) {
        if (width && height) {
            return function (x, y) {
                return {
                    x: x * unit,
                    y: y * unit,
                    w: width,
                    h: height
                };
            }
        } else {
            return function (x, y) {
                return {
                    x: x * unit,
                    y: y * unit,
                };
            }
        }
    }

    var posFunc = {
        "tree": mkPosFunc(unit, 64, 96),
        "palmtree": mkPosFunc(unit, 64, 96),
        "rock": mkPosFunc(unit),
        "bush": mkPosFunc(unit),
        "smalltree": mkPosFunc(unit),
        "hole": mkPosFunc(unit),
        "smallsign": mkPosFunc(unit),
        "bigsign": mkPosFunc(unit)
    };

    var collisionFunc = {
        "tree": function () {
            return new Crafty.polygon([5, 96], [54, 96], [54, 48], [5, 48])
        },
        "palmtree": function () {
            return new Crafty.polygon([20, 96], [54, 96], [54, 64], [20, 64])
        },
        "rock": function () {
            return new Crafty.polygon([0, 32], [32, 32], [32, 5], [0, 5])
        },
        "bush": function () {
            return new Crafty.polygon([0, 32], [32, 32], [32, 20], [0, 20])
        },
        "smalltree": function () {
            return new Crafty.polygon([0, 32], [32, 32], [32, 20], [0, 20])
        },
        "hole": function () {
            return new Crafty.polygon([0, 32], [32, 32], [32, 20], [0, 20])
        },
        "smallsign": function () {
            return new Crafty.polygon([0, 32], [32, 32], [32, 20], [0, 20])
        },
        "bigsign": function () {
            return new Crafty.polygon([0, 32], [32, 32], [32, 20], [0, 20])
        }
    };

    var componentLists = {
        "tree": "2D, Canvas, tree, Collision, RespectZIndex, Collidable",
        "palmtree": "2D, Canvas, palmtree, Collision, RespectZIndex, Collidable",
        "rock": "2D, Canvas, rock, Collision, RespectZIndex, Collidable",
        "bush": "2D, Canvas, bush, Collision, RespectZIndex, Collidable",
        "smalltree": "2D, Canvas, smallTree, Collision, RespectZIndex, Collidable",
        "hole": "2D, Canvas, hole, Collision, NPC, Collidable",
        "smallsign": "2D, Canvas, smallSign, Collision, NPC, Collidable",
        "bigsign": "2D, Canvas, bigSign, Collision, NPC, Collidable"
    }

    var makeSprite = function (sprite, idx, array) {
        var entity = Crafty.e(componentLists[sprite.type])
            .attr(posFunc[sprite.type](sprite.x, sprite.y))
            .collision(collisionFunc[sprite.type]());
        if (sprite.hooks) {
            sprite.hooks.forEach(function (val, idx, array) {
                debugger;
                if (hooks[val]) {
                    hooks[val](sprite, entity);
                }
            });
        }
    }

    /* create an entity from data then apply this hook */
    function hookSetupSign(data, entity) {
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
                    vnEngine.setText("> " + data.content);
                    vnEngine.setName("");
                    vnEngine.showDialog();
                    this.count = 1;
                } else {
                    vnEngine.showInteraction();
                    vnEngine.hideDialog();
                    if (data.url) {
                        window.open(data.url)
                    }
                    ;
                    this.count = 0;
                }
            }
        });
    };

    var makeBoundary = function (val, idx, array) {
        if (val.length != 4) {
            console.log("making boundary with incorrect parameter:" + val.toString());
            return;
        }

        Crafty.e("2D, Collision, Collidable").attr({
            x: val[0] * unit,
            y: val[1] * unit,
            w: val[2] * unit,
            h: val[3] * unit
        }).collision();
    };


    sprites.forEach(makeSprite);
    boundaries.forEach(makeBoundary);
};
