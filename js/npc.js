Crafty.c("NPC", {
    init: function () {
        Crafty.sprite(32, "assets/charShadow.png", {
            charShadow: [0, 0]
        });
        this._wandering = false;
        this._interactionObj = null;
        this._newDirection = null;
        this._movement = {
            x: 0,
            y: 0
        };
        this.requires("2D, Canvas, SpriteAnimation, Movable, Character, Interactable, ")
            .animate("walk_left", 0, 1, 3).animate("walk_right", 0, 2, 3)
            .animate("walk_up", 0, 3, 3).animate("walk_down", 0, 0, 3)
            .setSpeed(2)
            .bind("PlayerInteracted", function (e) {
                var player, coorx, coory;
                player = new Crafty(new Crafty("Player")[0]);
                // face towards the player
                coorx = this._x + this._w / 2 - (player._x + player._w / 2);
                coory = this._y + this._h / 2 - (player._y + player._h / 2);
                if (coorx < -this.w / 2) {
                    this.sprite(1, 2);
                }
                if (coorx > this.w / 2) {
                    this.sprite(1, 1);
                }
                if (coory < -this.h / 2) {
                    this.sprite(1, 0);
                }
                if (coory > this.h / 2) {
                    this.sprite(1, 3);
                }
                if (this._interactionObj) {
                    this._interactionObj.spacebarCallback();
                }
            })
            .bind("PlayerCanInteract", function () {
                this._interactionObj.enterCallback();
                this._wandering = false;
            })
            .bind("PlayerCannotInteract", function () {
                this._interactionObj.leaveCallback();
                this._wandering = true;
            });

        // NPC Walking only on google chrome
        if (window.navigator.userAgent.indexOf("Chrome") != -1) {
            this.bind("EnterFrame",function () {
                var dir, self;
                console.log("NPC EnterFrame");
                if (this._wandering && !this.disableControls) {
                    if (this._newDirection) {
                        this._newDirection = false;
                        dir = Crafty.randRange(0, 20);
                        switch (dir) {
                            case 1:
                                this._movement.x = 2;
                                this._movement.y = 0;
                                break;
                            case 2:
                                this._movement.x = 0;
                                this._movement.y = 2;
                                break;
                            case 3:
                                this._movement.x = -2;
                                this._movement.y = 0;
                                break;
                            case 4:
                                this._movement.x = 0;
                                this._movement.y = -2;
                                break;
                            default:
                                this._movement.x = 0;
                                this._movement.y = 0;
                        }
                        this.trigger("NewDirection", this._movement);
                        self = this;
                        setTimeout(function () {
                            self._newDirection = true;
                        }, Crafty.randRange(50, 250));
                    }
                } else {
                    this._movement.x = 0;
                    this._movement.y = 0;
                    this.trigger("NewDirection", this._movement);
                }
                // move this character
                this.moveSingleFrame(this._movement);

            }).bind("NewDirection", function (direction) {
                    if (direction.x < 0) {
                        if (!this.isPlaying("walk_left")) {
                            this.stop().animate("walk_left", 13, -1);
                        }
                    }
                    if (direction.x > 0) {
                        if (!this.isPlaying("walk_right")) {
                            this.stop().animate("walk_right", 13, -1);
                        }
                    }
                    if (direction.y < 0) {
                        if (!this.isPlaying("walk_up")) {
                            this.stop().animate("walk_up", 13, -1);
                        }
                    }
                    if (direction.y > 0) {
                        if (!this.isPlaying("walk_down")) {
                            this.stop().animate("walk_down", 13, -1);
                        }
                    }
                    if (!direction.x && !direction.y) {
                        this.stop();
                    }
                });

        }
        return this;
    },
    wander: function () {
        this._wandering = true;
        this._newDirection = true;
        return this;
    },
    setupScript: function (interactionObj) {
        this._interactionObj = interactionObj;
        return this;
    }
});
