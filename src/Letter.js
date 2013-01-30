/* A Letter is a projectile made by a Kosbie. */

function Letter(x, y, vx, vy, letter) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = LETTER_RADIUS;
    this.letter = letter;

    this.img = new Image();
    this.img.src = "img/" + this.letter + ".png";

    this.shouldPersist = true;

    this.update = function() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x <= -OFFMAP_SIZE || this.x >= canvas.width + OFFMAP_SIZE ||
            this.y <= -OFFMAP_SIZE || this.y >= canvas.height + OFFMAP_SIZE) {
            this.shouldPersist = false;
        }
        if (collides(this, ship)) {
            ship.takeDamage(this.radius * LETTER_DAMAGE);
        }
    };

    // do nothing function: you can't destroy letters!
    this.hit = function() {
        this.shouldPersist = false;
    };

    this.draw = function() {

        if (DEBUG) {
            ctx.fillStyle = "pink";
            drawCircle(this.x, this.y, this.radius);
        }

        var x = Math.floor(this.x);
        var y = Math.floor(this.y);
        var r = Math.floor(this.radius);

        ctx.drawImage(this.img, x-r, y-r, 2*r, 2*r);


    };

}
