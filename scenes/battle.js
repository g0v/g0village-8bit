window.battleScene = function() {
    console.log("entering a battle");
    // now how would i want this battle to go down...
    // let's make it just like final fantasy 6
    Crafty.c("BattleEngine", {
            init: function() {
                    this._friends = [];
                    this._foes = [];

            },
            addFriend: function(entity) {
                    this._friends.push(entity);
                    return this;
            },
            addFoe: function(entity) {
                    this._foes.push(entity);
                    return this;
            }
    })
};
