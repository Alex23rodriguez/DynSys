let MODEL = 1;

var [w, h] = [600, 600];
var t = 0;
var delta_t = -3;
var points_per_row = 15;
var max_mag;

// var points = [];
var particles = [];

var cero_x = [];
var cero_y = [];

var fade = 0;

var testvar;

/////////////
E = 1;
F = 1;
///////////////

var leftEdge = -0.2;
var rightEdge = 3;
var topEdge = 3;
var bottomEdge = -0.2;

let paused = false;

var [xprime_fn, yprime_fn, eq_point] = MODELS[MODEL];

const coordsDiv = document.getElementById("coords");
const timeDiv = document.getElementById("time");

function setup() {
  var canvas = createCanvas(w, h).parent("canvas");
  background(0);
  reset_points();
  max_mag = max(particles.map((p) => p.vel.mag()));
  prepare_photo();
}

function draw() {
  background(0, fade);
  // draw_coords();
  if (!paused) {
    update_points();
  }
  draw_particles();
  // draw_vectors();
  update_variables();
  // draw_HUD();
}

function prepare_photo(xlabel, ylabel) {
  draw_coords();
  // draw_HUD();
  draw_labels(xlabel, ylabel);
  draw_ceroclinas();
}

function mouseWheel(event) {
  // console.log(event.delta);
}

function mouseClicked() {
  particles.push(new Particle(...screenToCoords(mouseX, mouseY)));
}

function keyPressed() {
  if (key === " ") {
    clearScreen();
  }
  if (key === "p") {
    pause_fn();
  }
}

function update_points() {
  let dt = pow(10, delta_t);
  for (p of particles) {
    p.updatePosition();
  }
  t += dt;
  // max_mag = max(particles.map((p) => p.vel.mag()));
}

function reset_points() {
  // points = [];
  particles = [];
  let p2 = points_per_row * points_per_row;
  for (let i = 0; i < p2; i++) {
    // x = (i % points_per_row) / points_per_row;
    // y = ~~(i / points_per_row) / points_per_row;
    x = map(i % points_per_row, -1, points_per_row, leftEdge, rightEdge);
    y = map(~~(i / points_per_row), -1, points_per_row, topEdge, bottomEdge);

    particles.push(new Particle(x, y));
  }
}

function updateCoords() {
  let x = map(mouseX, 0, w, leftEdge, rightEdge);
  let y = map(mouseY, 0, h, topEdge, bottomEdge);
  coordsDiv.innerHTML = `<p>x: ${round(x, 2)}</p><p>y: ${round(y, 2)}</p>`;
}

function evalYEquation(fn, steps) {}
// for(let i = 0; i<)
// }

function evalEquation(eq, xmin, xmax, steps) {
  let ans = [];
  for (let i = 0; i < steps; i++) {
    let x = map(i, 0, steps, xmin, xmax);
    let y = nerdamer(eq).evaluate({ x: x, A: A, B: B, C: C, D: D, t: t });
    if (y.isNumber()) {
      ans.push([x, Number(y)]);
    } else {
      let ys = y.solveFor("y");
      try {
        ans.push([x, ...ys.map((a) => Number(a))]);
      } catch {
        ans.push([x, Number(ys)]);
      }
    }
  }
  return ans;
}

function pause_fn() {
  // if (paused) loop();
  // else noLoop();
  paused = !paused;
}

function vCoordsToScreen(v) {
  return [
    map(v.x, leftEdge, rightEdge, 0, w),
    map(v.y, topEdge, bottomEdge, 0, h),
  ];
}

function screenToCoords(x, y) {
  return [map(x, 0, w, leftEdge, rightEdge), map(y, 0, h, topEdge, bottomEdge)];
}
