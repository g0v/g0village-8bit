Crafty.c("AssetLoadManager", {
    init: function () {
        this.assetsToLoad = [];
        this.nextScene = "titleScreen";
        // this scene calls the loader function in our loader handler
        Crafty.scene("loadingScreen", this._load);
    },
    _load: function () {
        var a, t, doIconAnimation, showLoadingIcon, hideLoadingIcon, showing;

        Crafty.sprite(116, "assets/igorsprite.png", {igorSprite: [0,0,0,0]});

        var igor = Crafty.e("2D, Canvas, igorSprite, SpriteAnimation");
        igor.attr({x:10, y:300}).animate("laugh", 0, 0,1).animate("laugh",13,-1);

        Crafty.sprite(75, "assets/loading.png", {
            loadingIcon: [0, 0]
        });
        a = Crafty.e("2D, Canvas, Tween, loadingIcon").attr({
            x: 525,
            y: 340
        });
        t = Crafty.e("2D, DOM, Text").css({
            "color": "white"
        });
        // start the loading icon animation
        doIconAnimation = function () {
            a.origin(37.5, 37.5);
            a.attr({
                rotation: 0
            });
            a.tween({
                rotation: 360
            }, 50, function () {
                doIconAnimation();
            });
        };
        // show the loading icon
        showLoadingIcon = function () {
            var dfd = $.Deferred();
            a.attr({
                alpha: 0
            });
            setTimeout(function () {
                a.tween({
                    alpha: 1
                }, 10, function () {
                    a.attr({
                        alpha: 1
                    });
                    setTimeout(function () {
                        // give the loading some time
                        dfd.resolve();
                    }, 500);
                });
            }, 300);
            return dfd.promise();
        };
        // hide the loading icon
        hideLoadingIcon = function () {
            var dfd = $.Deferred();
            $.when(showing).then(function () {
                a.attr({
                    alpha: 1
                });
                a.tween({
                    alpha: 0
                }, 10, function () {
                    a.attr({
                        alpha: 0
                    });
                    setTimeout(function () {
                        dfd.resolve();
                    }, 300);
                });
            });
            return dfd.promise();
        };
        // set the background to black
        Crafty.background("#000");
        // show the loading icon
        showing = showLoadingIcon();
        // animate the loading icon
        doIconAnimation();
        // load the assets
        Crafty.load(assetsToLoad, function () {
            // goto the main scene when loading is complete, and the hide icon
            // is done animating
            $.when(hideLoadingIcon(), showing).then(function () {
                Crafty.scene(nextScene);
            });
        }, function (e) {
            // for each item loaded, we update the status
            t.text(Math.floor(e.percent) + "/100");
        }, function () {
            // error ?
            $.when(hideLoadingIcon(), showing).then(function () {
                Crafty.scene(nextScene);
            });
        });
    },
    loadScene: function (thingsToLoad, nScene) {
        assetsToLoad = thingsToLoad;
        nextScene = nScene;
        Crafty.scene('loadingScreen');
    }
});
