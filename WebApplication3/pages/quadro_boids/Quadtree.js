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
}
class QuadTree {
    constructor(bound) {
        this.points = [];
        this.bound = bound;
        this.bounded = false;
    }
    destroy() {
        this.points = [];
        this.bounded = false;
        this.Quad_TL = null;
        this.Quad_TR = null;
        this.Quad_BR = null;
        this.Quad_BL = null;
    }
    boundify() {
        this.Quad_TL = new QuadTree(new Bound(this.bound.x, this.bound.y, this.bound.w / 2, this.bound.h / 2));
        this.Quad_TR = new QuadTree(new Bound(this.bound.x + this.bound.w / 2, this.bound.y, this.bound.w / 2, this.bound.h / 2));
        this.Quad_BR = new QuadTree(new Bound(this.bound.x + this.bound.w / 2, this.bound.y + this.bound.h / 2, this.bound.w / 2, this.bound.h / 2));
        this.Quad_BL = new QuadTree(new Bound(this.bound.x, this.bound.y + this.bound.h / 2, this.bound.w / 2, this.bound.h / 2));
        this.bounded = true;
    }
    insert(point) {
        if (
              (point.x - this.bound.x) * (point.x - this.bound.x - this.bound.w) > 0
            || (point.y - this.bound.y) * (point.y - this.bound.y - this.bound.h) > 0) {
            return;
        }
        if (this.points.length < 4  
            ) {
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
    draw() {


        //for (var poi of this.points) {
        //    strokeWeight(3);
        //    stroke(230);
        //    point(poi.x, poi.y);
        //}
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