/* Asteroid object. */

function Asteroid(x, y, vx, vy, radius) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = radius;
    // direction the asteroid faces. Only for aesthetics.
    this.direction = Math.random()*Math.PI*2;
    this.rotationalVelocity = (Math.random()*2-1)*ASTEROID_ROTATIONAL_VELOCITY;
    // asteroid will update this value itself, then be cleared by the mainLoop
    this.shouldPersist = true;

	this.img = new Image();

	var rando = Math.floor((Math.random()*3) + 1);
	if (rando === 1) { this.img.src = ASTEROID_IMAGE1; }
	else if (rando === 2) {this.img.src = ASTEROID_IMAGE2; }
	else {this.img.src = ASTEROID_IMAGE3; }

    this.update = function() {
        this.x = modulo(this.x + this.vx, canvas.width + OFFMAP_SIZE);
        this.y = modulo(this.y + this.vy, canvas.height + OFFMAP_SIZE);
        this.direction += this.rotationalVelocity;
        // do damage to ship
        if (collides(this, ship)) {
            ship.takeDamage(this.radius * ASTEROID_DAMAGE);
        }
    };

    this.hit = function() {
        this.shouldPersist = false;

        // spawn 4 smaller asteroids, unless it's too small to just die
        if (this.radius*ASTEROID_SPLIT_SCALEDOWN >= ASTEROID_MIN_RADIUS) {
            // start with a base angle and rotate around to all directions,
            // spawning a new asteroid in that direction
            var theta = Math.random()*Math.PI*2;
            var speed = (Math.random()*2-1) * ASTEROID_SPLIT_SPEED;
            var i = 0;
            for (i = 0; i < ASTEROID_SPLIT_CHILDREN; i++) {
                var dir = unitVector(theta);
                var vx = dir[0]*speed;
                var vy = dir[1]*speed;
                var child = new Asteroid(this.x, this.y, this.vx+vx, this.vy+vy,
                                         this.radius*ASTEROID_SPLIT_SCALEDOWN);
                hazards.push(child);
                theta += Math.PI*2/ASTEROID_SPLIT_CHILDREN;
            }
        }

    };

    this.draw = function() {
        if (DEBUG) {
            ctx.fillStyle = "pink";
            drawCircle(this.x, this.y, this.radius);
        }
        drawRotated(this.img, this.x, this.y, this.radius*2, this.radius*2,
                    this.direction);
    };
}
