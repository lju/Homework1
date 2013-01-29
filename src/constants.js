/* This file has all the constants, i.e., "magic numbers." If you want to
 * change how fast the ship goes or really tweak any part of the game, here's
 * the place to do it. */

var gameState = 1;
var DEBUG = false;

var SHIP_IMAGE = "img/ship.png";
var SHIP_MOVING = "img/shipMoving.png";
var ASTEROID_IMAGE1 = "img/asteroid1.png";
var ASTEROID_IMAGE2 = "img/asteroid2.png";
var ASTEROID_IMAGE3 = "img/asteroid3.png";
var ALIEN_IMAGE = "img/alien.png";
var BACKGROUND_IMAGE = "img/spaceBackground.png";
var KOSBIE_IMAGE_OPEN = "img/kosbie-open.png";
var KOSBIE_IMAGE_CLOSED = "img/kosbie-closed.png";

var PERIOD = 40; // how many ms to wait between calls to mainLoop.
var OFFMAP_SIZE = 50;
 // how many off right and down you don't display (outside of canvas).

var MAX_HEALTH = 100;
var SHIP_RADIUS = 15;
var ACCELERATION = 0.90;
var TURN_SPEED = 0.2; // radians/tick when holding left or righ
var SHIP_SHIELDS = [[25, "blue"], [25, "yellow"]];
// var SHIP_SHIELDS = [[100000, "green"], [25, "blue"], [25, "yellow"]];
var SHIP_HEALTH_COLOR = "red";

var BULLET_SPEED = 10.0;
var BULLET_RADIUS = 3.0;
var BULLET_LIFESPAN = 3000; // how long a bullet lasts before disappearing
var BULLET_PERIOD = 200; // how long the user must wait between bullet shots
var FRICTION = 0.15;
var MAX_BULLETS = 100;

var ASTEROID_PERIOD; // = 2000; // how long to wait between asteroid creations
var ASTEROID_SPEED; // = 8.0;
var ASTEROID_RADIUS; // = 60.0;
var ASTEROID_ROTATIONAL_VELOCITY; // = 0.2; // max spinning speed in radians/tick
var ASTEROID_DAMAGE; // = 0.03;

var ASTEROID_MIN_RADIUS; // = 10.0; // smallest radius that still allows splitting
var ASTEROID_SPLIT_SCALEDOWN; // = 0.5; // child asteroids are this * parent size
var ASTEROID_SPLIT_CHILDREN; // = 2; // how many asteroids are spawned when split
var ASTEROID_SPLIT_SPEED; // = 3.0; // how fast child asteroids move, at max

var ALIEN_SPEED; // = 3.0; // pixels/tick the alien moves
var ALIEN_RADIUS; // = 30.0;
var ALIEN_DAMAGE; // = 0.05;
var ALIEN_PERIOD; // = 10000;

// var ASTEROID_PERIOD = 2000; // how long to wait between asteroid creations
// var ASTEROID_SPEED = 8.0;
// var ASTEROID_RADIUS = 60.0;
// var ASTEROID_ROTATIONAL_VELOCITY = 0.2; // max spinning speed in radians/tick
// var ASTEROID_DAMAGE = 0.03;

// var ASTEROID_MIN_RADIUS = 10.0; // smallest radius that still allows splitting
// var ASTEROID_SPLIT_SCALEDOWN = 0.5; // child asteroids are this * parent size
// var ASTEROID_SPLIT_CHILDREN = 2; // how many asteroids are spawned when split
// var ASTEROID_SPLIT_SPEED = 3.0; // how fast child asteroids move, at max

// var ALIEN_SPEED = 3.0; // pixels/tick the alien moves
// var ALIEN_RADIUS = 30.0;
// var ALIEN_DAMAGE = 0.05;
// var ALIEN_PERIOD = 10000;

// var ASTEROID_PERIOD = 2000; // how long to wait between asteroid creations
// // var ASTEROID_PERIOD = 100000;
// var ASTEROID_SPEED = 8.0;
// var ASTEROID_RADIUS = 60.0;
// var ASTEROID_ROTATIONAL_VELOCITY = 0.2; // max spinning speed in radians/tick
// var ASTEROID_DAMAGE = 0.03;

