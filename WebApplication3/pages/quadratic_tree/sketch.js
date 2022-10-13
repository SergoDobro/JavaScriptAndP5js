
function setup() {
    createCanvas(document.body.offsetWidth, document.documentElement.clientHeight - 100);
    quadTree = new QuadTree(new Bound(0, 0, width, height));
    for (var i = 0; i < 10; i++) {
        p = new Point(random(width), random(height));
        quadTree.insert(p);
    }
    noCursor();
} 

function draw() {
    background(51);

    if (mouseIsPressed == true) {
        if (mouseButton == LEFT) {
            p = new Point(mouseX, mouseY);
            quadTree.insert(p);
        }
    }
    quadTree.draw();

    ellipse(mouseX, mouseY, 8, 8);
}

function windowResized() {
    resizeCanvas(document.body.offsetWidth, document.documentElement.clientHeight - 100);
}