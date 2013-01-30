/* All the initialization and main loop stuff goes here. */

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//canvas.addEventListener('onmousedown', onClick, false);

var ship; // = new Ship(100, 100, SHIP_RADIUS, 1, 1, 0);
var bullets; //  = [];
// hazard = asteroids, aliens, etc.
var hazards; //  = [];
var lastAsteroidSpawn; //  = 0;
var lastAlienSpawn; //  = 0;
var lastBulletFired; //  = 0;
var score; //  = 0;
var gameOver; //  = false;
var isPaused; //  = false;
var pPressedLastTime; // was p being held last tick?
var intervalID;

var backgroundImage = new Image();
backgroundImage.src = BACKGROUND_IMAGE;

var initScreen = new Image();
initScreen.src = INIT_SCREEN_IMAGE;


function newGameVars()
{
	ship = new Ship(100, 100, SHIP_RADIUS, 1, 1, 0);
	bullets = [];
	// hazard = asteroids, aliens, etc.
	hazards = [];
	lastAsteroidSpawn = 0;
	lastAlienSpawn = 0;
	lastBulletFired = 0;
	score = 0;
	gameOver = false;
	isPaused = false;
    pPressedLastTime = false;
	gameState = 1;
	score = 0;
}

/* The function that starts it all. Do some basic startup garbage, call
 * mainLoop, and you're done. */
function newGame() {
	clearInterval(intervalID);
	newGameVars();
    canvas.addEventListener('keydown', onKeyDown, false);
    canvas.addEventListener('keyup', onKeyUp, false);
    canvas.setAttribute('tabindex','0');
    canvas.focus();
	SET_CONSTANTS(gameState);
	checkForKeysTimer();
    intervalID = setInterval(mainLoop, PERIOD);
}

/* This function is called to update everything: move the ship, kill things,
 * draw everything. */
function mainLoop() {
    var i, newBullets, now, vec, newAsteroid;

	if (!isPaused){
        // set new gameState if necessary
        var oldGameState = gameState;
        // cheat some more or fewer points
        if (keyPressed(EQUALS_KEY)) {
            score += CHEAT_INCREMEMT;
        } else if (keyPressed(MINUS_KEY)){
            score -= 50;
        }
		if (score < 50) {
            gameState = 1;
        }
		else if (score >= 50 && score < 100) {
            gameState = 2;
        }
		else if (score >= 100 && score < 150) {
            gameState = 3;
        }
		else if (score >= 150 && score < 200) {
            gameState = 4;
        }
		else if (score >= 200 && score < 250) {
            gameState = 5;
        }
		else {
            gameState = 6;
        }
        // only set constants when there was a change
        if (oldGameState !== gameState) {
            SET_CONSTANTS(gameState);
            if (gameState === 6) {
                hazards.push(new Kosbie(canvas.width/2, 50));
            }
        }


        // update everything
		ship.update();
		now = getTime();
		var update = function(x) { x.update(); };
		bullets.forEach(update);
		hazards.forEach(update);

		// delete old bullets and old hazards
		var shouldPersist = function(x) { return x.shouldPersist; };
		bullets = bullets.filter(shouldPersist);
		hazards = hazards.filter(shouldPersist);

		// spawn a new asteroid
		if (now - lastAsteroidSpawn > ASTEROID_PERIOD) {
			lastAsteroidSpawn = now;
			// make a new asteroid, randomly, but not colliding with ship
			do {
				vec = unitVector(Math.random()*2*Math.PI);
				newAsteroid = new Asteroid(
					randomEdgeX(),
					randomEdgeY(),
					vec[0] * ASTEROID_SPEED * Math.random(),
					vec[1] * ASTEROID_SPEED * Math.random(),
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
	}

    // toggle isPaused
    if (!pPressedLastTime && keyPressed(P_KEY)) {
        isPaused = !isPaused;
    }
    pPressedLastTime = keyPressed(P_KEY);

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
        //clearInterval(intervalID);

        drawHealth();

        // stop loop from running
        clearInterval(intervalID);
        ctx.fillStyle = GREEN_COLOR;
		ctx.font = "40px Courier";

		// measure game over text
        var gameOverText = "GAME OVER";
        var measure = ctx.measureText(gameOverText);
        var gameOverWidth = measure.width;
		var gameOverTextPixelLeft = canvas.width/2 - (gameOverWidth/2);
		var gameOverTextPixelTop = canvas.height/2 - 30;

		// draw game over state
        ctx.fillStyle = "black";
        ctx.fillStyle = GREEN_COLOR;
        ctx.fillText(gameOverText, gameOverTextPixelLeft, gameOverTextPixelTop);
		ctx.font = "20px Courier";
        ctx.fillText(scoreText, canvas.width/2 - (scoreWidth/2), canvas.height/2 + 15);

		clearInterval(intervalID);
    }

	else if (isPaused) {
		ctx.fillStyle = GREEN_COLOR;
		ctx.font = "20px Courier";
		var isPausedText = "PAUSED";
        var isPausedMeasure = ctx.measureText(isPausedText);
        var isPausedWidth = isPausedMeasure.width;
		var isPausedTextPixelLeft = canvas.width/2 - (isPausedWidth/2);
		var isPausedTextPixelTop = canvas.height/2 - 15;
        ctx.fillText(isPausedText, isPausedTextPixelLeft, isPausedTextPixelTop);
	}

	else {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.font = "20px Courier";
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

        var draw = function(x) { x.draw(); };
        bullets.forEach(draw);
        hazards.forEach(draw);

        ship.draw();

        drawHealth();

        ctx.fillStyle = GREEN_COLOR;
        ctx.fillText(scoreText, canvas.width - scoreWidth - 5, 20);
		ctx.fillText("Level: " + gameState, canvas.width - 100, canvas.height - 10);
    }
}

function initState()
{
	var initScreen = new Image();
	initScreen.src = INIT_SCREEN_IMAGE;
	ctx.drawImage(initScreen, 0, 0, canvas.width, canvas.height);

	function onClick(event)
	{
		var x = event.pageX - canvas.offsetLeft;
		var y = event.pageY - canvas.offsetTop;

		if (x >= 212 && x <= 395 && y >= 162 && y <= 195) {
			canvas.removeEventListener('mousedown', onClick, false);
			newGame();
		}

		else if (x >= 212 && x <= 395 && y >= 217 && y <= 250) {
			var aboutPage = new Image();
			aboutPage.src = ABOUT_PAGE;
			ctx.drawImage(aboutPage, 0, 0, canvas.width, canvas.height);
		}

		if (x >= 220 && x <= 383 && y >= 345 && y <= 378) {
			initState();
		}
	}

	canvas.addEventListener('mousedown', onClick, false);
	ctx.drawImage(initScreen, 0, 0, canvas.width, canvas.height);
}


window.onload = initState;
