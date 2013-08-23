(function(){
    var MoedictWords = [];

    /*
    //這行目前沒有作用? 萌典小精靈目前的資料來源是http://pipes.yahoo.com/pipes/pipe.run?_id=ae8bdfeb413726be8da719b13ab6684e&_render=json&_callback=?'
    $.getJSON('http://pipes.yahoo.com/pipes/pipe.run?_id=ae8bdfeb413726be8da719b13ab6684e&_render=json&_callback=?', function(d) {
        MoedictWords = d.value.items[0].content.split("|");
    });
   */

    $.getJSON('data/idioms.json', function(d) {
        alert(d.length);
        MoedictWords = d;
    });

    //這行目前沒有作用
    /*
    var MoedictWords2 = [];
    $.getJSON('data/civics.json', function(d) {
        var MoedictWords2 = d
    });
    */

    window.overworldMoeScript = function (vnEngine) {
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
                        vnEngine.setText("你想要利用「萌典」學習什麼？");
                        $.when(vnEngine.animateMessage()).then(function () {
                            $.when(vnEngine.promptQuestion(w)).then(function (choice) {
                                Crafty.audio.muteMusic('music');
                                openUrlInBox('https://moedict.tw/#' + w[choice - 1], {
                                    onClosed: function() {
                                        Crafty.audio.unmuteMusic('music');
                                    }
                                });
                                vnEngine.setText("你現在知道 " + w[choice - 1] + " 的意思了！ LV+1");
                                Hero.followers++;
                                Hero.contributions += 10;
                                Crafty.trigger("HeroObjectChanged");
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
    };

})();
