/* All the initialization and main loop stuff goes here. */


var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var ship = new Ship(100, 100, SHIP_RADIUS, 1, 1, 0);
var bullets = [];
var asteroids = [];
var lastAsteroidSpawn = 0;
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

    now = getTime();
    var update = function(x) { x.update(); };
    bullets.forEach(update);
    asteroids.forEach(update);
    // delete old bullets
    var shouldPersist = function(x) { return x.shouldPersist; };
    bullets = bullets.filter(shouldPersist);
    asteroids = asteroids.filter(shouldPersist);

    // spawn a new asteroid
    if (now - lastAsteroidSpawn > ASTEROID_PERIOD) {
        lastAsteroidSpawn = now;
        // make a new asteroid, randomly, but not colliding with ship
        do {
            vec = unitVector(Math.random());
            newAsteroid = new Asteroid(
                Math.random()*canvas.width,
                Math.random()*canvas.height,
                vec[0] * ASTEROID_SPEED * (Math.random()*2-1),
                vec[1] * ASTEROID_SPEED * (Math.random()*2-1),
                Math.random()*ASTEROID_RADIUS);
            var dist = distance(ship.x, ship.y, newAsteroid.x, newAsteroid.y);
        } while (dist < ship.radius + 3*newAsteroid.radius);
        asteroids.push(newAsteroid);
    }

    if (gameOver) {
		clearInterval(intervalID);
    }

    drawAll();
};


/* This is the place where everything is drawn from. Every drawFoo() function
 * should be called here and only here! */
function drawAll() {
	if (gameOver) {

		ctx.font = "20px Arial";
		ctx.fillStyle = GREEN_COLOR;
		ctx.fillText("GAME OVER", canvas.width/2 - 30, canvas.height/2);
		console.log("Game over");

	} else {

		ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

		var draw = function(x) { x.draw(); };
		bullets.forEach(draw);
		asteroids.forEach(draw);

		ship.draw();

		ctx.font = "20px Arial";
		ctx.fillStyle= GREEN_COLOR;
		ctx.fillText("Health: " + String(Math.floor(ship.health)), 5, 20);
		ctx.fillText("Score: " + String(score), 5, canvas.height - 10);

	}
}

run();