// var ASTEROID_MIN_RADIUS = 10.0; // smallest radius that still allows splitting
// var ASTEROID_SPLIT_SCALEDOWN = 0.5; // child asteroids are this * parent size
// var ASTEROID_SPLIT_CHILDREN = 2; // how many asteroids are spawned when split
// var ASTEROID_SPLIT_SPEED = 3.0; // how fast child asteroids move, at max

// var ALIEN_SPEED = 3.0; // pixels/tick the alien moves
// var ALIEN_RADIUS = 30.0;
// var ALIEN_DAMAGE = 0.05;
// var ALIEN_PERIOD = 10000;
// var ALIEN_PERIOD = 10000000;
var ALIEN_MAX_HEALTH; // = 3; // number of bullets to kill an alien

var KOSBIE_MAX_HEALTH = 10;
var KOSBIE_PERIOD = 2000; // how often kosbie can attack
var KOSBIE_MOUTH_OPEN_TIME = 500; // kosbie leaves his mouth open (only visual)
var KOSBIE_ANGLE = 3.0; // radians of kosbie spread
var KOSBIE_PHRASE = "carpediem"; // what else?
var KOSBIE_RADIUS = 30.0;

var LETTER_SPEED = 2.0;
var LETTER_FONT = "12px Courier";
var LETTER_COLOR = "purple";
var LETTER_RADIUS = 10.0; // you'll have to do some experiment to make
                          // this match up with the font
var LETTER_DAMAGE = 0.1;

var GREEN_COLOR = "#7FFF00";

function SET_CONSTANTS(currentGameState)
{
	switch (currentGameState) {
		//case 0:
			//drawInitialGameState();
			//break;
		case 1:
			ASTEROID_PERIOD = 2000; // how long to wait between asteroid creations
			ASTEROID_SPEED = 3.0;
			ASTEROID_RADIUS = 60.0;
			ASTEROID_ROTATIONAL_VELOCITY = 0.2; // max spinning speed in radians/tick
			ASTEROID_DAMAGE = 0.03;

			ASTEROID_MIN_RADIUS = 40.0; // smallest radius that still allows splitting
			ASTEROID_SPLIT_SCALEDOWN = 0.5; // child asteroids are this * parent size
			ASTEROID_SPLIT_CHILDREN = 2; // how many asteroids are spawned when split
			ASTEROID_SPLIT_SPEED = 3.0; // how fast child asteroids move, at max

			ALIEN_SPEED = 0.5; // pixels/tick the alien moves
			ALIEN_RADIUS = 30.0;
			ALIEN_DAMAGE = 0.05;
			ALIEN_PERIOD = 100000000;
			ALIEN_MAX_HEALTH = 3; 
			break;
		case 2:
			ASTEROID_PERIOD = 2000;
			ASTEROID_SPEED = 6.0;
			ASTEROID_MIN_RADIUS = 20.0;
			ASTEROID_SPLIT_SPEED = 4.0;
			ALIEN_PERIOD = 100000000; // aliens off?
			ALIEN_SPEED = 0.0;
			break;
		case 3:
			ASTEROID_PERIOD = 1500;
			ASTEROID_SPEED = 9.0;
			ASTEROID_MIN_RADIUS = 20.0;
			ASTEROID_SPLIT_SPEED = 6.0;
			ALIEN_PERIOD = 5000; // aliens off?
			ALIEN_SPEED = 2.0
			break;
		case 4:
			ASTEROID_PERIOD = 1000;
			ASTEROID_SPEED = 9.0;
			ASTEROID_MIN_RADIUS = 20.0;
			ASTEROID_SPLIT_SPEED = 4.0;
			ALIEN_PERIOD = 3000; // aliens off?
			ALIEN_SPEED = 4.0
			break;
		case 5:
			ASTEROID_PERIOD = 1000;
			ASTEROID_SPEED = 9.0;
			ASTEROID_MIN_RADIUS = 20.0;
			ASTEROID_SPLIT_SPEED = 6.0;
			ALIEN_PERIOD = 2000; // aliens off?
			ALIEN_SPEED = 8.0
			break;
	}
}

var SPACE = 32;
var LEFT = 37;
var UP = 38;
var RIGHT = 39;
var DOWN = 40;
var P_KEY = 80;
var R_KEY = 82;
