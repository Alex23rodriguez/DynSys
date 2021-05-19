function draw_particles() {
  colorMode("hsb");
  for (p of particles) {
    p.draw();
  }
  colorMode("rgb");

  // update timestamp
  timeDiv.innerText = `t: ${round(t, 3)}`;

  // update equilibrium point
  strokeWeight(5);
  stroke(26, 255, 251);
  let [x, y] = eq_point();
  point(map(x, leftEdge, rightEdge, 0, w), map(y, topEdge, bottomEdge, 0, h));
  strokeWeight(1);
  stroke(255);
}

// function draw_eq(){

// }

function draw_eq(eq) {
  let sol = evalEquation(eq, leftEdge, rightEdge, 50);
  testvar = sol;
  for (let i = 1; i < sol.length; i++) {
    x1 = map(sol[i - 1][0], leftEdge, rightEdge, 0, w);
    x2 = map(sol[i][0], leftEdge, rightEdge, 0, w);

    y1 = map(sol[i - 1][1], topEdge, bottomEdge, 0, h);
    y2 = map(sol[i][1], topEdge, bottomEdge, 0, h);
    line(x1, y1, x2, y2);
  }
}

function draw_coords() {
  stroke(255);
  strokeWeight(2);
  let x_origin = map(0, leftEdge, rightEdge, 0, w);
  let y_origin = map(0, topEdge, bottomEdge, 0, h);
  line(x_origin, 0, x_origin, h);
  line(0, y_origin, w, y_origin);
  strokeWeight(0.5);
  _draw_ticks(x_origin, y_origin);
}

function _draw_ticks(x, y) {
  strokeWeight(1);
  fill(255);

  // decide on deltas
  let dx = _get_delta(rightEdge - leftEdge, 8);
  let dy = _get_delta(topEdge - bottomEdge, 8);

  let deltax = map(dx, 0, rightEdge - leftEdge, 0, w);
  let deltay = map(dy, 0, topEdge - bottomEdge, 0, h);

  // x-axis ticks
  for (let i = -~~(x / deltax); i < ~~(w / deltax) + 1; i++) {
    let a = i * deltax + x;
    if (y > 0 && y < h) {
      line(a, y - 5, a, y + 5);
      noStroke();
      text(round(i * dx, 2), a + 5, y + 20);
      stroke(255);
    } else {
      line(a, h - 10, a, h);
      noStroke();
      text(round(i * dx, 2), a + 5, h - 20);
      stroke(255);
    }
  }
  // y-axis ticks
  for (let i = -~~(y / deltay); i < ~~(w / deltay) + 1; i++) {
    let a = i * deltay + y;
    if (x > 0 && x < w) {
      line(x - 5, a, x + 5, a);
      noStroke();
      text(-round(i * dy, 2), x - 30, a - 5);
      stroke(255);
    } else {
      line(0, a, 10, a);
      noStroke();
      text(-round(i * dy, 2), 5, a - 5);
      stroke(255);
    }
  }
}

function _get_delta(range, num_ticks) {
  delta = 1;
  if (range > 20) {
    while (range / delta > num_ticks) {
      delta *= 2;
    }
  } else {
    while (range / delta < num_ticks) {
      delta /= 2;
      if (delta < 0.005) break;
    }
  }
  return delta;
}

function clearScreen() {
  background(0);
  reset_points();
  prepare_photo();
}

function draw_vectors() {
  colorMode("hsb");
  strokeWeight(1);
  for (p of particles) {
    p.drawVector();
  }
  colorMode("rgb");
}

function draw_HUD() {
  //   lst = [`p: ${A}`, `b: ${B}`, `r: ${C}`, `d: ${D}`];
  lst = [`gamma: ${A}`];

  fill(10);
  rect(w, 0, -80, lst.length * 20 + 15);
  noStroke();
  fill(255);

  for (i in lst) {
    text(lst[i], w - 60, 20 + 20 * i);
  }
  stroke(255);
}

function draw_labels(xl, yl) {
  textAlign("center");
  noStroke();
  text(xl, w / 2, h - 10);
  push();
  translate(15, h / 2);
  rotate(-PI / 2);
  text(yl, 0, 0);
  pop();
  stroke(255);
  textAlign("left");
}

function draw_ceroclinas() {
  //   console.log("hi");
  // x
  stroke(162, 192, 253);
  for (let cero of cero_x) draw_eq(cero);

  // y
  stroke(13, 195, 159);
  for (let cero of cero_y) draw_eq(cero);
}
