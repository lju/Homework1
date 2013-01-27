/* Ship object */

function Ship(x, y, radius, vx, vy, direction) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vx = vx;
    this.vy = vy;
    this.direction = direction; // direction in radians
    this.health = MAX_HEALTH;

    // used for getting hit
    this.lastHit = 0;
    this.lastDisplayed = true;

    this.img = new Image();
    this.img.src = SHIP_IMAGE;

    this.update = function() {
        /////////// position ////////////
        var ax, ay, scale, vec, vx, vy, v, normVx, normVy;

		if (keyPressed(LEFT)) {
            this.direction -= TURN_SPEED;
        }
        if (keyPressed(RIGHT)) {
            this.direction += TURN_SPEED;
        }
        // accleration
        scale = 0;
        if (keyPressed(UP)) {
            scale += ACCELERATION;
        }
        if (keyPressed(DOWN)) {
            scale -= ACCELERATION;
        }
        dir = unitVector(this.direction);
        ax = dir[0] * scale;
        ay = dir[1] * scale;
        // friction
        v = Math.sqrt(this.vx*this.vx + this.vy*this.vy);
        normVx = this.vx / v;
        normVy = this.vy / v;
        ax -= FRICTION * normVx;
        ay -= FRICTION * normVy;

        this.vx += ax;
        this.vy += ay;

        this.x = modulo(this.x + this.vx, canvas.width);
        this.y = modulo(this.y + this.vy, canvas.height);

        /////////// shoot bullets ////////////
        if (keyPressed(SPACE) && bullets.length < MAX_BULLETS
            && getTime() > lastBulletFired + BULLET_PERIOD) {
            lastBulletFired = getTime();
            dir = unitVector(this.direction);
            vx = dir[0] * BULLET_SPEED;
            vy = dir[1] * BULLET_SPEED;

            var newX = this.x + dir[0]*this.radius;
            var newY = this.y + dir[1]*this.radius;

            bullets.push(new Bullet(newX, newY,
                                    this.vx+vx, this.vy+vy, BULLET_RADIUS));
        }
    };

    this.draw = function() {
        if (DEBUG) {
            ctx.fillStyle = "pink";
            drawCircle(this.x, this.y, this.radius);
        }
        // just hit recently
        if (getTime() - this.lastHit < PERIOD) {
            // by flipping this.lastDisplayed, the ship alternates between
            // displaying and not displaying
            this.lastDisplayed = !this.lastDisplayed;
            if (!this.lastDisplayed) {
                return;
            }
        }
        drawRotated(this.img, this.x, this.y, SHIP_RADIUS*2, SHIP_RADIUS*2,
                    this.direction);
    };

    // what to call to inflict damage on the ship.
    this.takeDamage = function(damage) {
        this.lastHit = getTime();
        this.health -= damage;
        if (this.health <= 0) {
            gameOver = true;
        }
    }
}
