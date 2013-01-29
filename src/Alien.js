/* Alien object. An alien flies toward the player at constant velocity. */

function Alien(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.shouldPersist = true;
    this.health = ALIEN_MAX_HEALTH;

    this.img = new Image();
    this.img.src = ALIEN_IMAGE;

    this.update = function() {
        // get the angle pointing straight toward the ship, then go that
        // direction.
        var theta = Math.atan2(ship.y-this.y, ship.x-this.x);
        var vec = unitVector(theta);
        this.x += vec[0] * ALIEN_SPEED;
        this.y += vec[1] * ALIEN_SPEED;

        if (collides(this, ship)) {
            ship.takeDamage(this.radius * ALIEN_DAMAGE);
        }

    }

    this.hit = function() {
        this.health--;
        if (this.health <= 0) {
            this.shouldPersist = false;
        }
    }

    this.draw = function() {
        var x = Math.floor(this.x);
        var y = Math.floor(this.y);
        var r = Math.floor(this.radius);
        ctx.drawImage(this.img, x-r, y-r, 2*r, 2*r);
    }
}
