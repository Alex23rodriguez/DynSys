let DISP_MAG = 20;
let TAIL_SIZE = 0;
let drawArrows = false;

let fades = [];
for (let i = 0; i < TAIL_SIZE; i++) {
  fades.push(100 - (i * 100) / TAIL_SIZE);
}

function Particle(x, y) {
  this.pos = createVector(x, y);
  this.init_pos = this.pos.copy();
  this.vel = createVector(0, 0);
  this.dir_vector = createVector(0, 0);
  this.tail = [];

  for (let i = 0; i < TAIL_SIZE; i++) {
    this.tail.push(this.pos.copy());
  }

  this.draw = () => {
    this.set_color();
    strokeWeight(1);
    point(
      map(this.pos.x, leftEdge, rightEdge, 0, w),
      map(this.pos.y, topEdge, bottomEdge, 0, h)
    );
  };

  this._updateVelocity = () => {
    this.vel.set(
      xprime_fn(this.pos.x, this.pos.y, t),
      yprime_fn(this.pos.x, this.pos.y, t)
    );

    // this.dir_vector = new p5.Vector(10, 10).mult(fade).limit(DISP_MAG);
  };
  this._updateVelocity();

  this.updatePosition = () => {
    this.tail.unshift(this.pos.copy());
    this.tail.pop();
    let dt = pow(10, delta_t);
    this.pos = this.pos.add(this.vel.copy().mult(dt));

    if (!this.inbounds()) {
      this.pos = this.init_pos.copy();
    }

    this._updateVelocity();
  };

  this.set_color = () => {
    let m = map(this.vel.mag(), 0, max_mag * 0.6, 100, 0);
    stroke(max(m, 0), 100, 100);
  };

  this.drawVector = () => {
    this.set_color();
    let [x, y] = vCoordsToScreen(this.pos);
    // let p = createVector(x + this.dir_vector.x, y - this.dir_vector.y
    this.dir_vector = this.vel.copy().mult(arrLength).limit(DISP_MAG);
    let [x1, y1] = [x + this.dir_vector.x, y - this.dir_vector.y];
    line(x, y, x1, y1);
    if (drawArrows) {
      let p = this.vel.copy().setMag(this.dir_vector.mag() * 0.3);
      let rots = [p.copy().rotate(2.7), p.rotate(-2.7)];
      //   console.log(x1, y1, x1 + rots[0].x, y1 - rots[0].y);
      line(x1, y1, x1 + rots[0].x, y1 - rots[0].y);
      line(x1, y1, x1 + rots[1].x, y1 - rots[1].y);
    }
  };

  this.inbounds = () =>
    this.pos.x >= leftEdge &&
    this.pos.x <= rightEdge &&
    this.pos.y >= bottomEdge &&
    this.pos.y <= topEdge;
}

function addParticlesToEdges() {
  let ps = [];
  let deltax = map(1, 0, points_per_row, 0, rightEdge - leftEdge);
  let deltay = map(1, 0, points_per_row, 0, topEdge - bottomEdge);
  let x = leftEdge;
  let y = bottomEdge;

  for (let i = 1; i < points_per_row * 3; i++) {
    ps.push(new Particle(x, topEdge));
    ps.push(new Particle(x, bottomEdge));
    ps.push(new Particle(leftEdge, y));
    ps.push(new Particle(rightEdge, y));
    x += deltax;
    y += deltay;
  }
  for (p of ps) {
    p.updatePosition();
    if (p.inbounds()) {
      particles.push(p);
    } else {
    }
  }
}
