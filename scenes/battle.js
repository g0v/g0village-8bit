window.battleScene = function () {
    console.log("entering a battle");

    var Hero = _.extend({}, window.Hero);
    var Boss = _.extend({}, window.Boss);

    // get hero's partner
    window.HeroPartner = _.shuffle(GithubPartners)[0];
    var HeroPartner = _.extend({}, window.HeroPartner);

    Crafty.background("#ccc");

    Crafty.audio.add({
        "music": ["assets/dq3_battle.mp3", "assets/dq3_battle.ogg"]
    });

    Crafty.audio.play("music", -1);

    Crafty.sprite(1, "assets/background_taiwan.png", {
        battle_bg: [0, 0, 768, 610]
    });
    var background = Crafty.e("2D, Canvas, battle_bg").attr({
        x: 0,
        y: 0,
        z: -1
    });

    Crafty.viewport.scroll('_x', 0);
    Crafty.viewport.scroll('_y', 0);

    var btEngine = Crafty.e("BattleEngine");


    var clkao = Crafty.e("2D, Canvas, NPC").setupScript(battleClkaoScript(btEngine));
    btEngine.addBoss(clkao);

    window.vt = btEngine;


};
