/* Kosbie: the final boss of 237. */

function Kosbie(x, y) {
    this.x = x;
    this.y = y;
    this.radius = KOSBIE_RADIUS;
    this.health = KOSBIE_MAX_HEALTH;

    this.shouldPersist = true;

    this.lastFired = getTime();

    this.imgOpen = new Image();
    this.imgOpen.src = KOSBIE_IMAGE_OPEN;
    this.imgClosed = new Image();
    this.imgClosed.src = KOSBIE_IMAGE_CLOSED;

    // Kosbie will every once in a while fire a bunch of letters spell "carpe
    // diem". For now, he's stationary.
    // TODO: make him move perpendicular to the player
    this.update = function() {
        // no movement to change
        // fire a letter if necessary
        if (getTime() - this.lastFired >= KOSBIE_PERIOD) {
            // angle from kosbie to player
            this.lastFired = getTime();
            var angleToPlayer = Math.atan2(ship.y - this.y, ship.x - this.x);
            // spawn each new letter in an arch facing the player
            for (var i = 0; i < KOSBIE_PHRASE.length; i++) {
                var angle = angleToPlayer + KOSBIE_ANGLE *
                    (KOSBIE_PHRASE.length/2 - i)/KOSBIE_PHRASE.length;
                var vec = unitVector(angle);
                var vx = vec[0] * LETTER_SPEED;
                var vy = vec[1] * LETTER_SPEED;
                var letter = KOSBIE_PHRASE[i];
                hazards.push(new Letter(this.x, this.y, vx, vy, letter));
            }
        }
    };

    this.hit = function() {
        this.health--;
        if (this.health <= 0) {
            this.shouldPersist = false;
        }
    };

    this.draw = function() {
        var left = Math.floor(this.x - this.radius);
        var top = Math.floor(this.y - this.radius);
        var width = Math.floor(2 * this.radius);
        var height = Math.floor(2 * this.radius);
        // should he have his mouth open?
        if (getTime() - this.lastFired <= KOSBIE_MOUTH_OPEN_TIME) {
            ctx.drawImage(this.imgOpen, left, top, width, height);
        } else {
            ctx.drawImage(this.imgClosed, left, top, width, height);
        }
    };


}
