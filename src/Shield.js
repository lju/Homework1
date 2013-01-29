/* A shield, to be used with ship to protect it from damage. It must be passed
 * in getters for x, y and r, since those will rely on its parent.
 */

function Shield(health, color, getX, getY, getR) {
    this.health = health;
    this.maxHealth = health;
    this.color = color;
    this.getX = getX;
    this.getY = getY;
    this.getR = getR;

    // used for getting hit
    this.lastHit = 0;
    this.lastDisplayed = true;

    this.takeDamage = function(damage) {
        this.health -= damage;
        this.lastHit = getTime();
    };

    this.draw = function() {
        // if hit recently, don't draw half the time
        if (getTime() - this.lastHit < PERIOD) {
            this.lastDisplayed = !this.lastDisplayed;
            if (!this.lastDisplayed) {
                return;
            }
        }
        ctx.fillStyle = color;
        drawCircle(this.getX(), this.getY(), this.getR());
    };

}
