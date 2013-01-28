/* Bullet object.
 */

function Bullet(x, y, vx, vy, radius) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = radius;
    this.spawnTime = getTime();
    // bullet will update this value itself, then be cleared out by the mainLoop
    this.shouldPersist = true;
    this.update = function() {
        this.x = this.x + this.vx;
        this.y = this.y + this.vy;
        // timeout
        if (getTime() - this.spawnTime > BULLET_LIFESPAN) {
            this.shouldPersist = false;
        }
        var self = this; // fucking javascript won't let me pass "this" <-- hahah
        hazards.forEach(function(hazard) {
            if (collides(self, hazard)) {
                // the smaller the bullet the more points
				score += (Math.floor((1/hazard.radius) * 100));
                self.shouldPersist = false;
                hazard.hit();
            }
        });
    };
    this.draw = function() {
        ctx.fillStyle = "red";
        drawCircle(this.x, this.y, this.radius);
    };
}
