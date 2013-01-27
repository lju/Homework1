/* Key and mouse detection goes here. */


var keys = [];

/* This is the only function you'll use to check if a key is currently
 * pressed. */
function keyPressed(keyCode) {
    return keys[keyCode] === true;
}

function onKeyDown(event) {
    keys[event.keyCode] = true;
}

function onKeyUp(event) {
    delete keys[event.keyCode];
}
