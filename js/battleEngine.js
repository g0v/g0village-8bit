Crafty.c("BattleEngine", {
    init: function() {

        Crafty.sprite(1, "assets/heroinfobox.png", {
            heroinfoboxbg: [0, 0, 150, 120]
        });

        Crafty.sprite(1, "assets/orangebackground.png", {
			orangebg: [0, 0, 640, 100]
		});
		Crafty.sprite(1, "assets/darkbackground.png", {
			darkbg: [0, 0, 640, 100]
		});

		this._orangeBG = Crafty.e("2D, Canvas, orangebg, Tween")
			.attr({
				x: 50,
				y: 285, //325 => 550, 285
				rotation: 0, // 5
				alpha: 0, // 1
				z: 100
			});
		this._darkBG = Crafty.e("2D, Canvas, darkbg, Tween")
			.attr({
				x: 50,
				y: 550, //, 325
				rotation: -8, // 0
				alpha: 0, // 1
				z: 102
			});
		this._characterBG = Crafty.e("2D, Canvas, charPortrait, Tween")
			.attr({
				x: 325, // 250
				y: 69,
				w: 512,
				h: 256,
				alpha: 0, // 0
				z: 101
			});
		this._dialogText = Crafty.e("2D, Color, Canvas, Text")
			.attr( {
				x: 65,
				y: 330,
				h: 90,
				w: 540,
				z: 103
			})
			.color("transparent")
			.fontColor("white");
		this._dialogName = Crafty.e("2D, Color, Canvas, Text")
			.attr({
				x: 55,
				y: 300,
				h: 25,
				w: 570,
                alpha: 0,
				z: 103
			}).color("transparent").fontColor("black");
		this._checkDialog = Crafty.e("2D, Color, Canvas, Text")
			.attr({
				x: 250,
				y: 325,
				h: 25,
				w: 150,
				alpha: 0,
				z: 103
			})
			.color("black")
			.fontColor("white");
		this._questionBackground = Crafty.e("2D, Color, Canvas, Tween")
			.color("black")
			.attr({x: 30, y: 170, w: 550, h: 230, z: 99, alpha: 0});
		this._choiceFirstText = Crafty.e("2D, Color, Canvas, Text").text(" ").fontColor("white").color("transparent").attr({x:45, y:180, h: 25, w: 300, z: 100});
		this._choiceSecondText = Crafty.e("2D, Color, Canvas, Text").text(" ").fontColor("white").color("transparent").attr({x:45, y:210, h: 25, w: 300, z: 100});
		this._choiceThirdText = Crafty.e("2D, Color, Canvas, Text").text(" ").fontColor("white").color("transparent").attr({x:45, y:240, h: 25, w: 300, z: 100});

        this._heroBG = Crafty.e("2D, Canvas, heroinfoboxbg, Tween")
            .attr({
                x: 50,
                y: 5,
                rotation: 0, // 5
                alpha: 1, // 1
                z: 200
            });
        this._heroName = Crafty.e("2D, Color, Canvas, Text")
            .attr( {
                x: 65,
                y: 20,
                h: 30,
                w: 100,
                z: 203
            })
            .color("transparent")
            .fontColor("white").text(Hero.name);
        this._heroHP = Crafty.e("2D, Color, Canvas, Text")
            .attr( {
                x: 120,
                y: 55,
                h: 30,
                w: 100,
                z: 203
            })
            .color("transparent")
            .fontColor("white").text(Hero.contributions);
        this._heroLV = Crafty.e("2D, Color, Canvas, Text")
            .attr( {
                x: 120,
                y: 85,
                h: 30,
                w: 100,
                z: 203
            })
            .color("transparent")
            .fontColor("white").text(Hero.followers);

        this._heroPartnerBG = Crafty.e("2D, Canvas, heroinfoboxbg, Tween")
            .attr({
                x: 250,
                y: 5,
                rotation: 0, // 5
                alpha: 0, // 1
                z: 200
            });
        this._heroPartnerName = Crafty.e("2D, Color, Canvas, Text")
            .attr( {
                x: 270,
                y: 20,
                h: 30,
                w: 100,
                alpha: 0,
                z: 203
            })
            .color("transparent")
            .fontColor("white").text(HeroPartner.name);

        this._heroPartnerHP = Crafty.e("2D, Color, Canvas, Text")
            .attr( {
                x: 310,
                y: 55,
                h: 30,
                w: 100,
                alpha: 0,
                z: 203
            })
            .color("transparent")
            .fontColor("white").text(HeroPartner.contributions);
        this._heroPartnerLV = Crafty.e("2D, Color, Canvas, Text")
            .attr( {
                x: 310,
                y: 85,
                h: 30,
                w: 100,
                alpha: 0,
                z: 203
            })
            .color("transparent")
            .fontColor("white").text(HeroPartner.followers);

        this._bossBG = Crafty.e("2D, Canvas, heroinfoboxbg, Tween")
            .attr({
                x: 450,
                y: 5,
                rotation: 0, // 5
                alpha: 1, // 1
                z: 200
            });
        this._bossName = Crafty.e("2D, Color, Canvas, Text")
            .attr( {
                x: 470,
                y: 20,
                h: 30,
                w: 100,
                z: 203
            })
            .color("transparent")
            .fontColor("white").text(Boss.name);

        this._bossHP = Crafty.e("2D, Color, Canvas, Text")
            .attr( {
                x: 510,
                y: 55,
                h: 30,
                w: 100,
                z: 203
            })
            .color("transparent")
            .fontColor("white").text(Boss.contributions);
        this._bossLV = Crafty.e("2D, Color, Canvas, Text")
            .attr( {
                x: 510,
                y: 85,
                h: 30,
                w: 100,
                z: 203
            })
            .color("transparent")
            .fontColor("white").text(Boss.followers);

		this._oldX = 0;
		this._oldY = 0;
		this._writing = false;
		this._shown = false;
		this._animating = false;
		this._characterName = "";
		this._dialog = "";

		return this;
	},
	setText: function (text) {
		this._dialog = text;
	},
	setName: function(name) {
		this._characterName = name;
	},
	clearText: function () {
		this._dialogText.text(" ");
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
	isAnimating: function() {
		return this._animating;
	},
	hideDialog: function () {
		var self = this;
		var dfd = $.Deferred();

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
				self._darkBG.attr( {
					x: 50 - Crafty.viewport._x,
					y: 325 - Crafty.viewport._y,
					rotation: 0,
					alpha: 1
				});
				self._orangeBG.attr( {
					x: (50 - Crafty.viewport._x),
					y: (285 - Crafty.viewport._y),
					rotation: 5,
					alpha: 1
				});
			}
            console.log('hide');
			self.clearName();
			this._animating = true;
				self._characterBG.tween( {
					alpha: 0
				}, 5, function() {
					self._characterBG.attr( {
						alpha: 0
					});
				self.clearText();
				});
				self._orangeBG.tween( {
					rotation: 0,
					y: (325 - Crafty.viewport._y)
					}, 5, function() {
					self._orangeBG.attr( {
						alpha: 0
					});
					self._darkBG.tween( {
						rotation: -8,
						y: (550 - Crafty.viewport._y),
						alpha: 0
					}, 10);
					self._orangeBG.tween( {
						rotation: -8,
						y: (550 - Crafty.viewport._y),
						alpha: 0
					}, 10, function() {
						dfd.resolve();
                        console.log('dfasdfasda');
						self._orangeBG.alpha = 0;
						self._darkBG.alpha = 0;
						self._animating = false;
						self._shown = false;
					});
				});
		}
		else
		{
            console.log('resolv');
			dfd.resolve();
		}
        console.log('promise');
		return dfd.promise();
	},
	animateMessage: function() {
		var dfd = $.Deferred();
		if (!this._writing) {
			this._writing = true;
			var self = this;
			var length = 0;
			var type = function () {
					self._dialogText.text(self._dialog.substr(0, length ++ ));
					if (length < self._dialog.length + 1 && self._writing) {
						setTimeout(type, 20);
					} else {
						length = 0;
						self._dialogText.text(self._dialog);
						self._writing = false;
						dfd.resolve();
					}
			}


			type();

		}
		else
		{
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
					y: (550 - Crafty.viewport._y)
				});
			self._orangeBG.attr( {
					rotation: -8,
					alpha: 0,
					x: (50 - Crafty.viewport._x),
					y: (550 - Crafty.viewport._y)
				});
			 self._characterBG.attr( {
					alpha: 0,
					x: 325 - Crafty.viewport._x
				});
		}

		this._animating = true;
			this._shown = true;
			self._darkBG.tween( {
					rotation: 0,
					y: 325 - Crafty.viewport._y,
					alpha: 1
				}, 10, function() {
			self._darkBG.attr( {
						x: 50 - Crafty.viewport._x,
						y: 325 - Crafty.viewport._y,
						rotation: 0,
						alpha: 1
					});
				});
			 self._characterBG.attr( {
					alpha: 0,
					x: 325 - Crafty.viewport._x
				});

			self._orangeBG.tween( {
					rotation: 0,
					y: (325 - Crafty.viewport._y),
					alpha: 0
				}, 10, function() {
				self._orangeBG.attr( {
						alpha: 0
					});
				self._characterBG.tween( {
						alpha: 1,
						x: 285 - Crafty.viewport._x
					}, 5);
				self._orangeBG.tween( {
						rotation: 5,
						y: (285 - Crafty.viewport._y),
						alpha: 1
					}, 5, function() {
				self._orangeBG.attr( {
							rotation: 5,
							alpha: 1
						});
					self._orangeBG.x = (50 - Crafty.viewport._x);
					self._orangeBG.y = (285 - Crafty.viewport._y);
					self._dialogName.text(self._characterName);
						console.log(self._dialog);
						// append the text
						self.animateMessage();

						dfd.resolve();
						self._animating = false;
					});
				});
			}
			else
			{
				dfd.resolve();
			}
		return dfd.promise();
	},
	showInteraction: function () {
	this._checkDialog.text("CHECK!! [space]");
        this._checkDialog.attr( {
            alpha: 0
        });

        this._checkDialog.attr( {
            alpha: 0.95
        });
	},
	hideInteraction: function () {
	   this._checkDialog.text(" ");
        this._checkDialog.attr( {
            alpha: 0.95
        });

        this._checkDialog.attr( {
            alpha: 0
        });
	},
	promptQuestion: function (choices) {
	this._animating = true;
		var dfd = $.Deferred();
		self = this;
			this._questionBackground.tween({alpha: 0.75}, 10, function() {
				var numChoices = choices.length > 3 ? 3 : choices.length

				var player = Crafty(Crafty("PlayerControl")[0]);
				player.disableControls = true;

				var interactable = Crafty("Interactable").toArray();
				$.each(interactable, function(index, item) {
					Crafty(item).disableInteraction = true;
				});


				self._choiceFirstText.text(choices[0]);
				self._choiceSecondText.text(choices[1] || " ");
				self._choiceThirdText.text(choices[2] || " ");

				var currentSelection = 1;
							self._choiceFirstText.color("white").fontColor("black");
							self._choiceSecondText.color("transparent").fontColor("white");
							self._choiceThirdText.color("transparent").fontColor("white");
				self.bind("KeyDown", function(e) {
					if (e.key === 87 || e.key === 38) {
						currentSelection = currentSelection === 1 ? numChoices : currentSelection - 1;
					}
					if (e.key == 83 || e.key === 40) {
						currentSelection = currentSelection === numChoices ? 1 : currentSelection + 1;
					}
					switch (currentSelection) {
						case 1:
							self._choiceFirstText.color("white").fontColor("black");
							self._choiceSecondText.color("transparent").fontColor("white");
							self._choiceThirdText.color("transparent").fontColor("white");
							break;
						case 2:
							self._choiceFirstText.color("transparent").fontColor("white");
							self._choiceSecondText.color("white").fontColor("black");
							self._choiceThirdText.color("transparent").fontColor("white");
							break;
						case 3:
							self._choiceFirstText.color("transparent").fontColor("white");
							self._choiceSecondText.color("transparent").fontColor("white");
							self._choiceThirdText.color("white").fontColor("black");
							break;
					}

					//use an array instead
					if (e.key === 13 || e.key === 32) {
						self.unbind("KeyDown");
							self._choiceFirstText.color("transparent").fontColor("white").text(" ");
							self._choiceSecondText.color("transparent").fontColor("white").text(" ");
							self._choiceThirdText.color("transparent").fontColor("white").text(" ");
							self._questionBackground.tween({alpha: 0}, 10, function () {
								self._questionBackground.alpha = 0;
								player.disableControls = false;
								self._animating = false;
									$.each(interactable, function(index, item) {
										Crafty(item).disableInteraction = false;
									});
								dfd.resolve(currentSelection);
							});
						dfd.resolve(currentSelection);
					}
					console.log(currentSelection);
				});
			});
		return dfd.promise();
	},
	updatePosition: function () {
		var x = Crafty.viewport._x;
		var y = Crafty.viewport._y;
        if (x === this._oldX) {} else {
            var deltaX = this._oldX - x;
            this._orangeBG.x += deltaX;
            this._darkBG.x += deltaX;
            this._checkDialog.x += deltaX;
            this._characterBG.x += deltaX;
            this._dialogText.x += deltaX;
            this._dialogName.x += deltaX;
			this._choiceThirdText.x += deltaX;
			this._choiceSecondText.x += deltaX;
			this._choiceFirstText.x += deltaX;
			this._questionBackground.x += deltaX;
            this._oldX = x;
        }
        if (y === this._oldY) {} else {
			var deltaY = this._oldY - y;
            this._orangeBG.y += deltaY;
            this._darkBG.y += deltaY;
            this._checkDialog.y += deltaY;
            this._characterBG.y += deltaY;
            this._dialogText.y += deltaY;
            this._dialogName.y += deltaY;
			this._choiceThirdText.y += deltaY;
			this._choiceSecondText.y += deltaY;
			this._choiceFirstText.y += deltaY;
			this._questionBackground.y += deltaY;
            this._oldY = y;
        }
	},

    addBoss: function(boss) {
        boss._canInteract = true;
        // trigger boss
        boss.trigger("PlayerInteracted");
    },

    setHeroHP: function(hp) {
        this._heroHP.text(hp);

    },

    setHeroPartnerHP: function(hp) {
        this._heroPartnerHP.text(hp);
    },

    setBossHP: function(hp) {
        this._bossHP.text(hp);
    }
});
