/* All the initialization and main loop stuff goes here. */


var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var ship; // = new Ship(100, 100, SHIP_RADIUS, 1, 1, 0);
var bullets; //  = [];
// hazard = asteroids, aliens, etc.
<<<<<<< HEAD
var hazards; //  = [];
var lastAsteroidSpawn; //  = 0;
var lastAlienSpawn; //  = 0;
var lastBulletFired; //  = 0;
var score; //  = 0;
var gameOver; //  = false;
var isPaused; //  = false;
var backgroundImage  = new Image();
var intervalID;
=======
// var hazards = [new Kosbie(300, 50)];
var hazards = [];
var lastAsteroidSpawn = 0;
var lastAlienSpawn = 0;
var lastBulletFired = 0;
var score = 0;
var gameOver = false;
var backgroundImage = new Image();
>>>>>>> 5b468ffddf9e6e8e55e20185e36b833c16941cfd
backgroundImage.src = BACKGROUND_IMAGE;

function newGame()
{
	console.log("newGame being called");
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
//var backgroundImage = new Image();
//backgroundImage.src = BACKGROUND_IMAGE;
}

/* The function that starts it all. Do some basic startup garbage, call
 * mainLoop, and you're done. */
function init() {
	clearInterval(intervalID);
	console.log("init being called");
	newGame();
    canvas.addEventListener('keydown', onKeyDown, false);
    canvas.addEventListener('keyup', onKeyUp, false);
    canvas.setAttribute('tabindex','0');
    canvas.focus();
	gameState = 1;
	score = 0;
	ship.health = MAX_HEALTH;
	SET_CONSTANTS(gameState);
	checkForKeysTimer();
    intervalID = setInterval(mainLoop, PERIOD);
}

/* This function is called to update everything: move the ship, kill things,
 * draw everything. */
function mainLoop() {
    var i, newBullets, now, vec, newAsteroid;
    
	//if (keyPressed(P_KEY)) // checks every 40 ms, where else can we put it?
	//{
	//	pause();
	//}
	//
	//if (keyPressed(R_KEY))
	//{
	//	init();
	//}
	
	if (!isPaused){
	if (score < 50) { gameState = 1; }
	else if (score >= 50 && score < 100) { gameState = 2; }
	else if (score >= 100 && score < 150) { gameState = 3; }
	else if (score >= 150 && score < 200) { gameState = 4; }
	else { gameState = 5; }
	
	SET_CONSTANTS(gameState);
	
	ship.update();
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
<<<<<<< HEAD
        //clearInterval(intervalID);
=======

        drawHealth();

        // stop loop from running
        clearInterval(intervalID);
        ctx.fillStyle = GREEN_COLOR;
>>>>>>> 5b468ffddf9e6e8e55e20185e36b833c16941cfd
		ctx.font = "40px Courier";
		
		// measure game over text
        var gameOverText = "GAME OVER";
        var measure = ctx.measureText(gameOverText);
        var gameOverWidth = measure.width;
		var gameOverTextPixelLeft = canvas.width/2 - (gameOverWidth/2);
		var gameOverTextPixelTop = canvas.height/2 - 30;
		
		// draw game over state
        ctx.fillStyle = "black";
		//ctx.fillRect(gameOverTextPixelLeft - 10, gameOverTextPixelTop - 10, 100, 100);
        ctx.fillStyle = GREEN_COLOR;
        ctx.fillText(gameOverText, gameOverTextPixelLeft, gameOverTextPixelTop);
		ctx.font = "20px Courier";
        ctx.fillText(scoreText, canvas.width/2 - (scoreWidth/2), canvas.height/2 + 15);
        console.log("Game over");
		
		//if (keyPressed(R_KEY)) // because clear interval this function stops getting called
		//{
		//	init();
		//}
		
		clearInterval(intervalID);
    }
	
	else if (isPaused)
	{
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

        //ctx.clearRect(0, 0, canvas.width, canvas.height);
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

init();
