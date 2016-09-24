var settings = {
  canvasWidth: 1000,
  canvasHeight: 600,
  asteroidRadius: 20,
  playerRadius: 10,
  keyLeft: 37,
  keyUp: 38,
  keyRight: 39,
  keyDown: 40
}

var asteroids = [
  {id: 'a1'},
  {id: 'a2'},
  {id: 'a3'},
  {id: 'a4'},
  {id: 'a5'}
];

var highScore = 0;
var score = 0;
var shield = 100;

var canvas = d3.select('.boardcontainer')
  .append('svg')
  .attr('width', settings.canvasWidth)
  .attr('height', settings.canvasHeight)
  .attr('class', 'gameboard')

var circles = canvas.selectAll('c')
  .data(asteroids)
  .enter()
    .append('circle')
      .attr('id', function(d) { return d.id })
      .attr('cx', function(d) { return Math.random() * settings.canvasWidth })
      .attr('cy', function(d) { return Math.random() * settings.canvasHeight })
      .attr('r', settings.asteroidRadius)
      .attr('fill', 'red')
      .attr('class', 'asteroid')
      .each(slide);

var player = canvas.append('circle')
   .attr('cx', settings.canvasWidth / 2 )
   .attr('cy', settings.canvasHeight / 2 )
   .attr('r', settings.playerRadius )
   .attr('id', 'player')

function slide() {
  var circle = d3.select(this);
  (function repeat() {
    circle = circle.transition()
        .ease('cubic')
        .duration(Math.random() * 1000 + 1000)
        .attr("cx", Math.random() * settings.canvasWidth)
        .attr("cy", Math.random() * settings.canvasHeight)
        .each("end", repeat);
  })();
};

var asteroids = canvas.selectAll('.asteroid');
var spaceShip = canvas.select('#player');


function trackMove() {
  var playerX = spaceShip.node().cx.animVal.value;
  var playerY = spaceShip.node().cy.animVal.value;

  asteroids.each(function() {
  var circle = d3.select(this);
    var circleX = circle[0][0].cx.animVal.value;
    var circleY = circle[0][0].cy.animVal.value;

    if (Math.abs(playerX - circleX) < 30 &&
        Math.abs(playerY - circleY) < 30 ) {
      shield--
      d3.select('div.shield span').text(shield);
    }

    if (shield <= 0) {
      if (score > highScore) {
        highScore = score;
        d3.select('div.highscore span').text(highScore)
      }
      score = 0;
      shield = 100;
    }

  })
  requestAnimationFrame(trackMove)
}

var timer = setInterval(function() {
  score++
  d3.select('div.current span').text(score)
},100)

trackMove();