Crafty.c("Player", {
    centerCamera: function (boundingBox) {
        // centers the camera to this entity
		var oldX, oldY;
        oldX = Crafty.viewport.x;
        oldY = Crafty.viewport.y;
        Crafty.viewport.x = -this._x + 640 / 2;
        Crafty.viewport.y = -this._y + 440 / 2;
		if (boundingBox) {
			if (Crafty.viewport.x > boundingBox.x || -(Crafty.viewport.x) + 640 > boundingBox.x + boundingBox.w) {
				Crafty.viewport.x = oldX;
			}
			if (Crafty.viewport.y > boundingBox.y || -Crafty.viewport.y + 440 > boundingBox.y + boundingBox.h) {
				Crafty.viewport.y = oldY;
			}
		}
                this._camera_moved = ((oldX != Crafty.viewport.x) || (oldY != Crafty.viewport.y));
        return this;
    },
    getFacingDirection: function () {
        return this._facingDirection;
    },
    init: function () {
        this._facingDirection = "down";
		
        this.requires("2D, Canvas, playerSprite, SpriteAnimation, Movable, PlayerControl, Character")
			.animate("walk_left", 0, 1, 3)
			.animate("walk_right", 0, 2, 3)
			.animate("walk_up", 0, 3, 3)
			.animate("walk_down", 0, 0, 3)
			.setSpeed(2.5)
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
