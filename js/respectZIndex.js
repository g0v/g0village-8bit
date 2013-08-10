var __guidIndex = 0;
var __cached_chrs;
var __cached_time;
Crafty.c("RespectZIndex", {
    init: function () {
        this.requires("2D");
		this.z = __guidIndex;
		__guidIndex += 1;
        this.bind("FinishFrame", function () {
            /* cap per-element zIndex refresh rate at 4FPS */
            if (this.__cached_debounce > ((new Date).getTime() - 250)) { return; }
            this.__cached_debounce = (new Date).getTime();
            // calculate z index
            // does this by swapping z index with anything below or above.
            // there might be syncing issues, but fuck that too lazy to fix
            // cache object refresh rate at 5000ms
            var chrs;
            if (__cached_chrs && (__cached_time > ((new Date).getTime() - 5000))) {
                chrs = __cached_chrs;
            }
            else {
                chrs = __cached_chrs = (new Crafty("RespectZIndex")).toArray();
                for (lcv = 0; lcv < chrs.length; lcv += 1) {
                    chrs[lcv] = new Crafty(chrs[lcv]);
                }
                __cached_time = (new Date).getTime();
            }

            var lcv, el, temp;
            for (lcv = 0; lcv < chrs.length; lcv += 1) {
                el = chrs[lcv];
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
