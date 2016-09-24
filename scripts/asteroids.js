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

var circles = canvas.selectAll('circle')
  .data(asteroids)
  .enter()
    .append('circle')
      .attr('id', function(d) { return d.id })
      .attr('cx', function(d) { return Math.random() * settings.canvasWidth })
      .attr('cy', function(d) { return Math.random() * settings.canvasHeight })
      .attr('r', settings.asteroidRadius)
      .attr('fill', 'red')
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
