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
var shipMoving = false;
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

	if (gameOver) {
		clearInterval(intervalID);
    }
	
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

    drawAll();
};


/* This is the place where everything is drawn from. Every drawFoo() function
 * should be called here and only here! */
function drawAll() {
	if (gameOver) {
		ctx.font = "20px Courier";
		ctx.fillStyle = GREEN_COLOR;
		var gameOverText = "GAME OVER";
		var measure = ctx.measureText(gameOverText);
		var gameOverWidth = measure.width;
		ctx.fillText(gameOverText, canvas.width/2 - (gameOverWidth/2), canvas.height/2);
		console.log("Game over");

	} else {
		
		//ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

		var draw = function(x) { x.draw(); };
		bullets.forEach(draw);
		asteroids.forEach(draw);

		ship.draw();

		ctx.font = "20px Georgia";
		ctx.fillStyle= GREEN_COLOR;
		//ctx.textBaseline = 'Top';
		var healthText = "Health: ";
		var healthMeasure = ctx.measureText(healthText);
		var healthWidth = healthMeasure.width;
		ctx.fillText(healthText, 5, 23);
		ctx.fillStyle = "grey";
		ctx.fillRect(healthWidth+5, 12, 200, 10);
		if (Math.floor(ship.health) >= 25)
		{
			ctx.fillStyle = GREEN_COLOR;
		}
		
		else {
			ctx.fillStyle = "red"; // I will make this more specific / prettier
		}
		
		ctx.fillRect(healthWidth+5, 12, (Math.floor(ship.health) * 2), 10);
		//ctx.fillText("Health: " + String(Math.floor(ship.health)), 5, 20);
		ctx.fillStyle = GREEN_COLOR;
		ctx.font = "20px Georgia";
		var scoreText = "Score: " + String(score);
		var scoreMeasure = ctx.measureText(scoreText);
		var scoreWidth = scoreMeasure.width;
		ctx.fillText(scoreText, canvas.width - scoreWidth - 5, 20);
	}
}

run();
