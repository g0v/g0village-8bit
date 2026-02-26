window.Pathfinder = (function() {
  var TILE = 32;
  var _grid = null;
  var _gridW = 0;
  var _gridH = 0;
  var _mapW = 0;
  var _mapH = 0;

  function isBlocked(worldX, worldY) {
    var hit = false;
    Crafty('Collidable').each(function() {
      if (this._x < worldX + TILE && this._x + this._w > worldX &&
          this._y < worldY + TILE && this._y + this._h > worldY) {
        hit = true;
      }
    });
    return hit;
  }

  function buildGrid(mapPixelW, mapPixelH) {
    _mapW = mapPixelW;
    _mapH = mapPixelH;
    _gridW = Math.ceil(mapPixelW / TILE);
    _gridH = Math.ceil(mapPixelH / TILE);
    var total = _gridW * _gridH;

    _grid = [];
    for (var i = 0; i < total; i++) {
      _grid[i] = [];
      for (var j = 0; j < total; j++) {
        _grid[i][j] = 0;
      }
    }

    for (var ty = 0; ty < _gridH; ty++) {
      for (var tx = 0; tx < _gridW; tx++) {
        var worldX = tx * TILE;
        var worldY = ty * TILE;
        var nodeIdx = ty * _gridW + tx;
        var blocked = isBlocked(worldX, worldY);
        if (!blocked) {
          if (tx > 0 && !isBlocked((tx - 1) * TILE, worldY)) {
            var leftIdx = ty * _gridW + (tx - 1);
            _grid[nodeIdx][leftIdx] = 1;
            _grid[leftIdx][nodeIdx] = 1;
          }
          if (ty > 0 && !isBlocked(worldX, (ty - 1) * TILE)) {
            var upIdx = (ty - 1) * _gridW + tx;
            _grid[nodeIdx][upIdx] = 1;
            _grid[upIdx][nodeIdx] = 1;
          }
        }
      }
    }
  }

  function GetShortestPath(adjMatrix, start, end, total) {
    var distanceMatrix = [];
    var visitedMatrix = [];
    var pred = [];

    for (var i = 0; i < total; i++) {
      distanceMatrix[i] = -1;
      visitedMatrix[i] = false;
      pred[i] = -1;
    }
    distanceMatrix[start] = 0;
    pred[start] = start;

    var remaining = total;
    while (remaining > 0) {
      var minDist = -1;
      var minNode = -1;
      for (var i = 0; i < total; i++) {
        if (!visitedMatrix[i] && distanceMatrix[i] >= 0) {
          if (minDist === -1 || distanceMatrix[i] < minDist) {
            minDist = distanceMatrix[i];
            minNode = i;
          }
        }
      }
      if (minNode === -1) break;

      visitedMatrix[minNode] = true;
      remaining--;

      if (minNode === end) break;

      for (var j = 0; j < total; j++) {
        if (!visitedMatrix[j] && adjMatrix[minNode][j] === 1) {
          var newDist = distanceMatrix[minNode] + 1;
          if (distanceMatrix[j] === -1 || newDist < distanceMatrix[j]) {
            distanceMatrix[j] = newDist;
            pred[j] = minNode;
          }
        }
      }
    }

    if (distanceMatrix[end] === -1) return null;
    var path = [];
    var current = end;
    var limit = total;
    while (current !== start && limit-- > 0) {
      path.unshift(current);
      current = pred[current];
    }
    path.unshift(start);
    return path;
  }

  function pixelToTile(px, py) {
    var tx = Math.floor(px / TILE);
    var ty = Math.floor(py / TILE);
    tx = Math.max(0, Math.min(_gridW - 1, tx));
    ty = Math.max(0, Math.min(_gridH - 1, ty));
    return ty * _gridW + tx;
  }

  function tileToPixel(idx) {
    var tx = idx % _gridW;
    var ty = Math.floor(idx / _gridW);
    return { x: tx * TILE + TILE / 2, y: ty * TILE + TILE / 2 };
  }

  function findPath(startX, startY, endX, endY) {
    if (!_grid) return null;
    var total = _gridW * _gridH;
    var startIdx = pixelToTile(startX, startY);
    var endIdx = pixelToTile(endX, endY);
    if (startIdx === endIdx) return [];
    var path = GetShortestPath(_grid, startIdx, endIdx, total);
    if (!path) return null;
    return path.map(tileToPixel);
  }

  return {
    buildGrid: buildGrid,
    rebuildGrid: function(mapW, mapH) { buildGrid(mapW, mapH); },
    findPath: findPath,
    TILE: TILE
  };
})();
