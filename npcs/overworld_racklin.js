(function() {

    // get blog.g0v.tw rss feeds  tumblr
    var blogPosts = [];
    $.getJSON('http://blog.g0v.tw/api/read/json?num=10&callback=?', function(d) {
        blogPosts = d.posts;
        console.log(blogPosts);
    });

    // aec data
    var gammaMonitors = [];
    $.getJSON('http://pipes.yahoo.com/pipes/pipe.run?_id=de994ac982afa046e89e93135879dba4&_render=json&_callback=?', function(d) {
        gammaMonitors = d.value.items[0].json;
        gammaMonitors.sort(function(a,b) { return parseFloat(b.value) - parseFloat(a.value);} );
        console.log(gammaMonitors);
    });

    window.overworldRacklinScript = function (vnEngine) {
        var counter = 0;
        var lastConversation = null;
        var space = function () {
            if (!vnEngine.isWriting() && !vnEngine.isAnimating()) {
                // only 1/3 chance ask who am i
                if (counter == 100 && _.random(0,3) > 0 ) counter++;
                switch (counter) {
                    case 0:
                        vnEngine.hideInteraction();

                        vnEngine.setName("阿土伯");
                        vnEngine.setText("嗨! 年輕人!");
                        vnEngine.setPortrait("assets/racklin.png");
                        vnEngine.showDialog();

                        var dataConversations = [];
                        if( blogPosts.length>0) {
                            dataConversations.push({data: blogPosts, counter: 10});
                        }
                        if( gammaMonitors.length>0) {
                            dataConversations.push({data: gammaMonitors, counter: 20});
                        }

                        if (dataConversations.length >0) {
                            lastConversation = _.shuffle(dataConversations)[0];
                            counter = lastConversation.counter;
                        }else {
                            counter = 100;
                        }
                        break;

                    case 10:
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
                                counter = 100;
                            });
                        });
                        break;

                    case 20:
                        vnEngine.setText("你知道全台灣哪裡目前輻射最高？");
                        var gammas = [];
                        var gammasTitle = [];
                        var highest = null;
                        // highest
                        highest = gammaMonitors[0];
                        gammas.push(highest);
                        // others
                        for (var i=0; i<2; i++) {
                            var other = gammaMonitors[_.random(1, gammaMonitors.length-1)];
                            gammas.push(other);
                        }
                        // shuffle
                        gammas = _.shuffle(gammas);
                        gammas.forEach(function(d){
                           gammasTitle.push(d.station +" "+ d.station_en);
                        });

                        $.when(vnEngine.animateMessage()).then(function () {
                            $.when(vnEngine.promptQuestion(gammasTitle)).then(function (choice) {

                                vnEngine.setText("是 " + highest.station + " (" + highest.value + ") 呀～ \n    by. aec-data "+ highest.localtime);
                                vnEngine.animateMessage();
                                counter = 100;
                            });
                        });
                        break;

                    case 100:
                        vnEngine.setText(Hero.name + "! 你知道我是誰嗎?");
                        $.when(vnEngine.animateMessage()).then(function () {
                            $.when(vnEngine.promptQuestion(["知道!", "不知道!"])).then(function (choice) {
                                switch (choice) {
                                    case 1:
                                        vnEngine.setPortrait("assets/racklin.png");
                                        vnEngine.setText("噓! 我現在身份是新手村的掃地僧!");
                                        counter = 101;
                                        break;
                                    case 2:
                                        vnEngine.setPortrait("assets/racklin.png");
                                        vnEngine.setText("年輕的時侯來到這島建設，回想當時我也很『萌』.");
                                        counter = 101;
                                        break;
                                }
                                vnEngine.animateMessage();
                            });
                        })
                        break;
                    case 101:
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
    };

})();
