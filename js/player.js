Crafty.c("Player", {
    centerCamera: _.throttle(function (boundingBox) {
        // centers the camera to this entity
		var oldX, oldY;
        oldX = Crafty.viewport.x;
        oldY = Crafty.viewport.y;
        newX = -this._x + 640 / 2;
        newY = -this._y + 440 / 2;

		if (boundingBox) {
			if (newX > boundingBox.x || -(newX) + 640 > boundingBox.x + boundingBox.w) {
				newX = oldX;
			}
			if (newY > boundingBox.y || -newY + 440 > boundingBox.y + boundingBox.h) {
				newY = oldY;
			}
		}
                if (Math.abs(newX - oldX) > 50) {
                    Crafty.viewport.x = newX;
                }
                if (Math.abs(newY - oldY) > 50) {
                    Crafty.viewport.y = newY;
                }
                this._camera_moved = ((oldX != Crafty.viewport.x) || (oldY != Crafty.viewport.y));
        return this;
    }, 50),
    getFacingDirection: function () {
        return this._facingDirection;
    },
    init: function () {
        this._facingDirection = "down";

        var speed = 2.5;
        if (window.navigator.userAgent.indexOf("Chrome") == -1) speed *= 2;

        this.requires("2D, Canvas, playerSprite, SpriteAnimation, Movable, PlayerControl, Character")
			.animate("walk_left", 0, 1, 3)
			.animate("walk_right", 0, 2, 3)
			.animate("walk_up", 0, 3, 3)
			.animate("walk_down", 0, 0, 3)
			.setSpeed(speed)
			.bind("NewDirection", function (direction) {
				if (direction.x < 0) {
					if (!this.isPlaying("walk_left")) {
						this.stop().animate("walk_left", 13, -1);
						this._facingDirection = "left";
					}
				}
				if (direction.x > 0) {
					if (!this.isPlaying("walk_right")) {
						this.stop().animate("walk_right", 13, -1);
						this._facingDirection = "right";
					}
				}
				if (direction.y < 0) {
					if (!this.isPlaying("walk_up")) {
						this.stop().animate("walk_up", 13, -1);
						this._facingDirection = "up";
					}
				}
				if (direction.y > 0) {
					if (!this.isPlaying("walk_down")) {
						this.stop().animate("walk_down", 13, -1);
						this._facingDirection = "down";
					}
				}
				if (!direction.x && !direction.y) {
					this.stop();
				}
			})
        return this;
    }
});
