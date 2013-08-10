Crafty.c("Aggro", {
    init: function () {
        this._canAggro = false;
		this._aggroRegion = Crafty.e("2D, Collision");
		this._aggroRegion.attr({x:0,y:0,w:this._w,h:this._h});
		this.attach(this._aggroRegion);
		
		this.setAggroRadius(2);
        this.requires("2D")
			.bind("FinishFrame", function () {
                        var player = this._player || (this._player = new Crafty(new Crafty("Player")[0]));
                        var coorx, coory, canInteract = false, dir, self, oldx, oldy;
				if (this._aggroRegion.hit("Player")) {
					if (!this._canAggro) {
						this.trigger("PlayerAggro");
					}
					this._canAggro = true;
				} else {
					if (this._canAggro) {
						this.trigger("PlayerUnaggro");
					}
					this._canAggro = false;
				}
			})
        return this;
    },
	setAggroRadius: function (r) {
		this._r = r;
		this._aggroRegion
			.collision(new Crafty.polygon([0,0],[0,this._w + 2*r],[this._h + 2*r,this._w + 2*r],[this._h + 2*r,0]))
			.attr({x: -r, y: -r, w: this._w + 2*r, h: this._h + 2 * r});
	}
});
