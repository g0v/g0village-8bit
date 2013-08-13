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

      this.oldX = this.x;
      this.oldY = this.y;

      this.requires("2D, Collision, RespectZIndex, Movable, Collidable")
			.attach(charShadow)
			.collision(new Crafty.polygon([pad, this._h], [this._w - pad, this._h], [this._w / 2, this.h / 2]))
			.bind("Moved", function() {
        // TODO: make this better as to not call
        // collision 2 times.
        if (this.hit('Collidable')) {
          this.y = this.oldY;
        }
        if (this.hit('Collidable')) {
          this.x = this.oldX;
        }
        this.oldX = this.x;
        this.oldY = this.y;
			});
      return this;
    }
});
