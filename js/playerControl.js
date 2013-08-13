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
        //pixelsPerFrame = 3;

        this._keys = keys;
        this._keyDirection = keys;
        this._vectors = {};
		
		for ( var k in this._keyDirection) {
			var keyCode = Crafty.keys[k] || k;
			this._vectors[keyCode] = {
				x : Math.round(Math.cos(this._keyDirection[k] * (Math.PI / 180)) * 1000 * 1) / 1000,
				y : Math.round(Math.sin(this._keyDirection[k] * (Math.PI / 180)) * 1000 * 1) / 1000
			};
		}

		this.requires("2D, Keyboard, Movable")
    .bind("EnterFrame", function () {
      if (this.disableControls) return;
      vector = {
        x: 0,
        y: 0
      }
      for (var key in this._keyDirection) {
        if (this.isDown(key)) {
          vector.x += this._vectors[Crafty.keys[key]].x;
          vector.y += this._vectors[Crafty.keys[key]].y;
        }
      }
      this.trigger("NewDirection", vector);
      this.moveSingleFrame(vector);
    }).bind("RemoveComponent", function() {
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
