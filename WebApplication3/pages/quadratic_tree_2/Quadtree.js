class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class Bound {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    containsPoint(point) {
        return ((point.x - this.x) * (point.x - this.x - this.w) < 0
            && (point.y - this.y) * (point.y - this.y - this.h) < 0)
    }
    intersects(rangeP) {
        return !(this.x >= rangeP.x + rangeP.w ||
            this.x + this.w <= rangeP.x ||
            this.y >= rangeP.y + rangeP.h ||
            this.y + this.h <= rangeP.y);
    }
}
class QuadTree {
    constructor(bound) {
        this.points = [];
        this.bound = bound;
        this.bounded = false;
    }
    boundify() {
        this.Quad_TL = new QuadTree(new Bound(this.bound.x, this.bound.y, this.bound.w / 2, this.bound.h / 2));
        this.Quad_TR = new QuadTree(new Bound(this.bound.x + this.bound.w / 2, this.bound.y, this.bound.w / 2, this.bound.h / 2));
        this.Quad_BR = new QuadTree(new Bound(this.bound.x + this.bound.w / 2, this.bound.y + this.bound.h / 2, this.bound.w / 2, this.bound.h / 2));
        this.Quad_BL = new QuadTree(new Bound(this.bound.x, this.bound.y + this.bound.h / 2, this.bound.w / 2, this.bound.h / 2));
        this.bounded = true;
    }
    insert(point) {
        if (!this.bound.containsPoint(point)) {
            return;
        }
        if (this.points.length < 4
            /*|| this.bound.h<10*/) {
            this.points.push(point);
        }
        else {
            if (!this.bounded) {
                this.boundify();
            }
            this.Quad_TL.insert(point);
            this.Quad_TR.insert(point);
            this.Quad_BR.insert(point);
            this.Quad_BL.insert(point);

        }
    }

    getPointsInRange(boundry, pointsInRange) {
        //count++;
        if (!this.bound.intersects(boundry)) {
            return;
        }
        else {
            for (var p of this.points) {
                //count++;
                if (boundry.containsPoint(p)) {
                    pointsInRange.push(p);
                }
            }
            if (this.bounded) {
                this.Quad_TL.getPointsInRange(boundry, pointsInRange);
                this.Quad_TR.getPointsInRange(boundry, pointsInRange);
                this.Quad_BL.getPointsInRange(boundry, pointsInRange);
                this.Quad_BR.getPointsInRange(boundry, pointsInRange);
            }
        }
    }
    draw() {
        for (var poi of this.points) {
            strokeWeight(3);
            stroke(230);
            point(poi.x, poi.y);
        }
        if (this.bounded) {
            strokeWeight(1);
            stroke(255);
            line(this.bound.x + this.bound.w / 2,
                this.bound.y,
                this.bound.x + this.bound.w / 2,
                this.bound.y + this.bound.h
            );
            line(this.bound.x,
                this.bound.y + this.bound.h / 2,
                this.bound.x + this.bound.w,
                this.bound.y + this.bound.h / 2
            );
            this.Quad_TL.draw();
            this.Quad_TR.draw();
            this.Quad_BR.draw();
            this.Quad_BL.draw();
        }
    }
}