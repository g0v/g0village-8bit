window.overworldScene = function () {
    var unit = 32;
    var _i = 0;

    var hooks = {
        setupEngineScript: hookSetupEngineScript
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
        "normal": function () {
            return new Crafty.polygon([0, 32], [32, 32], [32, 20], [0, 20])
        }
    };

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
        {name:"playerSprite", url: "assets/soujisprite.png", region: [1, 0]},       // Player
        {name:"hlbSprite", url: "assets/hlbsprite.png", region: [1, 0]},            // 專案發起人
        {name:"racklinSprite", url: "assets/racklinsprite.png", region: [1, 0]},    // g0village-8bit 專案開拓者
        {name:"clkaoSprite", url: "assets/clkaosprite.png", region: [1, 0]},        // 新手村長
        {name:"moeSprite", url: "assets/moesprite.png", region: [1, 0]},            // 萌典
        {name:"kuansimSprite", url: "assets/kuansimsprite.png", region: [1, 0]},    // 鄉民關心你
        {name:"mouinfoSprite", url: "assets/mouinfosprite.png", region: [1, 0]},    // 文化部
        {name:"listeningSprite", url: "assets/listeningsprite.png", region: [1, 0]},    // 福利請聽
        {name:"etblueSprite", url: "assets/etbluesprite.png", region: [1, 0]},    // ETBlue
        {name:"shadowSprite", url: "assets/shadowsprite.png", region: [1, 0]},      // 坑...
        {name:"tree", url: "assets/tree.png", region: [0, 0, 2, 3]},
        {name:"palmTree", url: "assets/palmTree.png", tileW: 32, region: [0, 0, 2, 3]},
        {name:"smallTree", url: "assets/smalltree.png", tileW: 32, region: [0, 0]},
        {name:"bush", url: "assets/bush.png"},
        {name:"rock", url: "assets/rock.png"},
        {name:"smallSign", url: "assets/signSmall.png"},
        {name:"bigSign", url: "assets/signBig.png"},
        {name:"hole", url: "assets/hole.png"},
        {name:"bg", url: "assets/background.png", tileW: 768}
    ];

    var entities = [
        {sprite: "tree", x: 9, y: 9, w:2, h: 3, collision: "tree"},
        {sprite: "tree", x: 16, y: 12, w: 2, h: 3, collision: "tree"},
        {sprite: "tree", x: 18, y: 12, w:2, h:3, collision: "tree"},
        {sprite: "tree", x: 18, y: 14, w: 2, h:3, collision: "tree"},
        {sprite: "palmTree", x: 4, y: 5, w:2, h:3, collision: "palmtree"},
        {sprite: "palmTree", x: 9, y: 2, w:2, h:3, collision: "palmtree"},
        {sprite: "palmTree", x: 6, y: 12, w:2, h:3, collision: "palmtree"},
        {sprite: "rock", x: 9, y: 13, collision: "rock"},
        {sprite: "rock", x: 15, y: 13, collision: "rock"},
        {sprite: "rock", x: 13, y: 18, collision: "rock"},
        {sprite: "rock", x: 10, y: 6, collision: "rock"},
        {sprite: "rock", x: 14, y: 4, collision: "rock"},
        {sprite: "bush", x: 11, y: 12},
        {sprite: "bush", x: 11, y: 16},
        {sprite: "bush", x: 11, y: 10},
        {sprite: "bush", x: 14, y: 10},
        {sprite: "bush", x: 14, y: 11},
        {sprite: "bush", x: 14, y: 12},
        {sprite: "bush", x: 18, y: 8},
        {sprite: "bush", x: 20, y: 8},
        {sprite: "smalltree", x: 13, y: 9},
        {sprite: "smalltree", x: 19, y: 18},
    ];

    var npcs = [
        {sprite: "hlbSprite", x: 12, y: 12, script: "overworldHlbScript", hooks: ["setupEngineScript"]},             // g0village 專案發起人
        {sprite: "racklinSprite", x: 3, y: 7, script: "overworldRacklinScript", hooks: ["setupEngineScript"]},       // g0village-8bit 專案開拓者
        {sprite: "clkaoSprite", x: 15, y: 6, script: "overworldClkaoScript", hooks: ["setupEngineScript"]},          // 新手村長
        {sprite: "moeSprite", x: 8, y: 16, script: "overworldMoeScript", hooks: ["setupEngineScript"]},              // 萌典
        {sprite: "kuansimSprite", x: 7, y: 7, script: "overworldHychenScript", hooks: ["setupEngineScript"]},         // 鄉民關心你
        {sprite: "mouinfoSprite", x: 18, y: 19, script: "overworldMouinfoScript", hooks: ["setupEngineScript"]},     // 文化部
        {sprite: "listeningSprite", x: 12, y: 19, script: "overworldListeningScript", hooks: ["setupEngineScript"]}, // 福利請聽
        {sprite: "etblueSprite", x: 5, y: 19, script: "overworldETBlueScript", hooks: ["setupEngineScript"]}, // ETBlue
        {sprite: "hole", x: 7, y: 10, content: "這裡有個大小剛好的坑，讓人有跳進去的衝動...", wander: false, script: "overworldSignScript", hooks: ["setupEngineScript"]},
        {sprite: "smallSign", x: 11, y: 7, content: "歡迎到 g0v 新手村！", wander: false, script: "overworldSignScript", hooks: ["setupEngineScript"]},
        {sprite: "smallSign", x: 19, y: 5, content: "施工中！這裡有許多伐木工，新手村隨時都會有變動", wander: false, script: "overworldSignScript", hooks: ["setupEngineScript"]},
        {sprite: "bigSign", x: 10, y: 14, content: "零時政府首頁：http://g0v.tw/", url: "http://g0v.tw/", wander: false, script: "overworldSignScript", hooks: ["setupEngineScript"]}
    ];

    /** Functions to iterate sprites, entities, npcs and boundries **/

    var makeSprite = function (data, idx, array) {
        var tileW = data.tileW || unit, // by default,  use unit
            tileH = data.tileH || tileW,
            map = {};

        map[data.name] = data.region || [0, 0];
        Crafty.sprite(tileW, tileH, data.url, map);
    }

    var makeEntity = function (data, idx, array) {
        var components = "2D, Canvas, " + data.sprite
                            + ", Collision, RespectZIndex, Collidable";
        return createEntity(data, components);
    };

    var makeNPC = function (data, idx, array) {
        var components = "2D, Canvas, " + data.sprite
                            + ", Collision, NPC, Collidable",
            npc = createEntity(data, components);

        if (data.wander !== false) {
            npc.wander();
        }

        if (data.hooks) {
            data.hooks.forEach(function (val, idx, array) {
                if (hooks[val]) {
                    hooks[val].apply(npc, [data, npc]);
                } else if (npc[val]){
                    npc[val].call(npc);
                }
            });
        }
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

    /** bootstrap this scene **/
    var vnEngine = Crafty.e("NovelInterface");
    Crafty.background("#ccc");
    Crafty.audio.add({
        "music": ["assets/dq3_bgm.mp3", "assets/dq3_bgm.ogg"]
    });
    Crafty.audio.play("music", -1);

    /** iterates objects from data for this scene **/
    sprites.forEach(makeSprite);
    entities.forEach(makeEntity);
    boundaries.forEach(makeBoundary);
    npcs.forEach(makeNPC);

    /** create background and player **/
    var background = Crafty.e("2D, Canvas, bg").attr({
        x: 0,
        y: 0,
        z: -1
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

    /*** hooks for NPC ***/

    /* This hook tries to get interaction object by invoking
     * specific global method with vnEngine. */
    function hookSetupEngineScript(data, entity) {
        var script;
        // if specify the script that create interaction object
        if (data.script) {
            script = window[data.script](vnEngine, data, entity);
            entity.setupScript(script);
        }
    }


    /** Helper functions **/
    function mkPosition (x, y, width, height) {
        // by default, unit=32px
        if (width && height) {
            return {
                x: x * unit,
                y: y * unit,
                w: width * unit,
                h: height * unit
            };
        } else {
           return {
               x: x * unit,
               y: y * unit
           };
        }
    }

    function createEntity (data, components) {
        var entity = Crafty.e(components)
            .attr(mkPosition(data.x, data.y, data.w, data.h));

        /* if entity specify its own collisioin function, use it */
        if(data.collision) {
            entity.collision(collisionFunc[data.collision]());
        } else {
            entity.collision(collisionFunc['normal']());
        }

        return entity;
    };
};
