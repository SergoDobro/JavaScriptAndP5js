
function setup() {
    createCanvas(document.body.offsetWidth, document.documentElement.clientHeight - 100);
    quadTree = new QuadTree(new Bound(0, 0, width, height));
    for (var i = 0; i < 10000; i++) {
        p = new Point(randomGaussian(width / 2, width / 8),
            randomGaussian(height / 2, height / 8));
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
    fill(0,0,0,0);
    var pointsInRec = [];
    rangeMouse = new Bound(mouseX, mouseY, 25, 25);
    rangeMouse.x -= rangeMouse.w / 2;
    rangeMouse.y -= rangeMouse.h / 2;
    count = 0;
    quadTree.getPointsInRange(rangeMouse, pointsInRec);
    //print(count);
    stroke(0, 255, 0);
    rect(rangeMouse.x, rangeMouse.y, rangeMouse.w, rangeMouse.h);
    for (var p of pointsInRec) {

        strokeWeight(5);
        point(p.x, p.y);
    }


    //rect(100, 100, 100, 100);
    //bnd = new Bound(100, 100, 100, 100);
    //if (bnd.intersects(rangeMouse)) {
    //    stroke(255, 255, 0);
    //    rect(100, 100, 100, 100);
    //}


    //ellipse(mouseX, mouseY, 8, 8);
}

function windowResized() {
    resizeCanvas(document.body.offsetWidth, document.documentElement.clientHeight - 100);
}