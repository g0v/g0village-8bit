window.overworldScene = function() {
    var vnEngine = Crafty.e("NovelInterface");
    Crafty.background("#ccc");
    Crafty.audio.add({
            "music": ["assets/dq3_bgm.mp3","assets/dq3_bgm.ogg"]
    });
    Crafty.audio.play("music", -1);

    Crafty.sprite(768, "assets/background.png", {
            bg: [0,0]
    });
    var background = Crafty.e("2D, Canvas, bg").attr({
            x:0,
            y:0,
            z:-1
    });


    /******************************************************************
     *
     *lol abstract the shit out of this. maybe write a higher level language like ren'py that handles the visual novel portions?
     */
    yosukeScript = (function() {
            var counter = 0;
            var space = function() {
                    if (!vnEngine.isWriting() && !vnEngine.isAnimating()) {
                            switch (counter) {
                                    case 0:
                                            vnEngine.hideInteraction();

                                            vnEngine.setName("售票亭老板");
                                            vnEngine.setText("Hey partner!");
                                            vnEngine.setPortrait("assets/yosuke.png");
                                            vnEngine.showDialog();
                                            break;
                                    case 1:
                                            vnEngine.setText(Hero.name + "! 你有買 Fire.app 嗎?");
                                            $.when(vnEngine.animateMessage()).then( function() {
                                                    $.when(vnEngine.promptQuestion(["Yep","Nope","..."])).then( function(choice) {
                                                            switch (choice) {
                                                                    case 1:
                                                                            vnEngine.setPortrait("assets/yosukehappy.png");
                                                                            vnEngine.setText("Cool! Let's go there sometime...");
                                                                            break;
                                                                    case 2:
                                                                            vnEngine.setPortrait("assets/yosukesad.png");
                                                                            vnEngine.setText("Aww man.");
                                                                            break;
                                                                    case 3:
                                                                            vnEngine.setText("..Huh? Why the silent treatment?");
                                                            }
                                                            vnEngine.animateMessage();
                                                    });
                                            })
                                            break;
                                    case 2:
                                            vnEngine.setText("> Yosuke pats your back hard.");
                                            $.when(vnEngine.animateMessage()).then( function() {
                                                    //derp
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
            var leave = function() {
                    counter = 0;
                    vnEngine.hideDialog();
                    vnEngine.hideInteraction();

            }
            var enter = function() {
                    vnEngine.showInteraction();
            }
            return {
                    spacebarCallback: space,
                    leaveCallback: leave,
                    enterCallback: enter
            }
    })()
    yukkikoScript = (function() {
            var counter = 0;
            var space = function() {
                    if (counter === 1) {
                            counter = 0;
                            vnEngine.hideDialog();
                            vnEngine.showInteraction();
                            return;
                    }
                    vnEngine.hideInteraction();
                    vnEngine.setName("Yukkiko");
                    vnEngine.setPortrait("assets/yukkiko.png");
                    vnEngine.setText("DERP");
                    vnEngine.showDialog();

                    counter++;
            }
            var leave = function() {
                    vnEngine.hideDialog();

                    vnEngine.hideInteraction();
                    counter = 0;
            }
            var enter = function() {
                    vnEngine.showInteraction();
            }
            return {
                    spacebarCallback: space,
                    leaveCallback: leave,
                    enterCallback: enter
            }
    })()
    chieScript = (function() {
            var counter = 0;
            var choice1 = 0;
            var space = function() {
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
                                            vnEngine.setPortrait("assets/clkaohungry.png");
                                            vnEngine.setText( Hero.name + "! 你想要開始一個專案了嗎?");
                                            $.when(vnEngine.animateMessage()).then( function() {
                                                    $.when(vnEngine.promptQuestion(["我很樂意!","不想耶!","我要挑戰村長!!!"])).then( function(choice) {
                                                            choice1 = choice;

                                                            switch (choice1) {
                                                                    case 1:
                                                                            vnEngine.setPortrait("assets/clkaoask.png");
                                                                            vnEngine.setText("非常好！");

                                                                            vnEngine.animateMessage();
                                                                            break;
                                                                    case 2:
                                                                            vnEngine.setText("破少年！");

                                                                            vnEngine.animateMessage();
                                                                            counter = -2;
                                                                            break;
                                                                    case 3:
                                                                            counter = -2;
                                                                            vnEngine.setText("那沒什麼好說的，戰鬥吧！");
                                                                            $.when(vnEngine.animateMessage()).then(function() {
                                                                                Crafty.audio.mute();
                                                                                Crafty.audio.mute();
                                                                                loadManager.loadScene(["assets/background_taiwan.png","assets/pushenter.png", "assets/dq3_battle.mp3"], "battle");
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

                                            vnEngine.setPortrait("assets/clkaoangry.png");
                                            vnEngine.setText("什麼! " + Hero.name +"! 你沒有 github 帳號!");

                                            vnEngine.animateMessage();
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
            var leave = function() {
                    counter = 0;
                    vnEngine.hideDialog();
                    vnEngine.hideInteraction();

            }
            var enter = function() {
                    vnEngine.showInteraction();
            }
            return {
                    spacebarCallback: space,
                    leaveCallback: leave,
                    enterCallback: enter
            }
    })()
    Crafty.sprite(32, "assets/soujisprite.png", {
            playerSprite: [1,0]
    });
    Crafty.sprite(32, "assets/yukkikosprite.png", {
            yukkikoSprite: [1,0]
    });
    Crafty.sprite(32, "assets/yosukesprite.png", {
            yosukeSprite: [1,0]
    });
    Crafty.sprite(32, "assets/chiesprite.png", {
            chieSprite: [1,0]
    });
    Crafty.sprite(32, "assets/shadowsprite.png", {
            shadowSprite: [0,0]
    });

    var chie = Crafty.e("2D, Canvas, chieSprite, NPC").attr({
            x: 510,
            y: 199
    })
    .setupScript(chieScript)
    .wander();

    var yukkiko = Crafty.e("2D, Canvas, yukkikoSprite, NPC").attr({
            x: 278,
            y: 519,
    })
    .setupScript(yukkikoScript)
    .wander();
    var yosuke = Crafty.e("2D, Canvas, yosukeSprite, NPC").attr({
            x: 410,
            y: 413,
    })
    .setupScript(yosukeScript)
    .wander();

    var player1 = Crafty.e("Player").attr({
            x: 200,
            y: 223,
    }).centerCamera(background).bind("Moved", function() {

            //center the camera on the player
            this.centerCamera(background);

            //move the  interface
            vnEngine.updatePosition();
    });
    Crafty.sprite(32, "assets/tree.png", {
            tree: [0,0,2,3]
    });

    Crafty.sprite(32, "assets/palmTree.png", {
            palmtree: [0,0,2,3]
    });

    Crafty.sprite(32, "assets/rock.png", {
            rock: [0,0]
    });

    Crafty.sprite(32, "assets/bush.png", {
            bush: [0,0]
    });
    Crafty.sprite(32, "assets/smalltree.png", {
            smallTree: [0,0]
    });
    Crafty.sprite(32, "assets/signSmall.png", {
            smallSign: [0,0]
    });
    Crafty.sprite(32, "assets/signBig.png", {
            bigSign: [0,0]
    });

    var makeTreeAt = function(x,y) {
            Crafty.e("2D, Canvas, tree, Collision, RespectZIndex, Collidable").attr({
                    x:x*32,
                    y:y*32,
                    w: 64,
                    h: 96
            }).collision(new Crafty.polygon([5,96],[54,96],[54,48],[5,48]));
    }
    var makePalmTreeAt = function(x,y) {
            Crafty.e("2D, Canvas, palmtree, Collision, RespectZIndex, Collidable").attr({
                    x:x*32,
                    y:y*32,
                    w: 64,
                    h: 96
            }).collision(new Crafty.polygon([20,96],[44,96],[44,64],[20,64]));
    }
    var makeRockAt = function(x,y) {
            Crafty.e("2D, Canvas, rock, Collision, RespectZIndex, Collidable").attr({
                    x:x*32,
                    y:y*32,
            }).collision(new Crafty.polygon([0,32],[32,32],[32,5],[0,5]));
    }
    var makeBushAt = function(x,y) {
            Crafty.e("2D, Canvas, bush, Collision, RespectZIndex, Collidable").attr({
                    x:x*32,
                    y:y*32,
            }).collision(new Crafty.polygon([0,32],[32,32],[32,20],[0,20]));
    }
    var makeSmallTreeAt = function(x,y) {
            Crafty.e("2D, Canvas, smallTree, Collision, RespectZIndex, Collidable").attr({
                    x:x*32,
                    y:y*32,
            }).collision(new Crafty.polygon([0,32],[32,32],[32,20],[0,20]));
    }
    var makeSmallSignAt = function(x,y) {
            Crafty.e("2D, Canvas, smallSign, Collision, NPC, Collidable").attr({
                    x:x*32,
                    y:y*32,
            }).collision(new Crafty.polygon([0,32],[32,32],[32,20],[0,20]))
            .setupScript({
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
                    spacebarCallback: function() {
                            if (this.count === 0) {
                                    vnEngine.hideInteraction();
                                    vnEngine.setPortrait("assets/empty.png");
                                    vnEngine.setText(">  這裡是 g0v 新手村！");
                                    vnEngine.setName("");
                                    vnEngine.showDialog();
                                    this.count = 1;
                            } else {
                                    vnEngine.showInteraction();
                                    vnEngine.hideDialog();
                                    this.count = 0;
                            }
                    }
            });
    }
    var makeBigSignAt = function(x,y) {
            Crafty.e("2D, Canvas, bigSign, Collision, RespectZIndex, Collidable").attr({
                    x:x*32,
                    y:y*32,
            }).collision(new Crafty.polygon([0,32],[32,32],[32,20],[0,20]));
    }
    var makeBoundary = function(x,y,w,h) {

            Crafty.e("2D, Collision, Collidable").attr({
                    x: x*32,
                    y: y*32,
                    h: h*32,
                    w: w*32
            }).collision();
    }
    makeTreeAt(9,9);
    makeTreeAt(16,12);
    makeTreeAt(18,12);
    makeTreeAt(18,14);

    makePalmTreeAt(4,5);
    makePalmTreeAt(9,2);
    makePalmTreeAt(6,12);

    makeRockAt(9,13);
    makeRockAt(15,13);
    makeRockAt(13,18);
    makeRockAt(10,6);
    makeRockAt(14,4);

    makeBushAt(11,12);
    makeBushAt(11,16);
    makeBushAt(11,10);
    makeBushAt(14,10);
    makeBushAt(14,11);
    makeBushAt(14,12);
    makeBushAt(18,8);
    makeBushAt(20,8);

    makeSmallTreeAt(13,9);
    makeSmallTreeAt(19,18);

    makeSmallSignAt(11,7);
    makeSmallSignAt(19,5);
    makeBigSignAt(10,14);

    makeBoundary(3,9,3,8);
    makeBoundary(3,17,2,3);
    makeBoundary(5,20,15,1);
    makeBoundary(20,13,1,7);
    makeBoundary(20,13,1,7);
    makeBoundary(15,8,3,5);
    makeBoundary(18,9,4,4);
    makeBoundary(22,4,1,5);
    makeBoundary(6,3,16,1);
    makeBoundary(15,4,3,2);
    makeBoundary(3,4,3,1);
    makeBoundary(2,5,1,4);
    makeBoundary(15,15,3,3);
    makeBoundary(16,17,3,2);

};
