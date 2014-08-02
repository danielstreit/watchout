var _h = 500;
var _w = 1000;
var padding = 10;
var numEnemies = 30;
var radius = 10;
var high = 0;
var dHigh = d3.select('div.high span');
var score = 0;
var dScore = d3.select('div.current span');
var collisions = 0;
var dCollisions = d3.select('div.collisions span');

var data = [];
var pCord = [[_w / 2, _h / 2]];
for (var i = 0; i < numEnemies; i++) {
  data.push(radius);
}

var svg = d3.select('body')
            .append('svg')
            .attr('width', _w)
            .attr('height', _h);

var drag = d3.behavior.drag()
              .on('drag', function() {
                var x, y;
                if (d3.event.x >= _w - padding) {
                  x = _w - padding;
                } else if (d3.event.x <= 0 + padding) {
                  x = padding;
                } else {
                  x = d3.event.x;
                }
                if (d3.event.y >= _h - padding) {
                  y = _h - padding;
                } else if (d3.event.y <= 0 + padding) {
                  y = padding;
                } else {
                  y = d3.event.y;
                }
                d3.select(this)
                  .attr('cx', x)
                  .attr('cy', y)
              });

var enemies = svg.selectAll('image')
                .data(data)
                .enter()
                .append('svg:image')
                .classed('enemy', true)
                .attr('xlink:href', 'shuriken.png')
                .attr('x', function(d, i) {
                  return Math.random() * _w;
                })
                .attr('y', function(d, i) {
                  return Math.random() * _h;
                })
                .attr('width', 20)
                .attr('height', 20);
                // .attr('cx', function(d, i) {
                //   return Math.random() * _w;
                // })
                // .attr('cy', function(d, i) {
                //   return Math.random() * _h;
                // })
                // .attr('r', function(d, i) {
                //   return d;
                // });

var player = svg.selectAll('player')
                .data(pCord)
                .enter()
                .append('circle')
                .attr('cx', function(d, i) {
                  return d[0];
                })
                .attr('cy', function(d, i) {
                  return d[1];
                })
                .attr('r', function(d, i) {
                  return radius;
                })
                .attr('fill', 'red')
                .call(drag);


var update = function() {
  enemies.transition()
          .duration(2000)
          .attr('y', function(d, i) {
            return Math.random() * _h;
          })
          .attr('x', function(d, i) {
            return Math.random() * _w;
          })

}

var collision = function() {
  if (score > high) {
    high = score;
    dHigh.text(high);
  }
  score = 0;
  dScore.text(score);
  collisions++;
  dCollisions.text(collisions);

};

var checkCollision = function(enemy) {
  enemy = d3.select(enemy);
  var px = player.attr('cx');
  var py = player.attr('cy');
  var ex = enemy.attr('x') - radius;
  var ey = enemy.attr('y') - radius;
  return 2 * radius > Math.sqrt(Math.pow(px - ex, 2) + Math.pow(py - ey, 2));
};

var checkForAnyCollisions = function() {
  score++;
  dScore.text(score);
  for(var i = 0; i < numEnemies; i++) {
    if (checkCollision(enemies[0][i])) {
      collision();
      return true;
    }
  }
};

var interval = setInterval(update, 2000);

var collisionInterval = setInterval(checkForAnyCollisions, 10);

