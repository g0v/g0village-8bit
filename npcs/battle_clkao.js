window.battleClkaoScript = function (btEngine) {

    var Hero = _.extend({}, window.Hero);
    var Boss = _.extend({}, window.Boss);

    // get hero's partner
    var HeroPartner = _.extend({}, window.HeroPartner, _.shuffle(window.GithubPartners)[0]);

    var counter = 0;
    var lastAttPerson = null;
    var crazyMode = false;
    var space = function () {
        if (!btEngine.isWriting() && !btEngine.isAnimating()) {
            switch (counter) {
                default:
                    btEngine.setName(Boss.name);
                    btEngine.setPortrait(Boss.avatar);
                    btEngine.setText(Boss.name + "> 單憑你一個人，想要挑戰我，那是不可能的！");
                    btEngine.showDialog();
                    counter = 1;
                    break;
                case 1:
                    btEngine.setText(Hero.name + "> 召喚 GitHub 上的 g0v 伙伴！");
                    btEngine.animateMessage();
                    counter++;
                    break;
                case 2:
                    btEngine.setText(HeroPartner.name + " 趕來幫助 " + Hero.name + "。");
                    btEngine.animateMessage();
                    counter++;
                    break;
                case 3:
                    btEngine.setText("（夥伴的 HP/LV 是由 contribution/followers 換算而來。）");
                    btEngine.animateMessage();
                    counter++;
                    break;
                case 4:
                    btEngine._heroPartnerBG.attr({alpha: 1});
                    btEngine._heroPartnerName.text(HeroPartner.name).attr({alpha: 1});
                    btEngine._heroPartnerHP.text(HeroPartner.contributions).attr({alpha: 1});
                    btEngine._heroPartnerLV.text(HeroPartner.followers).attr({alpha: 1});
                    btEngine.setText(HeroPartner.name + "> 我們一起對抗挖坑給人家跳的 " + Boss.name + "吧！");
                    btEngine.animateMessage();
                    counter = 6;
                    break;
                case 6:
                    btEngine.setText(HeroPartner.name + "> " + HeroPartner.bio);
                    btEngine.animateMessage();
                    counter = 7;
                    break;
                case 7:
                    btEngine.setText(Hero.name + "> 衝啊！");
                    btEngine.animateMessage();
                    counter = 1000;
                    break;
                case 8:
                    btEngine.setText("/* 還沒寫完！Reload Browser 試試伙伴的手氣吧! */");
                    btEngine.animateMessage();
                    counter = 8;
                    break;

                /* battle dirty hack */
                case 1000:
                    btEngine.setPortrait("assets/clkao.png");
                    btEngine.setText("選擇戰鬥指令：");
                    $.when(btEngine.animateMessage()).then(function () {
                        $.when(btEngine.promptQuestion(["戰鬥", "防禦", "逃跑"])).then(function (choice) {
                            switch (choice) {
                                default:
                                case 1:
                                    btEngine.setText("大伙對 " + Boss.name + " 展開攻擊！");
                                    btEngine.animateMessage();
                                    if (Hero.contributions > 0) {
                                        counter = 2000;
                                    }else {
                                        counter = 2100;
                                    }

                                    break;
                                case 2:
                                    btEngine.setText("大伙進行防禦！");
                                    btEngine.animateMessage();
                                    counter = 3000;
                                    break;
                                case 3:
                                    btEngine.setText("大伙想要逃跑！");
                                    btEngine.animateMessage();
                                    counter = 4000;
                                    break;
                            }
                        });
                    });
                    break;

                /* hero attack */
                case 2000:
                    // hero attack
                    var hPoint = _.random(0, Hero.followers);
                    btEngine.setText(Hero.name + " 攻擊 " + Boss.name + ", 造成了 [" + hPoint + "] 傷害");

                    $.when(btEngine.animateMessage()).then(function () {
                        Boss.contributions -= hPoint;
                        btEngine.setBossHP(Boss.contributions);

                        if (Boss.contributions < 0) {
                            counter = 5000;
                        } else {
                            if (HeroPartner.contributions > 0) {
                                counter = 2100;
                            }else {
                                if ((Boss.contributions < (window.Boss.contributions/4)) && !crazyMode) counter=2201;
                                else counter = 2200;
                            }
                        }
                    });

                    break;

                /* partner attack */
                case 2100:
                    // partner attack
                    var pPoint = _.random(0, HeroPartner.followers);
                    btEngine.setText(HeroPartner.name + " 攻擊 " + Boss.name + ", 造成了 [" + pPoint + "] 傷害");

                    $.when(btEngine.animateMessage()).then(function () {
                        Boss.contributions -= pPoint;
                        btEngine.setBossHP(Boss.contributions);

                        if (Boss.contributions > 0) {
                            if ((Boss.contributions < (window.Boss.contributions/4)) && !crazyMode) counter=2201;
                            else counter = 2200;
                        } else {
                            counter = 5000;
                        }
                    });

                    break;

                /* boss attack */
                case 2200:
                    // boss attack
                    var aliveList = [];
                    if (Hero.contributions > 0) aliveList.push(Hero);
                    if (HeroPartner.contributions > 0) aliveList.push(HeroPartner);

                    // 倒楣鬼
                    var attPerson = aliveList[_.random(0,aliveList.length-1)];

                    // skill
                    var attSkill = Boss.attackSkills[_.random(0, Boss.attackSkills.length-1)]

                    var bPoint = _.random(0, Boss.followers) * attSkill.delta;

                    btEngine.setText(_.template(attSkill.msg, {Boss: Boss, Player: attPerson, Point: bPoint}));

                    $.when(btEngine.animateMessage()).then(function () {
                        switch (attSkill.type) {
                            default:
                            case 'attack':
                                attPerson.contributions -= bPoint;
                                if (attPerson == Hero) {
                                    btEngine.setHeroHP(attPerson.contributions);
                                } else {
                                    btEngine.setHeroPartnerHP(attPerson.contributions);
                                }
                                break;

                            case 'health':
                                Boss.contributions += bPoint;
                                btEngine.setBossHP(Boss.contributions);
                                break;
                        }

                        if (attPerson.contributions < 0) {
                            lastAttPerson = attPerson;
                            counter = 2300;
                        } else {
                            counter = 1000;
                        }

                    });

                    break;

                // boss crazy
                case 2201:
                    btEngine.setPortrait("assets/clkaoangry.png");
                    btEngine.setText(Boss.name + " 生氣了！");
                    $.when(btEngine.animateMessage()).then(function () {
                        Boss.contributions = Boss.contributions*2;
                        Boss.followers = Boss.followers*2;
                        btEngine.setBossHP(Boss.contributions);
                        btEngine.setBossLV(Boss.followers);
                        crazyMode = true;
                    });
                    counter=1000;
                    break;


                // show die message
                case 2300:
                    btEngine.setText(lastAttPerson.name + " 倒地不起了！");
                    $.when(btEngine.animateMessage()).then(function () {

                        if (Hero.contributions < 0 && HeroPartner.contributions < 0) {
                            counter = 5100;
                        }else {
                            counter = 1000;
                        }

                    });
                    break;

                /* defend */
                case 3000:
                    btEngine.setText(Boss.name + "> 戰鬥吧！ 膽小鬼!");
                    btEngine.animateMessage();
                    counter = 1000;
                    break;

                /* run */
                case 4000:
                    btEngine.setText(Boss.name + "> 得罪了方丈還想跑! 戰鬥吧！");
                    btEngine.animateMessage();
                    counter = 1000;
                    break;


                /* battle finished */
                case 5000:
                    btEngine.setText(Hero.name + " 和 " + HeroPartner.name + " 打倒了 " + Boss.name +"!");
                    btEngine.animateMessage();
                    counter=5001;
                    break;

                case 5001:
                    btEngine.setText(Boss.name + "> 了不起，現在換你當村長了！");
                    btEngine.animateMessage();
                    counter=5002;
                    break;
                case 5002:
                    btEngine.setText(Hero.name + "> 我要回新手村當村長了！ (LV+20) ");
                    btEngine.animateMessage();
                    window.Hero.contributions+=200;
                    window.Hero.followers+=20;
                    window.finishGame = true; // set finishGame flag 可以當村長
                    counter=6000;
                    break;

                case 5100:
                    btEngine.setText(Hero.name + " 和 " + HeroPartner.name + " 敗給了 " + Boss.name +"!");
                    btEngine.animateMessage();
                    counter=5101;
                    break;
                case 5101:
                    btEngine.setText(Boss.name + "> 回新手村練練功再來挑戰我吧！ (LV+10)");
                    btEngine.animateMessage();
                    window.Hero.contributions+=100;
                    window.Hero.followers+=10;
                    counter=6000;
                    break;

                case 6000:
                    counter=6001;
                    Crafty.audio.mute();
                    Crafty.audio.mute();
                    loadManager.loadScene(["assets/background.png", "assets/pushenter.png", "assets/dq3_bgm.mp3", "assets/dq3_bgm.ogg"], "overworld");
                    break;
                case 6001:
                    // dummy
                    break;
            }

        } else if (btEngine.isWriting()) {
            console.log("is writing");
            btEngine.forceTextFinish();
        }

        console.log(counter);

    };
    var leave = function () {
        counter = 0;
    };
    var enter = function () {
    };
    return {
        spacebarCallback: space,
        leaveCallback: leave,
        enterCallback: enter
    };
};
