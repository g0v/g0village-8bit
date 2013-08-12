(function(){

    window.overworldSignScript = function (vnEngine, data, entity) {
        var counter = 0;
        var space = function () {
            if (!vnEngine.isWriting() && !vnEngine.isAnimating()) {
                switch (counter) {
                    case 0:
                        vnEngine.hideInteraction();
                        vnEngine.setPortrait("assets/empty.png");
                        vnEngine.setText("> " + data.content);
                        vnEngine.setName("");
                        vnEngine.showDialog();
                        counter=1;
                        break;
                    case 1:
                    default:
                        vnEngine.showInteraction();
                        vnEngine.hideDialog();
                        if (data.url) {
                            window.open(data.url)
                        }
                        counter=0;
                        break;
                }
            } else if (vnEngine.isWriting()) {
                vnEngine.forceTextFinish();
            }
        };
        var leave = function () {
            vnEngine.hideDialog();
            vnEngine.hideInteraction();
            counter = 0;
        };
        var enter = function () {
            vnEngine.showInteraction();
        };
        return {
            spacebarCallback: space,
            leaveCallback: leave,
            enterCallback: enter
        }
    };

})();
