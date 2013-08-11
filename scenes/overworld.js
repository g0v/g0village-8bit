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

    var entities = [
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

    // setup NPCs sprite and script

    // g0village 專案發起人
    Crafty.sprite(32, "assets/hlbsprite.png", {
        hlbSprite: [1, 0]
    });
    var hlb = Crafty.e("2D, Canvas, hlbSprite, NPC").attr({
        x: 410,
        y: 413
    }).setupScript(overworldHlbScript(vnEngine)).wander();

    // g0village-8bit 專案開拓者
    Crafty.sprite(32, "assets/racklinsprite.png", {
        racklinSprite: [1, 0]
    });
    var rackliln = Crafty.e("2D, Canvas, racklinSprite, NPC").attr({
        x: 110,
        y: 230
    }).setupScript(overworldRacklinScript(vnEngine)).wander();

    // 新手村長
    Crafty.sprite(32, "assets/clkaosprite.png", {
        clkaoSprite: [1, 0]
    });
    var clkao = Crafty.e("2D, Canvas, clkaoSprite, NPC").attr({
        x: 510,
        y: 199
    }).setupScript(overworldClkaoScript(vnEngine)).wander();

    // 以下開放各專案 NPC 化

    // 萌典
    Crafty.sprite(32, "assets/moesprite.png", {
        moeSprite: [1, 0]
    });
    var moe = Crafty.e("2D, Canvas, moeSprite, NPC").attr({
        x: 278,
        y: 519
    }).setupScript(overworldMoeScript(vnEngine)).wander();

    // 鄉民關心你
    Crafty.sprite(32, "assets/kuansimsprite.png", {
        kuansimSprite: [1, 0]
    });
    var hychen = Crafty.e("2D, Canvas, kuansimSprite, NPC").attr({
        x: 250,
        y: 253
    }).setupScript(overworldHychenScript(vnEngine)).wander();

    // 文化部
    Crafty.sprite(32, "assets/mouinfosprite.png", {
        mouinfoSprite: [1, 0]
    });
    var mouinfo = Crafty.e("2D, Canvas, mouinfoSprite, NPC").attr({
        x: 590,
        y: 610
    }).setupScript(overworldMouinfoScript(vnEngine)).wander();

    // 坑...
    Crafty.sprite(32, "assets/shadowsprite.png", {
        shadowSprite: [0, 0]
    });

    // 玩家
    Crafty.sprite(32, "assets/soujisprite.png", {
        playerSprite: [1, 0]
    });

    var player1 = Crafty.e("Player").attr({
        x: 200,
        y: 223
    }).centerCamera(background).bind("Moved", function () {
            //center the camera on the player
            this.centerCamera(background)
            if (this._camera_moved) {
                vnEngine.updatePosition();
                return;
            };

        /* cap nonmoving refresh at 10FPS */
        if (this.__cached_debounce > ((new Date).getTime() - 100)) { return; }
        this.__cached_debounce = (new Date).getTime();

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
                    y: y * unit
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

    var makeEntity = function (data, idx, array) {
        var entity = Crafty.e(componentLists[data.type])
            .attr(posFunc[data.type](data.x, data.y))
            .collision(collisionFunc[data.type]());
        if (data.hooks) {
            data.hooks.forEach(function (val, idx, array) {
                if (hooks[val]) {
                    hooks[val](data, entity);
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


    entities.forEach(makeEntity);
    boundaries.forEach(makeBoundary);
};
