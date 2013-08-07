Crafty.c("Character", {
    init: function () {
        var pad, charShadow;
		pad = 8;
        Crafty.sprite(32, "assets/charShadow.png", {
            charShadow: [0, 0]
        });
        charShadow = Crafty.e("2D, Canvas, charShadow").attr({
            x: 0,
            y: 3,
            alpha: 0.5
        });
        this.requires("2D, Collision, RespectZIndex, Movable, Collidable")
			.attach(charShadow)
			.collision(new Crafty.polygon([pad, this._h], [this._w - pad, this._h], [this._w / 2, this.h / 2]))
			.bind("Moved", function (from) {
				if (!this.disablecontrols) {
					var oldY, oldX;
					oldY = this._y;
					oldX = this._x;
					// TODO: make this better as to not call
					// collision 3 times.
					if (this.hit('Collidable')) {
						this.y = from.y;
					}
					if (this.hit('Collidable')) {
						this.x = from.x;
						this.y = oldY;
					}
					if (this.hit('Collidable')) {
						this.x = from.x;
						this.y = from.y;
					}
				}
			});
        return this;
    }
});