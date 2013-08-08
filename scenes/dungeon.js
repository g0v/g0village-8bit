window.dungeonScene = function() {
    var GetShortestPath = function(adjMatrix,start,end) {
    var distanceMatrix = [];
    var visitedMatrix = [];
    var pred = [];
    var size = Math.sqrt(adjMatrix.length); // assume square

    for (var k = 0; k < size*size; k++) {
        distanceMatrix[k] = -1;
        visitedMatrix[k] = false;
        pred[k] = -1;
    };

    distanceMatrix[start] = 0;
    pred[start] = start;

    var getUnvisitedNeighbors = function (node) {
        return adjMatrix[node].reduce(function (arr,current,index) {
            if (current === 1) {
                if (!visitedMatrix[index]) {
                    arr.push(index);
                }
            }

            return arr;
        }, []);
    };
    var allVisited = function () {
        return visitedMatrix.reduce(function(toRet, current, index) {
            return toRet & current;
        });
    };

    var getSmallestNode = function () {
        return distanceMatrix.reduce(function(toRet, current, index) {
            if (current !== -1 && !visitedMatrix[index]) {
                if (distanceMatrix[toRet] === -1) {
                    toRet = index;
                }

                if (visitedMatrix[toRet]) {
                    toRet = index;
                }

                if (current < distanceMatrix[toRet]) {
                    toRet = index;
                }

            }

            return toRet;
        }, 0);
    };


    var currentNode = start;
    var visitedNumber = size*size;
    while (visitedNumber >= 0) {
        var neighbors = getUnvisitedNeighbors(currentNode);

            for (var k = 0; k < neighbors.length; k++) {
                var node = neighbors[k];
                var dist = distanceMatrix[currentNode] + 1;
                if (distanceMatrix[node] === -1 || dist < distanceMatrix[node] ) {
                    distanceMatrix[node] = dist;
                    pred[node] = currentNode;
                }
            }

        visitedMatrix[currentNode] = true;
        visitedNumber--;

        // use a priority queue instead
        currentNode = getSmallestNode();
        console.log(distanceMatrix[currentNode]);

    }

    var toRet = [];
    var currentPred = end
    while (currentPred !== start) {
        toRet.push(currentPred);
        currentPred = pred[currentPred];
    }
    toRet.push(start);
    return toRet;
}

var matrix = [];
var size = 10;

    var toNode = function (x,y) {
        return size*x+y;
    };

    var toCoordinates = function (node) {
        var x = node % size;
        var y = Math.floor(node/size);
        return [x,y];
    };

for (var lcv1 = 0; lcv1 < size*size; lcv1++) {
    matrix[lcv1] = [];

    for (var lcv2 = 0; lcv2 < size*size; lcv2++) {
        //it is 1 if it is adjecent to another square
        if (Math.abs(lcv1 - lcv2) === 1) {
            matrix[lcv1][lcv2] = 1;
        } else if (Math.abs(lcv1 - lcv2) === size) {
            matrix[lcv1][lcv2] = 1;
        } else {
            matrix[lcv1][lcv2] = 0;
        }
        if (lcv2 % size === 0 && lcv2 - lcv1 === 1) {
            matrix[lcv1][lcv2] = 0
        }
        if ((lcv2+1) & size === 0 && lcv1 - lcv2 === 1 ) {
            matrix[lcv1][lcv2] = 0;
        }
        if (lcv1 % size === 0 && lcv1 - lcv2 === 1) {
            matrix[lcv1][lcv2] = 0;
        }
    }
}
var coord1 = Crafty.randRange(0,size*size);
var coord2 = Crafty.randRange(0,size*size);
var shortestPath = GetShortestPath(matrix,coord1,coord2);
var shortestPath2;

var relax = function(m, sp) {
    for (var k = 0; k < sp.length; k++ ) {
        var node = sp[k];
        //remove neighbors parallel to the path
        var neighbors = m[node].reduce(function (arr,current,index) {
                if (current === 1) {
                        arr.push(index);
                }


                return arr;
            }, []);

        for (var j = 0; j < neighbors.length; j++) {
            var n = neighbors[j];
            if (sp.indexOf(n) >= 0) {
                m[node][n] = 0;
            } else {
                if (Math.abs(n - node) === 1) {
                    if (n - size >= 0) {
                        m[n][n-size] = 0;
                    }

                    if (n + size < size*size) {
                        m[n][n+size] = 0;
                    }
                }
                else
                {
                    if (n - 1 >= 0) {
                        m[n][n-1] = 0;
                    }

                    if (n + 1 < size*size) {
                        m[n][n+1] = 0;
                    }
                }
            }
        }
    }

    return m;
}

matrix = relax(matrix,shortestPath);
var str = size*size + " ";
for (var m = 0; m < size*size; m++ ) {
    for (var n = 0; n < size*size; n++) {
        str += (matrix[m][n] + " ");
    }
}

console.log(str);

coord1 = Crafty.randRange(0,size*size);
coord2 = Crafty.randRange(0,size*size);
shortestPath2 = GetShortestPath(matrix,coord1,coord2);

matrix = relax(matrix,shortestPath2);


coord1 = Crafty.randRange(0,size*size);
coord2 = Crafty.randRange(0,size*size);
var shortestPath3 = GetShortestPath(matrix,coord1,coord2);

    var vnEngine = Crafty.e("NovelInterface");


    Crafty.sprite(32, "assets/rock.png", {
        rock: [0,0]
    });

    Crafty.sprite(32, "assets/bush.png", {
        bush: [0,0]
    });

    Crafty.sprite(32, "assets/smalltree.png", {
        smallTree: [0,0]
    });
    var makeRockAt = function(x,y) {
        Crafty.e("2D, Canvas, rock, Collision, RespectZIndex, Collidable").attr({
            x:x*32,
            y:y*32,
        }).collision(new Crafty.polygon([0,32],[32,32],[32,5],[0,5]));
    }

    var makeBushAt = function(x,y) {
        Crafty.e("2D, Canvas, bush, Collision, RespectZIndex, Collidable").attr({
            x:x*32,
            y:y*32,
        }).collision(new Crafty.polygon([0,32],[32,32],[32,20],[0,20]));
    }

    var makeSmallTreeAt = function(x,y) {
        Crafty.e("2D, Canvas, smallTree, Collision, RespectZIndex, Collidable").attr({
            x:x*32,
            y:y*32,
        }).collision(new Crafty.polygon([0,32],[32,32],[32,20],[0,20]));
    }

    for (var k = 0; k < shortestPath.length; k++) {
        var c = toCoordinates(shortestPath[k]);
        makeBushAt(c[0],c[1]);
    }

    if (shortestPath2) {
    for (var k = 0; k < shortestPath2.length; k++) {
        var c = toCoordinates(shortestPath2[k]);
        makeRockAt(c[0],c[1]);
    }
    }
    if (shortestPath3) {
    for (var k = 0; k < shortestPath3.length; k++) {
        var c = toCoordinates(shortestPath3[k]);
        makeSmallTreeAt(c[0],c[1]);
    }
    }

    Crafty.sprite(32, "soujisprite.png", {
        playerSprite: [1,0]
    });

    var player1 = Crafty.e("Player").attr({
        x: 200,
        y: 223,
    }).centerCamera().bind("Moved", function() {

        //center the camera on the player
        this.centerCamera();

        //move the  interface
        vnEngine.updatePosition();
    });
};

