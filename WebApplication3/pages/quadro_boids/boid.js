class Boid {
    constructor() {
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2, 4));
        this.acceleration = createVector();
        this.maxForce = 0.2;
        this.perception = 100;
        this.maxSpeed = 10;
        this.total = 0;
    }

    bounds() {
        if (this.position.x > width + this.maxSpeed * 5)
            this.position.x = -this.maxSpeed * 5;
        if (this.position.y > height + this.maxSpeed * 5)
            this.position.y = -this.maxSpeed * 5;
        if (this.position.x < -this.maxSpeed * 5)
            this.position.x = width + this.maxSpeed * 5;
        if (this.position.y < -this.maxSpeed * 5)
            this.position.y = height + this.maxSpeed * 5;
    }

    align(flocks) {
        let steerToAlign = createVector();
        let avCenter = createVector();
        let steerToEscape = createVector();
        this.total = 0;
        for (var boid of flocks) {
            let d = pow(boid.position.x - this.position.x, 2) + pow(boid.position.y - this.position.y, 2);//dist(boid.position.x, boid.position.y, this.position.x, this.position.y);
            if (d < this.perception * this.perception && this!=boid) {
                this.total++;
                steerToAlign.add(boid.velocity);
                avCenter.add(boid.position);
                let diff = p5.Vector.sub(boid.position, this.position);
                diff.mult(-1 / sqrt(d));
                steerToEscape.add(diff);
            }
        }
        let mlt = 2;
        let mltPower = 0.5;
        if (this.position.y > height - this.perception) {
            this.total++;
            let vec = createVector(0, -this.maxSpeed);
            steerToAlign.add(vec);

            avCenter.add(p5.Vector.sub(this.position, vec * mltPower));
            let d = (height - this.position.y) * mltPower;

            steerToEscape.add(createVector(0, -1 / d));
        }
        if (this.position.y < this.perception) {
            this.total++;
            let vec = createVector(0, this.maxSpeed);
            steerToAlign.add(vec);

            avCenter.add(p5.Vector.add(this.position, vec * mltPower));
            let d = this.position.y * mltPower;

            steerToEscape.add(createVector(0, 1 / d));
        }

        let dToMouse = pow(this.position.x - mouseX, 2) + pow(this.position.y - mouseY, 2);
        if (dToMouse < this.perception * this.perception * mlt) {
            this.total++;
            steerToAlign.add(this.velocity);
            let mPos = createVector(mouseX, mouseY);
            avCenter.add(this.position);
            let diff = p5.Vector.sub(mPos, this.position);
            diff.mult(-1 / (1));
            steerToEscape.add(diff);
        }

        if (this.total > 0) {
            steerToAlign.div(this.total);
            steerToAlign.setMag(this.maxSpeed);
            steerToAlign.sub(this.velocity);
            steerToAlign.limit(this.maxForce);
            steerToAlign.mult(alignSlider.value());

            avCenter.div(this.total);
            avCenter.sub(this.position);
            avCenter.setMag(this.maxSpeed);
            avCenter.sub(this.velocity);
            avCenter.limit(this.maxForce);
            avCenter.mult(cohisionSlider.value());


            steerToEscape.div(this.total);
            steerToEscape.setMag(this.maxSpeed);
            steerToEscape.sub(this.velocity);
            steerToEscape.limit(this.maxForce);
            steerToEscape.mult(separationSlider.value());

            steerToAlign.add(avCenter);
            steerToAlign.add(steerToEscape);
        }
        return steerToAlign;
    }

    flock(flocks) {

        let alignForce = this.align(flocks);
        this.acceleration.add(alignForce);

    }

    update() {
        this.perception = perceptionSlider.value();
        this.maxSpeed = maxSpeedSlider.value();

        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.bounds();
        this.acceleration.mult(0);
    }
    show() {
        strokeWeight(2);
        stroke(100+this.total * 20);
        noFill();

        let sizeLength = 4, sizewide = 2;
        beginShape(TRIANGLES);


        fill(100, 100, 100, 100);

        vertex(this.position.x,
            this.position.y);
        vertex(this.position.x - this.velocity.x * sizeLength,
            this.position.y - this.velocity.y * sizeLength);
        vertex(this.position.x - this.velocity.x * sizeLength,
            this.position.y - this.velocity.y * sizeLength + 3 * this.velocity.mag() / 2);

        fill(180, 180, 180, 180);
        vertex(this.position.x,
            this.position.y);
        vertex(this.position.x - this.velocity.x * sizeLength + this.velocity.y * sizewide,
            this.position.y - this.velocity.y * sizeLength + this.velocity.x * sizewide/2);
        vertex(this.position.x - this.velocity.x * sizeLength - this.velocity.y * sizewide,
            this.position.y - this.velocity.y * sizeLength - this.velocity.x * sizewide/2);

        //vertex(this.position.x - this.velocity.x * sizeLength - this.velocity.y * sizewide,
        //    this.position.y - this.velocity.y * sizeLength + this.velocity.x * sizewide);
        //vertex(this.position.x - this.velocity.x * sizeLength + this.velocity.y * sizewide,
        //    this.position.y - this.velocity.y * sizeLength - this.velocity.x * sizewide);
        endShape(CLOSE);

        ////line(this.position.x, this.position.y, this.position.x - this.velocity.x * 10, this.position.y - this.velocity.y * 10)
        //triangle(this.position.x, this.position.y,
        //    this.position.x - this.velocity.x * 5 + this.velocity.y * 2,
        //    this.position.y - this.velocity.y * 5 + this.velocity.x * 2,
        //    this.position.x - this.velocity.x * 5 - this.velocity.y * 2,
        //    this.position.y - this.velocity.y * 5 - this.velocity.x * 2);
        //point(this.position.x, this.position.y);
        //strokeWeight(1);
        //stroke(120);
        //point(this.position.x - this.velocity.x * 10, this.position.y - this.velocity.y * 10);
    }
}