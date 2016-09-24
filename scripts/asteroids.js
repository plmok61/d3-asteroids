var settings = {
  canvasWidth: 1000,
  canvasHeight: 700,
  asteroidRadius: 20
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

var circles = canvas.selectAll('circle')
  .data(asteroids)
  .enter()
    .append('circle')
      .attr('id', function(d) { return d.id})
      .attr('cx', function(d) { return Math.random() * settings.canvasWidth})
      .attr('cy', function(d) { return Math.random() * settings.canvasHeight})
      .attr('r', settings.asteroidRadius)
      .attr('fill', 'red')
      .transition()
        .duration(function(d) { return Math.random() * 1000 + 1000})
        .ease("cubic")
        .attr("cx", Math.random() * settings.canvasWidth)
        .attr("cy", Math.random() * settings.canvasHeight)
        .each(slide);

function slide() {
  var circle = d3.select(this);
  (function repeat() {
    circle = circle.transition()
        .duration(Math.random() * 1000 + 1000)
        .attr("cx", Math.random() * settings.canvasWidth)
        .attr("cy", Math.random() * settings.canvasHeight)
        .each("end", repeat);
  })();
};

var asteroids = canvas.selectAll('circle');
var spaceShip = canvas.select('#player');

var isAlreadyTouching = false;

function trackMove() {
  var playerX = spaceShip.node().x.animVal.value + 20;
  var playerY = spaceShip.node().y.animVal.value + 20;

  asteroids.each(function() {
  var circle = d3.select(this);
    var circleX = circle[0][0].cx.animVal.value;
    var circleY = circle[0][0].cy.animVal.value;

    if (isAlreadyTouching === false &&
        Math.abs(playerX - circleX) < 40 &&
        Math.abs(playerY - circleY) < 40 ) {
      isAlreadyTouching = true;
    console.log(isAlreadyTouching)
      collisionCount--
      d3.select('div.collisions span').text(collisionCount);
    }
    if (Math.abs(playerX - circleX) > 40 &&
        Math.abs(playerY - circleY) > 40) {
      isAlreadyTouching = false;
    console.log(isAlreadyTouching)
    }

    if (collisionCount <= 0) {
      if (score > highScore) {
        highScore = score;
        d3.select('div.highscore span').text(highScore)
      }
      score = 0;
      collisionCount = 100;
    }

  })
  requestAnimationFrame(trackMove)
}

var timer = setInterval(function() {
  score++
  d3.select('div.current span').text(score)
},100)

trackMove();