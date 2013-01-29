/* All the initialization and main loop stuff goes here. */


var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var ship = new Ship(100, 100, SHIP_RADIUS, 1, 1, 0);
var bullets = [];
// hazard = asteroids, aliens, etc.
var hazards = [];
var lastAsteroidSpawn = 0;
var lastAlienSpawn = 0;
var lastBulletFired = 0;
var score = 0;
var gameOver = false;
var backgroundImage = new Image();
backgroundImage.src = BACKGROUND_IMAGE;

/* The function that starts it all. Do some basic startup garbage, call
 * mainLoop, and you're done. */
function run() {
    canvas.addEventListener('keydown', onKeyDown, false);
    canvas.addEventListener('keyup', onKeyUp, false);
    canvas.setAttribute('tabindex','0');
    canvas.focus();
    intervalID = setInterval(mainLoop, PERIOD);
}

/* This function is called to update everything: move the ship, kill things,
 * draw everything. */
function mainLoop() {
    var i, newBullets, now, vec, newAsteroid;
    ship.update();

    //if (gameOver) {
    //  clearInterval(intervalID);
    //}

    //else {
    now = getTime();
    var update = function(x) { x.update(); };
    bullets.forEach(update);
    hazards.forEach(update);
    // delete old bullets
    var shouldPersist = function(x) { return x.shouldPersist; };
    bullets = bullets.filter(shouldPersist);
    hazards = hazards.filter(shouldPersist);

    // spawn a new asteroid
    if (now - lastAsteroidSpawn > ASTEROID_PERIOD) {
        lastAsteroidSpawn = now;
        // make a new asteroid, randomly, but not colliding with ship
        do {
            vec = unitVector(Math.random());
            newAsteroid = new Asteroid(
                randomEdgeX(),
                randomEdgeY(),
                vec[0] * ASTEROID_SPEED * (Math.random()*2-1),
                vec[1] * ASTEROID_SPEED * (Math.random()*2-1),
                Math.random()*ASTEROID_RADIUS);
            var dist = distance(ship.x, ship.y, newAsteroid.x, newAsteroid.y);
        } while (dist < ship.radius + 3*newAsteroid.radius);
        hazards.push(newAsteroid);
    }

    // spawn a new alien
    if (now - lastAlienSpawn > ALIEN_PERIOD) {
        lastAlienSpawn = now;
        do {
            var newAlien = new Alien(randomEdgeX(),
                                     randomEdgeY(),
                                     ALIEN_RADIUS);
            dist = distance(ship.x, ship.y, newAlien.x, newAlien.y);
        } while (dist < ship.radius + 3*newAlien.radius);
        hazards.push(newAlien);
    }
    drawAll();
};


/* This is the place where everything is drawn from. Every drawFoo() function
 * should be called here and only here! */
function drawAll() {
    ctx.font = "20px Courier";
    ctx.fillStyle = GREEN_COLOR;
    var scoreText = "Score: " + String(score);
    var scoreMeasure = ctx.measureText(scoreText);
    var scoreWidth = scoreMeasure.width;
    //var scoreHeight = scoreMeasure.height;

    if (gameOver) {
        clearInterval(intervalID);
        ctx.font = "20px Courier";
        ctx.fillStyle = GREEN_COLOR;
        var gameOverText = "GAME OVER";
        var measure = ctx.measureText(gameOverText);
        var gameOverWidth = measure.width;
        ctx.fillText(gameOverText, canvas.width/2 - (gameOverWidth/2), canvas.height/2 - 10);
        ctx.fillText(scoreText, canvas.width/2 - (scoreWidth/2), canvas.height/2 + 15);
        console.log("Game over");

    } else {

        //ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

        var draw = function(x) { x.draw(); };
        bullets.forEach(draw);
        hazards.forEach(draw);

        ship.draw();

        drawHealth();

        ctx.fillStyle = GREEN_COLOR;
        ctx.font = "20px Georgia";
        ctx.fillText(scoreText, canvas.width - scoreWidth - 5, 20);
    }
}

run();
