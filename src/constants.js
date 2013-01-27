/* This file has all the constants, i.e., "magic numbers." If you want to
 * change how fast the ship goes or really tweak any part of the game, here's
 * the place to do it. */


var DEBUG = false;

var SHIP_IMAGE = "img/ship.png";
var ASTEROID_IMAGE = "img/asteroid.png";
var ASTEROID_IMAGE2 = "img/asteroid2.png";
var BACKGROUND_IMAGE = "img/spaceBackground.png";

var PERIOD = 50; // how many ms to wait between calls to mainLoop.

var MAX_HEALTH = 100;
var SHIP_RADIUS = 15;
var ACCELERATION = 0.5;
var TURN_SPEED = 0.2; // radians/tick when holding left or right

var BULLET_SPEED = 8.0;
var BULLET_RADIUS = 5.0;
var BULLET_LIFESPAN = 1000; // how long a bullet lasts before disappearing
var BULLET_PERIOD = 300; // how long the user must wait between bullet shots
var FRICTION = 0.15;
var MAX_BULLETS = 100;

var ASTEROID_PERIOD = 2000; // how long to wait between asteroid creations
var ASTEROID_SPEED = 5.0;
var ASTEROID_RADIUS = 60.0;
var ASTEROID_ROTATIONAL_VELOCITY = 0.3; // max spinning speed in radians/tick
var ASTEROID_DAMAGE = 0.03;

var ASTEROID_MIN_RADIUS = 10.0; // smallest radius that still allows splitting
var ASTEROID_SPLIT_SCALEDOWN = 0.5; // child asteroids are this * parent size
var ASTEROID_SPLIT_CHILDREN = 2; // how many asteroids are spawned when split
var ASTEROID_SPLIT_SPEED = 3.0; // how fast child asteroids move, at max

var GREEN_COLOR = "#7FFF00";

var SPACE = 32;
var LEFT = 37;
var UP = 38;
var RIGHT = 39;
var DOWN = 40;
