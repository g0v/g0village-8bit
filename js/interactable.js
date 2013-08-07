Crafty.c("Interactable", {
    init: function () {
        this._inInteractRegion = false;
		this._canInteract = false;
		this.disableInteraction = false;
        this.requires("2D, Keyboard, Aggro")
			.bind("PlayerAggro", function () {
				this._inInteractRegion = true;
			})
			.bind("PlayerUnaggro", function() {
				this._inInteractRegion = false;
				if (this._canInteract) {
					this.trigger("PlayerCannotInteract");
				}
				this._canInteract = false;
			})
			.bind("EnterFrame", function () {
				var player, coorx, coory, canInteract, dir, self, oldx, oldy;
				if (this._inInteractRegion) {
					player = new Crafty(new Crafty("Player")[0]);
					coorx = this._x + this._w / 2 - (player._x + player._w / 2);
					coory = this._y + this._h / 2 - (player._y + player._h / 2);
					canInteract = false;
					if (coorx < 0 && player.getFacingDirection() === "left") {
						canInteract = true;
					}
					if (coorx > 0 && player.getFacingDirection() === "right") {
						canInteract = true;
					}
					if (coory < 0 && player.getFacingDirection() === "up") {
						canInteract = true;
					}
					if (coory > 0 && player.getFacingDirection() === "down") {
						canInteract = true;
					}
					// this player can interact
					if (canInteract) {
						if (!this._canInteract) {
							this.trigger("PlayerCanInteract");
						}
						this._canInteract = true;
					} else {
						if (this._canInteract) {
							this.trigger("PlayerCannotInteract");
						}
						this._canInteract = false;
					}
				}
			})
			.bind("KeyDown", function (e) {
				if (!this.disableInteraction) {
					if (e.key === 32) {
						var player = new Crafty(new Crafty("Player")[0]), coorx, coory;
						if (this._canInteract) {
							this.trigger("PlayerInteracted");
						}
					}
				}
			})
			.bind("RemoveComponent", function () {
				this.unbind("KeyDown");
				this.unbind("EnterFrame");
				this.unbind("PlayerAggro");
				this.unbind("PlayerUnaggro");
			});
        return this;
    }
});