(function() {

    // get blog.g0v.tw rss feeds  tumblr
    var blogPosts = [];
    $.getJSON('http://blog.g0v.tw/api/read/json?num=10&callback=?', function(d) {
        blogPosts = d.posts;
        console.log(blogPosts);
    });

    window.overworldRacklinScript = function (vnEngine) {
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
                        if( blogPosts.length>0) counter = 1;
                        else counter=2;
                        break;

                    case 1:
                        vnEngine.setText("g0v 最近很多活動唷，想聽聽大家怎麼說？");
                        var postsLink = [];
                        var postsTitle = [];
                        var posts = _.shuffle(blogPosts);
                        for (var i=0; i<3; i++) {
                            var post = posts[i];
                            postsTitle.push(post['link-text'] || post['regular-title']);
                            postsLink.push(post['link-url']||post['url']);
                        }

                        $.when(vnEngine.animateMessage()).then(function () {
                            $.when(vnEngine.promptQuestion(postsTitle)).then(function (choice) {

                                Crafty.audio.muteMusic('music');
                                openUrlInBox(postsLink[choice-1], {
                                    onClosed: function() {
                                        Crafty.audio.unmuteMusic('music');
                                    }
                                });

                                vnEngine.setText("燃起你的熱情了嗎？");
                                vnEngine.animateMessage();
                                counter = 2;
                            });
                        });
                        break;

                    case 2:
                        vnEngine.setText(Hero.name + "! 對了，你知道我是誰嗎?");
                        $.when(vnEngine.animateMessage()).then(function () {
                            $.when(vnEngine.promptQuestion(["知道!", "不知道!"])).then(function (choice) {
                                switch (choice) {
                                    case 1:
                                        vnEngine.setPortrait("assets/racklin.png");
                                        vnEngine.setText("噓! 我現在身份是新手村的掃地僧!");
                                        counter = 3;
                                        break;
                                    case 2:
                                        vnEngine.setPortrait("assets/racklin.png");
                                        vnEngine.setText("年輕的時侯來到這島建設，回想當時我也很『萌』.");
                                        counter = 3;
                                        break;
                                }
                                vnEngine.animateMessage();
                            });
                        })
                        break;
                    case 3:
                        vnEngine.setText("你去找村子南邊的萌典小精靈學習吧!");
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
    };

})();
