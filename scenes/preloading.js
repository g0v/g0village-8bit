window.preloadingScene = function () {

    Crafty.background("#000");
    loadManager = Crafty.e("AssetLoadManager");
    Crafty.e("2D, DOM, Text").attr({
        w: 440,
        h: 20,
        x: 0,
        y: 0
    })
        .text("Pre-loading game assets")
        .css({
            "text-align": "center"
        })
        .css({
            "color": "white"
        });

    // load the loading screen assets
    Crafty.load(["assets/loading.png", "assets/igorsprite.png"], function () {
        loadManager.loadScene(["assets/g0v-240-invert.png", "assets/pushenter.png"], "titleScreen");
    }, function (e) {
        console.log(e.percent);
    }, function (e) {
        console.log(e);
        loadManager.loadScene(["assets/g0v-240-invert.png", "assets/pushenter.png"], "titleScreen");
    });
};

