var highScore = 0;
var score = 0;
var shield = 100;


var canvas = d3.select('body')
  .append('svg')
  .attr('width', settings.canvasWidth)
  .attr('height', settings.canvasHeight)
  .attr('class', 'gameboard')

var circles = canvas.selectAll('circle')
  .data(dataArray)
  .enter()
    .append('circle')
      .attr('cx', function(d) { return Math.random() * canvasWidth})
      .attr('cy', function(d) { return Math.random() * canvasHeight})
      .attr('r', 20)
      .attr('fill', 'red')
      .transition()
        .duration(function(d) { return Math.random() * 1000 + 1000})
        .ease("cubic")
        .attr("cx", Math.random() * canvasWidth)
        .attr("cy", Math.random() * canvasHeight)
        .each(slide);

function slide() {
  var circle = d3.select(this);
  (function repeat() {
    circle = circle.transition()
        .duration(Math.random() * 1000 + 1000)
        .attr("cx", Math.random() * canvasWidth)
        .attr("cy", Math.random() * canvasHeight)
        .each("end", repeat);
  })();
};