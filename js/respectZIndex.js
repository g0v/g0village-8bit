var __guidIndex = 0;
Crafty.c("RespectZIndex", {
    init: function () {
        this.requires("2D");
		this.z = __guidIndex;
		__guidIndex += 1;
        this.bind("FinishFrame", function () {
            // calculate z index
            // does this by swapping z index with anything below or above.
            // there might be syncing issues, but fuck that too lazy to fix
            var chrs = new Crafty("RespectZIndex"), lcv, el, temp;
			chrs = chrs.toArray();
            for (lcv = 0; lcv < chrs.length; lcv += 1) {
                el = new Crafty(chrs[lcv]);
                // computer the center
                if ((el._y + el._h / 2) > (this._y + this._h / 2) && this._z > el._z) {
                    temp = this._z;
                    this.z = el._z;
                    el.z = temp;
                }
                if ((el._y + el._h / 2) < (this._y + this._h / 2) && this._z < el._z) {
                    temp = el._z;
                    el.z = this._z;
                    this.z = temp;
                }
            }
        });
        return this;
    }
});
