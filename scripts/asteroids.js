const settings = {
    canvasWidth: 1000,
    canvasHeight: 600,
    asteroidRadius: 20,
    playerRadius: 10,
    keyLeft: 37,
    keyUp: 38,
    keyRight: 39,
    keyDown: 40
};

const asteroidData = [{
    id: 'a1'
}, {
    id: 'a2'
}, {
    id: 'a3'
}, {
    id: 'a4'
}, {
    id: 'a5'
}];

let highScore = 0;
let score = 0;
let shield = 100;

const canvas = d3.select('.boardcontainer')
    .append('svg')
    .attr('width', settings.canvasWidth)
    .attr('height', settings.canvasHeight)
    .attr('class', 'gameboard');

let asteroids = canvas.selectAll('c')
    .data(asteroidData)
    .enter()
    .append('circle')
    .attr('id', d => d.id)
    .attr('cx', d => Math.random() * settings.canvasWidth)
    .attr('cy', d => Math.random() * settings.canvasHeight)
    .attr('r', settings.asteroidRadius)
    .attr('fill', 'red')
    .attr('class', 'asteroid')
    .each(move);

let spaceShip = canvas.append('circle')
    .attr('cx', settings.canvasWidth / 2)
    .attr('cy', settings.canvasHeight / 2)
    .attr('r', settings.playerRadius)
    .attr('id', 'player');

function move() {
    d3.select(this).transition()
        .ease('cubic')
        .duration(Math.random() * 1000 + 1000)
        .attr('cx', Math.random() * settings.canvasWidth)
        .attr('cy', Math.random() * settings.canvasHeight)
        .each('end', move);
};

function trackMove() {
    let playerX = spaceShip.node().cx.animVal.value;
    let playerY = spaceShip.node().cy.animVal.value;

    asteroids.each(function() {
        let circle = d3.select(this);
        let circleX = circle[0][0].cx.animVal.value;
        let circleY = circle[0][0].cy.animVal.value;

        if (Math.abs(playerX - circleX) < 30 &&
            Math.abs(playerY - circleY) < 30) {
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

const timer = setInterval(() => {
    score++
    d3.select('div.current span').text(score)
}, 100);

trackMove();
