window.titleScreenScene = function () {
    loadManager = Crafty.e("AssetLoadManager");
    // add music
    Crafty.audio.add("introMusic",
        ["assets/people-sing.mp3", "assets/people-sing.ogg"]);
    Crafty.audio.play("introMusic", -1);
    Crafty.background("black");

    //creates the sprites
    Crafty.sprite(240, "assets/g0v-240-invert.png", {
        personalogo: [0, 0]
    });
    Crafty.sprite(200, "assets/pushenter.png", {
        pressenter: [0, 0]
    });
    logo = Crafty.e("2D, Canvas, personalogo, Tween");
    blackbg = Crafty.e("2D, Canvas, Color, Tween").attr({
        x: 0,
        y: 0,
        h: 440,
        w: 640,
        alpha: 1
    }).color("black");
    blackbg.z = 3;
    logo.z = 2;
    logo.x = 220;
    logo.y = 100;
    blackbg.tween({
        alpha: 0
    }, 50, function () {
        blackbg.destroy();
        pushEnter = Crafty.e("2D, Canvas, Tween, pressenter, Keyboard").bind("KeyDown", function (e) {
            if (e.key === 13) {
                Hero.name = prompt("勇者，你叫什麼名字");
                var heroFBRef = window.heroFBRef = herosFBRef.child(Hero.name);
                heroFBRef.once('value', function(data){
                    var savedData = data.val();
                    if (savedData === null) {
                        heroFBRef.set(Hero);
                        alert('勇者 ' + Hero.name + '! 歡迎您呀! 已為您創建新的記錄。\n\n您未來可以用相同名稱載入記錄.');
                    }else {
                        if (confirm('您好！ ' + Hero.name + ', 要載入上次的記錄嗎?')) {
                            Hero = _.extend(Hero, savedData);
                        }
                    }
                    Crafty.audio.muteMusic('introMusic');

                    // goto next scene
                    loadManager.loadScene(["assets/yosukehappy.png", "assets/yosukesad.png", "assets/clkaoask.png", "assets/clkaoangry.png", "assets/tree.png", "assets/palmTree.png", "assets/rock.png", "assets/bush.png", "assets/smalltree.png", "assets/background.png", "assets/tileset32.png", "assets/darkbackground.png", "assets/orangebackground.png", "assets/clkaosprite.png", "assets/igor.png", "assets/kanji.png", "assets/kanjiangry.png", "assets/kanjiconfused.png", "assets/soujisprite.png", "assets/teddie.png", "assets/teddiehappy.png", "assets/teddiesad.png", "assets/yosukesprite.png", "assets/moe.png", "assets/moesad.png", "assets/moesprite.png", "assets/clkao.png", "assets/yosuke.png", "assets/clkaohungry.png", "assets/hlb.png", "assets/racklinsprite.png", "assets/racklin.png"], "overworld");

                });

            }
        });
        pushEnter.z = 1;
        pushEnter.y = 200;
        pushEnter.x = 220;
        pushEnter.attr({
            alpha: 0
        });
        pulse = function () {
            pushEnter.tween({
                alpha: 1
            }, 30, function () {
                pushEnter.tween({
                    alpha: 0.25
                }, 30, pulse);
            });
        }
        logo.tween({
            y: 50
        }, 50, pulse);
    });
    Crafty.background("#ffeb42");
};
