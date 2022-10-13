

let flocks = []
let alignSlider, cohisionSlider, separationSlider, perceptionSlider, maxSpeedSlider;
function setup() {
    createCanvas(document.body.offsetWidth, document.documentElement.clientHeight - 100);
    quadTree = new QuadTree(new Bound(0, 0, width, height));
    for (var i = 0; i < 10; i++) {
        p = new Point(random(width), random(height));
        quadTree.insert(p);
    }
    noCursor();

    maxSpeedSlider = createSlider(0, 20, 5, 0.2);
    perceptionSlider = createSlider(0, 150, 50, 1);
    alignSlider = createSlider(0, 5, 1, 0.1);
    cohisionSlider = createSlider(0, 5, 1, 0.1);
    separationSlider = createSlider(0, 5, 1, 0.1);
    for (var i = 0; i < 400; i++) {
        flocks.push(new Boid());
    }
} 

function draw() {
    background(51);

    //if (mouseIsPressed == true) {
    //    if (mouseButton == LEFT) {
    //        p = new Point(mouseX, mouseY);
    //        quadTree.insert(p);
    //    }
    //}
    quadTree.destroy();

    for (let boid of flocks) {
        boid.flock(flocks);
        boid.update();
        boid.show();
        quadTree.insert(new Point(boid.position.x, boid.position.y));
    }
    quadTree.draw();

    ellipse(mouseX, mouseY, 8, 8);
}

function windowResized() {
    resizeCanvas(document.body.offsetWidth, document.documentElement.clientHeight - 100);
}
 