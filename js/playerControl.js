Crafty.c("PlayerControl", {
    init: function () {
		var keys;
        keys = {
            W: -90,
            S: 90,
            D: 0,
            A: 180,
            UP_ARROW: -90,
            DOWN_ARROW: 90,
            LEFT_ARROW: 180,
            RIGHT_ARROW: 0
        };
	    this._keysPressed = 0;
        this._movement = {
            x: 0,
            y: 0
        };
        this._keys = keys;
        this._keyDirection = keys;
		
		for ( var k in this._keyDirection) {
			var keyCode = Crafty.keys[k] || k;
			this._keys[keyCode] = {
				x : Math.round(Math.cos(this._keyDirection[k] * (Math.PI / 180)) * 1000 * 1) / 1000,
				y : Math.round(Math.sin(this._keyDirection[k] * (Math.PI / 180)) * 1000 * 1) / 1000
			};
		}
						
		this.requires("2D, Keyboard")
			.bind("KeyDown", function (e) {
				if (this._keys[e.key]) {
					this._keysPressed += 1;
					this._movement.x = Math.round((this._movement.x + this._keys[e.keyCode].x) * 1000) / 1000;
					this._movement.y = Math.round((this._movement.y + this._keys[e.keyCode].y) * 1000) / 1000;
					if (this._keysPressed === 1) {
						var self = this;
						this.t = setTimeout(function () {
							self._moving = true;
						}, 70);
					}
					
					if (!this.disableControls) {
					this.trigger('NewDirection', this._movement);
					}
				}
			})
			.bind("KeyUp", function (e) {
				if (this._keys[e.key]) {
					// decrement the number of keys
					// pressed
					this._keysPressed -= 1;
					if (this._keysPressed >= 0) {
						// set the speed components
						this._movement.x = Math.round((this._movement.x - this._keys[e.keyCode].x) * 1000) / 1000;
						this._movement.y = Math.round((this._movement.y - this._keys[e.keyCode].y) * 1000) / 1000;
						if (this._keysPressed === 0) {
							// stop moving
							this._moving = false;
							clearTimeout(this.t);
						}
						// trigger a new direction
					if (!this.disableControls) {
					this.trigger('NewDirection', this._movement);
					}
					} else {
						this._keysPressed = 0;
					}
				}
			})
			.bind("EnterFrame", function () {
				var oldx, oldy, normalFactor, velX, velY;
				if (this._moving && !this.disableControls) {
					this.moveSingleFrame(this._movement);
				}
			}).bind("RemoveComponent", function() {
				this.unbind("KeyUp");
				this.unbind("KeyDown");
				this.unbind("EnterFrame");
			});
        return this;
    },
	disable: function () {
		this.disableControls = true;
	},
	enable: function() {
		this.disableControls = false;
	}
});