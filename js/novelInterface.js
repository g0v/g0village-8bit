Crafty.c("NovelInterface", {
    init: function () {
        var self = this;
        var vw = Crafty.viewport.width;
        var vh = Crafty.viewport.height;

        // Responsive dialog dimensions
        var dialogH = Math.max(88, Math.min(120, Math.floor(vh * 0.22)));
        var dialogY = vh - dialogH;
        var dialogOrangeY = dialogY - 40;
        var offScreenY = vh + 110;
        var textMarginLeft = Math.floor(vw * 0.04);
        var textLineH = Math.floor(dialogH * 0.25);
        var textStartY = dialogY + Math.floor(dialogH * 0.12);
        var textW = Math.floor(vw * 0.85);
        var nameY = dialogY - Math.floor(dialogH * 0.25);
        var isSmallScreen = vw < 500;

        // Portrait: hide on small screens, scale on medium
        var portraitW = isSmallScreen ? 0 : Math.min(512, Math.floor(vw * 0.5));
        var portraitH = isSmallScreen ? 0 : Math.floor(portraitW * 0.5);
        var portraitX = isSmallScreen ? vw : Math.floor(vw * 0.45);
        var portraitShowX = isSmallScreen ? vw : Math.floor(vw * 0.40);

        // Question/choice dimensions
        var qBgX = Math.floor(vw * 0.05);
        var qBgY = Math.floor(vh * 0.25);
        var qBgW = Math.floor(vw * 0.90);
        var qBgH = Math.floor(vh * 0.40);
        var choiceX = Math.floor(vw * 0.08);
        var choiceY1 = qBgY + Math.floor(qBgH * 0.10);
        var choiceSpacing = Math.floor(qBgH * 0.25);
        var choiceH = Math.max(30, Math.floor(qBgH * 0.20));
        var choiceW = Math.floor(qBgW * 0.85);

        Crafty.sprite(1, "assets/orangebackground.png", {
            orangebg: [0, 0, 640, 100]
        });
        Crafty.sprite(1, "assets/darkbackground.png", {
            darkbg: [0, 0, 640, 100]
        });

        this._orangeBG = Crafty.e("2D, Canvas, orangebg, Tween")
            .attr({
                x: 50,
                y: dialogOrangeY,
                rotation: 0,
                alpha: 0,
                z: 100,
                w: vw
            });
        this._darkBG = Crafty.e("2D, Canvas, darkbg, Tween")
            .attr({
                x: 50,
                y: offScreenY,
                rotation: -8,
                alpha: 0,
                z: 102,
                w: vw
            });
        this._characterBG = Crafty.e("2D, Canvas, charPortrait, Tween")
            .attr({
                x: portraitX,
                y: 69,
                w: portraitW,
                h: portraitH,
                alpha: 0,
                z: 101
            });
        this._dialogText = Crafty.e("2D, Color, Canvas, Text")
            .attr({
                x: textMarginLeft,
                y: textStartY,
                h: textLineH,
                w: textW,
                z: 103
            })
            .color("transparent")
            .fontColor("white");
        this._dialogText2 = Crafty.e("2D, Color, Canvas, Text")
            .attr({
                x: textMarginLeft,
                y: textStartY + textLineH,
                h: textLineH,
                w: textW,
                z: 103
            })
            .color("transparent")
            .fontColor("white");
        this._dialogText3 = Crafty.e("2D, Color, Canvas, Text")
            .attr({
                x: textMarginLeft,
                y: textStartY + textLineH * 2,
                h: textLineH,
                w: textW,
                z: 103
            })
            .color("transparent")
            .fontColor("white");
        this._dialogName = Crafty.e("2D, Color, Canvas, Text")
            .attr({
                x: textMarginLeft,
                y: nameY,
                h: 25,
                w: textW,
                z: 103
            }).color("transparent").fontColor("black");
        this._checkDialog = Crafty.e("2D, Color, Canvas, Text")
            .attr({
                x: Math.floor(vw * 0.35),
                y: dialogY,
                h: 25,
                w: Math.floor(vw * 0.30),
                alpha: 0,
                z: 103
            })
            .color("black")
            .fontColor("white");
        this._questionBackground = Crafty.e("2D, Color, Canvas, Tween")
            .color("black")
            .attr({x: qBgX, y: qBgY, w: qBgW, h: qBgH, z: 99, alpha: 0});
        this._choiceFirstText = Crafty.e("2D, Color, Canvas, Text, Mouse").text(" ").fontColor("white").color("transparent").attr({x: choiceX, y: choiceY1, h: choiceH, w: choiceW, z: 100});
        this._choiceSecondText = Crafty.e("2D, Color, Canvas, Text, Mouse").text(" ").fontColor("white").color("transparent").attr({x: choiceX, y: choiceY1 + choiceSpacing, h: choiceH, w: choiceW, z: 100});
        this._choiceThirdText = Crafty.e("2D, Color, Canvas, Text, Mouse").text(" ").fontColor("white").color("transparent").attr({x: choiceX, y: choiceY1 + choiceSpacing * 2, h: choiceH, w: choiceW, z: 100});

        this._heroLV = Crafty.e("2D, Color, Canvas, Text").text("LV: "+Hero.followers).fontColor("white").color("transparent").attr({x: 20, y: 20, h: 25, w: 100, z: 10000})
            .bind("HeroObjectChanged", function(e) {
                self._heroLV.text("LV: " + Hero.followers)
            });
        this._heroHP = Crafty.e("2D, Color, Canvas, Text").text("HP: "+Hero.contributions).fontColor("white").color("transparent").attr({x: Math.min(160, Math.floor(vw * 0.30)), y: 20, h: 25, w: 100, z: 10000})
            .bind("HeroObjectChanged", function(e) {
                self._heroHP.text("HP: " + Hero.contributions)
            });

        // Store responsive layout values for use in other methods
        this._layout = {
            vw: vw, vh: vh,
            dialogH: dialogH, dialogY: dialogY,
            dialogOrangeY: dialogOrangeY, offScreenY: offScreenY,
            portraitX: portraitX, portraitShowX: portraitShowX,
            isSmallScreen: isSmallScreen
        };

        this._oldX = 0;
        this._oldY = 0;
        this._writing = false;
        this._shown = false;
        this._animating = false;
        this._hiding = false;
        this._prompting = false;
        this._characterName = "";
        this._dialog = "";

        return this;
    },
    setText: function (text) {
        this._dialog = text;
    },
    setName: function (name) {
        this._characterName = name;
    },
    clearText: function () {
        this._dialogText.text(" ");
        this._dialogText2.text(" ");
        this._dialogText3.text(" ");
    },
    clearName: function () {
        this._dialogName.text(" ");
    },
    setPortrait: function (portrait) {
        Crafty.sprite(1, portrait, {
            vnPortrait: [0, 0, 512, 256]
        });
        this._characterBG.addComponent("vnPortrait");
    },
    isWriting: function () {
        return this._writing;
    },
    isShowing: function () {
        return this._shown;
    },
    isAnimating: function () {
        return this._animating;
    },
    isHiding: function () {
        return this._hiding;
    },
    isPrompting: function () {
        return this._prompting;
    },
    /** 觸控用：檢查 (screenX, screenY) 是否點在選項 1/2/3 上，回傳 1/2/3 或 0 */
    hitTestChoice: function (screenX, screenY) {
        if (!this._prompting || this._numChoices == null) return 0;
        var vx = Crafty.viewport.x;
        var vy = Crafty.viewport.y;
        var choices = [
            this._choiceFirstText,
            this._choiceSecondText,
            this._choiceThirdText
        ];
        for (var i = 0; i < this._numChoices && i < 3; i++) {
            var c = choices[i];
            if (c) {
                var sx = c._x + vx;
                var sy = c._y + vy;
                if (screenX >= sx && screenX <= sx + c._w && screenY >= sy && screenY <= sy + c._h) {
                    return i + 1;
                }
            }
        }
        return 0;
    },
    /** 觸控用：從外部確認選項 (1/2/3)，需在選項選單開啟時呼叫 */
    confirmChoice: function (choiceIndex) {
        if (this._confirmChoiceCallback && choiceIndex >= 1 && choiceIndex <= 3) {
            this._confirmChoiceCallback(choiceIndex);
        }
    },
    hideDialog: function () {
        var self = this;
        var dfd = $.Deferred();
        var L = this._layout;

        if (this._animating) {
            self._darkBG.unbind("EnterFrame");
            self._orangeBG.unbind("EnterFrame");
            self._characterBG.unbind("EnterFrame");
            self._dialogName.text(" ");
            this.setText(" ");
            this.setName(" ");
        }

        if (this._writing) {
            this._writing = false;
        }

        if (this._shown) {
            if (!this._animating) {
                self._darkBG.attr({
                    x: 50 - Crafty.viewport._x,
                    y: L.dialogY - Crafty.viewport._y,
                    rotation: 0,
                    alpha: 1
                });
                self._orangeBG.attr({
                    x: (50 - Crafty.viewport._x),
                    y: (L.dialogOrangeY - Crafty.viewport._y),
                    rotation: 5,
                    alpha: 1
                });
            }
            self.clearName();
            this._animating = true;
            this._hiding = true;
            self._characterBG.tween({
                alpha: 0
            }, 5, function () {
                self._characterBG.attr({
                    alpha: 0
                });
                self.clearText();
            });
            self._orangeBG.tween({
                rotation: 0,
                y: (L.dialogY - Crafty.viewport._y)
            }, 5, function () {
                self._orangeBG.attr({
                    alpha: 0
                });
                self._darkBG.tween({
                    rotation: -8,
                    y: (L.offScreenY - Crafty.viewport._y),
                    alpha: 0
                }, 10);
                self._orangeBG.tween({
                    rotation: -8,
                    y: (L.offScreenY - Crafty.viewport._y),
                    alpha: 0
                }, 10, function () {
                    dfd.resolve();
                    self._orangeBG.alpha = 0;
                    self._darkBG.alpha = 0;
                    self._animating = false;
                    self._shown = false;
                    self._hiding = false;
                    // 對話結束後確保玩家可再次移動（觸控 pathfinding / 鍵盤）
                    var playerList = Crafty("PlayerControl");
                    if (playerList.length) {
                        var player = Crafty(playerList[0]);
                        if (player.disableControls) player.disableControls = false;
                    }
                });
            });
        }
        else {
            dfd.resolve();
        }
        return dfd.promise();
    },
    animateMessage: function () {
        var dfd = $.Deferred();
        if (!this._writing) {
            this._writing = true;
            var self = this;
            var length = 0;
            var lines = self._dialog.split("\n").slice(0, 3);
            var line = 0;
            var done = false;

            var type = function () {
                if (self._writing) {

                    var dialogText = (line == 0) ? self._dialogText : self['_dialogText'+(line+1)];
                    dialogText.text(lines[line].substr(0, length++));

                    if (length < lines[line].length + 1) {
                        setTimeout(type, 20);
                    }else if (line < lines.length-1) {
                        line++;
                        length = 0;
                        setTimeout(type, 20);
                    }else {
                        done = true;
                    }

                }else {
                    done = true;
                }

                if (done) {
                    length = 0;
                    line = 0;
                    self._dialogText.text(lines[0] || '');
                    self._dialogText2.text(lines[1] || '');
                    self._dialogText3.text(lines[2] || '');
                    self._writing = false;
                    dfd.resolve();
                }
            };

            // clear and type
            self._dialogText.text(' ');
            self._dialogText2.text(' ');
            self._dialogText3.text(' ');

            type();

        }
        else {
            dfd.resolve();
        }

        return dfd;
    },
    forceTextFinish: function () {
        this._writing = false;
    },
    showDialog: function () {
        // the defered object to return
        var dfd = $.Deferred();
        var self = this;
        var L = this._layout;

        if (this._writing) {
            this._writing = false;
        }

        if (this._animating) {
            self._darkBG.unbind("EnterFrame");
            self._orangeBG.unbind("EnterFrame");
            self._characterBG.unbind("EnterFrame");
            self._dialogName.text(" ");

            this._shown = false;
        }

        if (!this._shown) {
            if (this._animating) {
                self._darkBG.attr({
                    rotation: -8,
                    alpha: 0,
                    x: (50 - Crafty.viewport._x),
                    y: (L.offScreenY - Crafty.viewport._y)
                });
                self._orangeBG.attr({
                    rotation: -8,
                    alpha: 0,
                    x: (50 - Crafty.viewport._x),
                    y: (L.offScreenY - Crafty.viewport._y)
                });
                self._characterBG.attr({
                    alpha: 0,
                    x: L.portraitX - Crafty.viewport._x
                });
            }

            this._animating = true;
            this._shown = true;
            self._darkBG.tween({
                rotation: 0,
                y: L.dialogY - Crafty.viewport._y,
                alpha: 1
            }, 10, function () {
                self._darkBG.attr({
                    x: 50 - Crafty.viewport._x,
                    y: L.dialogY - Crafty.viewport._y,
                    rotation: 0,
                    alpha: 1
                });
            });
            self._characterBG.attr({
                alpha: 0,
                x: L.portraitX - Crafty.viewport._x
            });

            self._orangeBG.tween({
                rotation: 0,
                y: (L.dialogY - Crafty.viewport._y),
                alpha: 0
            }, 10, function () {
                self._orangeBG.attr({
                    alpha: 1
                });
                self._characterBG.tween({
                    alpha: L.isSmallScreen ? 0 : 1,
                    x: L.portraitShowX - Crafty.viewport._x
                }, 5);
                self._orangeBG.tween({
                    rotation: 5,
                    y: (L.dialogOrangeY - Crafty.viewport._y),
                    alpha: 1
                }, 5, function () {
                    self._orangeBG.attr({
                        rotation: 5,
                        alpha: 1
                    });
                    self._orangeBG.x = (50 - Crafty.viewport._x);
                    self._orangeBG.y = (L.dialogOrangeY - Crafty.viewport._y);
                    self._dialogName.text(self._characterName);
                    console.log(self._dialog);
                    // append the text
                    self.animateMessage();

                    dfd.resolve();
                    self._animating = false;
                });
            });
        }
        else {
            dfd.resolve();
        }
        return dfd.promise();
    },
    showInteraction: function () {
        if (window.MobileControl && window.MobileControl.isMobile) return;
        this._checkDialog.text("CHECK!! [space]");
        this._checkDialog.attr({
            alpha: 0
        });

        this._checkDialog.attr({
            alpha: 0.95
        });
    },
    hideInteraction: function () {
        if (window.MobileControl && window.MobileControl.isMobile) return;
        this._checkDialog.text(" ");
        this._checkDialog.attr({
            alpha: 0.95
        });

        this._checkDialog.attr({
            alpha: 0
        });
    },
    promptQuestion: function (choices) {
        this._animating = true;
        var dfd = $.Deferred();
        self = this;
        var resolved = false;

        var confirmSelection = function(currentSelection, player, interactable) {
            if (resolved) return;
            resolved = true;
            self._prompting = false;
            self._confirmChoiceCallback = null;
            self._numChoices = null;
            self.unbind("KeyDown");
            self._choiceFirstText.unbind("MouseUp");
            self._choiceSecondText.unbind("MouseUp");
            self._choiceThirdText.unbind("MouseUp");
            self._choiceFirstText.color("transparent").fontColor("white").text(" ");
            self._choiceSecondText.color("transparent").fontColor("white").text(" ");
            self._choiceThirdText.color("transparent").fontColor("white").text(" ");
            self._questionBackground.tween({alpha: 0}, 10, function () {
                self._questionBackground.alpha = 0;
                player.disableControls = false;
                self._animating = false;
                $.each(interactable, function (index, item) {
                    Crafty(item).disableInteraction = false;
                });
                dfd.resolve(currentSelection);
            });
            dfd.resolve(currentSelection);
        };

        var highlightChoice = function(sel) {
            self._choiceFirstText.color(sel === 1 ? "white" : "transparent").fontColor(sel === 1 ? "black" : "white");
            self._choiceSecondText.color(sel === 2 ? "white" : "transparent").fontColor(sel === 2 ? "black" : "white");
            self._choiceThirdText.color(sel === 3 ? "white" : "transparent").fontColor(sel === 3 ? "black" : "white");
        };

        this._questionBackground.tween({alpha: 0.75}, 10, function () {
            var numChoices = choices.length > 3 ? 3 : choices.length;
            self._prompting = true;
            self._numChoices = numChoices;
            self._confirmChoiceCallback = function(choiceIndex) {
                highlightChoice(choiceIndex);
                confirmSelection(choiceIndex, player, interactable);
            };

            var player = Crafty(Crafty("PlayerControl")[0]);
            player.disableControls = true;

            var interactable = Crafty("Interactable").toArray();
            $.each(interactable, function (index, item) {
                Crafty(item).disableInteraction = true;
            });

            self._choiceFirstText.text(choices[0]);
            self._choiceSecondText.text(choices[1] || " ");
            self._choiceThirdText.text(choices[2] || " ");

            var currentSelection = 1;
            highlightChoice(currentSelection);

            // Touch/click support for each choice
            self._choiceFirstText.bind('MouseUp', function() {
                if (numChoices >= 1) {
                    currentSelection = 1;
                    highlightChoice(currentSelection);
                    confirmSelection(currentSelection, player, interactable);
                }
            });
            self._choiceSecondText.bind('MouseUp', function() {
                if (numChoices >= 2) {
                    currentSelection = 2;
                    highlightChoice(currentSelection);
                    confirmSelection(currentSelection, player, interactable);
                }
            });
            self._choiceThirdText.bind('MouseUp', function() {
                if (numChoices >= 3) {
                    currentSelection = 3;
                    highlightChoice(currentSelection);
                    confirmSelection(currentSelection, player, interactable);
                }
            });

            // Keyboard support (preserved for desktop)
            self.bind("KeyDown", function (e) {
                if (e.key === 87 || e.key === 38) {
                    currentSelection = currentSelection === 1 ? numChoices : currentSelection - 1;
                }
                if (e.key == 83 || e.key === 40) {
                    currentSelection = currentSelection === numChoices ? 1 : currentSelection + 1;
                }
                highlightChoice(currentSelection);

                //use an array instead
                if (e.key === 13 || e.key === 32) {
                    confirmSelection(currentSelection, player, interactable);
                }
                console.log(currentSelection);
            });
        });
        return dfd.promise();
    },
    updatePosition: function () {
        var x = Crafty.viewport._x;
        var y = Crafty.viewport._y;
        if (x === this._oldX) {
        } else {
            var deltaX = this._oldX - x;
            this._orangeBG.x += deltaX;
            this._darkBG.x += deltaX;
            this._checkDialog.x += deltaX;
            this._characterBG.x += deltaX;
            this._dialogText.x += deltaX;
            this._dialogText2.x += deltaX;
            this._dialogText3.x += deltaX;
            this._dialogName.x += deltaX;
            this._choiceThirdText.x += deltaX;
            this._choiceSecondText.x += deltaX;
            this._choiceFirstText.x += deltaX;
            this._questionBackground.x += deltaX;
            this._heroLV.x += deltaX;
            this._heroHP.x += deltaX;
            this._oldX = x;
        }
        if (y === this._oldY) {
        } else {
            var deltaY = this._oldY - y;
            this._orangeBG.y += deltaY;
            this._darkBG.y += deltaY;
            this._checkDialog.y += deltaY;
            this._characterBG.y += deltaY;
            this._dialogText.y += deltaY;
            this._dialogText2.y += deltaY;
            this._dialogText3.y += deltaY;
            this._dialogName.y += deltaY;
            this._choiceThirdText.y += deltaY;
            this._choiceSecondText.y += deltaY;
            this._choiceFirstText.y += deltaY;
            this._questionBackground.y += deltaY;
            this._heroLV.y += deltaY;
            this._heroHP.y += deltaY;
            this._oldY = y;
        }
    }
});
