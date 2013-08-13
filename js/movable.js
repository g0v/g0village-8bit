Crafty.c("Movable", {
    init: function () {
		this._speed = 0;
		this._moving = false;
        this.requires("2D")
        return this;
    }, 
	setSpeed: function (spd) {
		this._speed = spd;
		return this;
	},
	// angle going clockwise starting at the 3 o clock position
	moveSingleFrame: function (movement) {
		var oldx, oldy, normalFactor, velX, velY;
	
		// store the old position
		oldx = this._x;
		oldy = this._y;
		// move the character
		if (movement.x !== 0 || movement.y !== 0) {
			// normalize the speed
			normalFactor = Math.sqrt(movement.x * movement.x + movement.y * movement.y);
			velX = movement.x / normalFactor * this._speed;
			velY = movement.y / normalFactor * this._speed;
			if (velX !== 0) {
				this.x += velX;
			}
			if (velY !== 0) {
				this.y += velY;
			}
			this.trigger('Moved', {
				x: oldx,
				y: oldy
			}, this._movement);
		}
		return this;
	}
});
