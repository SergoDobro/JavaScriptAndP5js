
function setup() {
    createCanvas(document.body.offsetWidth, document.documentElement.clientHeight - 100);

    noCursor();
}

function draw() {
    background(51);

    ellipse(mouseX, mouseY, 10, 10);
}

function windowResized() {
    resizeCanvas(document.body.offsetWidth, document.documentElement.clientHeight - 100 );
}