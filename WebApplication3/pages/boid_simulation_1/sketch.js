let flocks = []
let alignSlider, cohisionSlider, separationSlider, perceptionSlider, maxSpeedSlider;
function setup() {
    var body = document.body, html = document.documentElement;
     
    createCanvas(document.body.offsetWidth, document.documentElement.clientHeight - 100);
    maxSpeedSlider = createSlider(0, 20, 5, 0.2);
    perceptionSlider = createSlider(0, 150, 50, 1);
    alignSlider = createSlider(0, 5, 1, 0.1);
    cohisionSlider = createSlider(0, 5, 1, 0.1);
    separationSlider = createSlider(0, 5, 1, 0.1);
    for (var i = 0; i < 400; i++) {
        flocks.push(new Boid());
    }
    noCursor();
}

function draw() {
    background(51);
    for (let boid of flocks) {
        boid.flock(flocks);
        boid.update();
        boid.show();
    }
    ellipse(mouseX, mouseY, 10, 10);
}

function windowResized() {
    resizeCanvas(document.body.offsetWidth, document.documentElement.clientHeight - 100 );
}