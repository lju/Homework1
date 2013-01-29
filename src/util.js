/* Random useful functions goes here. Basically, a function that you might use
 * in more than one other file. */


/* returns a new theta that is the same angle, but
 * 0 <= modulo(theta, x) < x
 *
 * modulo(120, 100) === 20
 * modulo(-120, 100) === 80
 * modulo(4.0, 1.3) === 0.1
 *
 * This is basically the same as the Python % operator.
 */
function modulo(theta, x) {
    if (theta >= 0) {
        return theta % x;
    } else {
        // negative mod doesn't do what we want, so we need to make it positive
        // by adding a multiple of of 2*x.
        var multiple = Math.abs(Math.floor(theta / x));
        return (theta + (multiple*x)) % x;
    }
};

/* Given a theta in radians, returns an [x, y] unit vector.
 *
 * unitVector(0.0) === [1.0, 0.0]
 * unitVector(Math.PI/2) === [0.0, 1.0]
 * unitVector(Math.PI/4) === [0.707, 0.707] // 1/sqrt(2)
 *
 */
function unitVector(theta) {
    theta = modulo(theta, Math.PI*2);
    // quadrant 0, 1, 2, or 3, in counter-clockwise order
    var quadrant = Math.floor(theta / (Math.PI/2));
    var x, y;
    //////////////// scary trig section //////////////////
    switch (quadrant) {
    case 0:
        x = Math.cos(theta);
        y = Math.sin(theta);
        break;
    case 1:
        theta = Math.PI - theta;
        x = -Math.cos(theta);
        y = Math.sin(theta);
        break;
    case 2:
        theta = theta - Math.PI;
        x = -Math.cos(theta);
        y = -Math.sin(theta);
        break;
    case 3:
        theta = Math.PI*2 - theta;
        x = Math.cos(theta);
        y = -Math.sin(theta);
        break;
    }
    return [x, y];
};


/* shamelessly copied from the course notes */
function drawCircle(cx, cy, radius) {
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, 2*Math.PI, false);
    ctx.fill();
}

/* returns the unix time */
function getTime() {
    var d = new Date();
    return d.getTime();
}

/* What is the distance between (x1,y1) and (x2, y2) */
function distance(x1, y1, x2, y2) {
    return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
};

/* Are two circle-like object colliding? */
function collides(circle1, circle2) {
    return distance(circle1.x, circle1.y, circle2.x, circle2.y) <
        circle1.radius + circle2.radius;
}

/* draw img at x, y with width, height. Rotated about centerpoint of image by
 * theta radians. */
function drawRotated(img, cx, cy, width, height, theta) {
    ctx.save();
    ctx.translate(Math.floor(cx), Math.floor(cy));
    ctx.rotate(theta);
    // now move image so that center of image is at center of rotation
    ctx.drawImage(img, Math.floor(-width/2), Math.floor(-height/2),
                  Math.floor(width), Math.floor(height));
    ctx.restore();
}

/* Returns a random location along the border of the canvas. That is, either 0
 * or canvas.width */
function randomEdgeX() {
    return Math.random() >= 0.5 ? 0 : canvas.width + OFFMAP_SIZE;
}

/* Returns a random location along the border of the canvas. That is, either 0
 * or canvas.height */
function randomEdgeY() {
    return Math.random() >= 0.5 ? 0 : canvas.height + OFFMAP_SIZE;
}

/* modIntoBounds(3, 0, 10) === 3
 * modIntoBounds(13, 0, 10) === 3
 * modIntoBounds(13, -10, 10) === -7
 * modIntoBounds(13, -10, 0) === -7
 */

function modIntoBounds(x, leftBound, rightBound) {
    var range = rightBound - leftBound;
    return modulo(x - leftBound, range) + leftBound;
}

function min(x, y) {
    return x <= y ? x : y;
}

function max(x, y) {
    return x >= y ? x : y;
}

/* draw the health. This isn't in Ship.draw because if you had multiple ships,
 * they would all overlap. */
function drawHealth() {
    ctx.font = "20px Courier";
    ctx.fillStyle= GREEN_COLOR;
    var healthText = "Health: ";
    var healthMeasure = ctx.measureText(healthText);
    var healthWidth = healthMeasure.width;
    ctx.fillText(healthText, 5, 23);
    // draw the grey background of the health bar
    ctx.fillStyle = "grey";
    ctx.fillRect(healthWidth+5, 12, 200, 10);

    // draw the ship health
    if (Math.floor(ship.health) >= 25) {
        ctx.fillStyle = GREEN_COLOR;
    } else {
        ctx.fillStyle = "red"; // I will make this more specific / prettier
    }
    ctx.fillStyle = SHIP_HEALTH_COLOR;
    var percentageFull = ship.health / MAX_HEALTH;
    percentageFull = max(0.0, percentageFull);
    ctx.fillRect(healthWidth+5, 12,
                 Math.floor(percentageFull*200), 10);

    // now draw all the shield on top of that (last shield to first shield)
    for (var i = ship.shields.length-1; i >= 0; i--) {
        percentageFull = ship.shields[i].health / ship.shields[i].maxHealth;
        percentageFull = max(0.0, percentageFull);
        ctx.fillStyle = ship.shields[i].color;
        ctx.fillRect(healthWidth+5, 12, Math.floor(percentageFull*200), 10);
    }
}
