var MODELS = [];
var PRESET = [];

// Lotka-Volterra Model
// A (p): impact of predators on prey
// B: growth rate of prey
// Cx (r): growth of predators in response to amount of prey
// D: death rate of predators when absence of prey
MODELS.push([
  (x, y, t) => x * (B - A * y),
  (x, y, t) => y * (C * x - D),
  () => [D / C, B / A],
]);

// modelo cuadrático:
// A: a
// B: b
// C: r
// D: d
// E: p
MODELS.push([
  (x, y, t) => B * x * (1 - x / B) - (E * x * y) / (A + D),
  (x, y, t) => C * y * (1 - y / C) - B * x * y,
  () => {
    let x = (B - (C * E) / (A + D)) / (1 - (E * B) / (A + D));
    return [x, C - B * x];
  },
]);

// Jacob-Monod Model
// A (V) is the uptake velocity,
// B (K) is the saturation constant, and
// C (Y) is the yield of x per unit y taken up.
MODELS.push([
  (x, y, t) => x * ((A * y) / (B + y)),
  (x, y, t) => (-1 / C) * ((A * y) / (B + y)) * x,
  () => {
    let x = (A * C + 1 + sqrt(sq(A * C + 1) + 4 * A * D)) / (2 * A);
    return [x, x - C];
  },
]);

// EJEMPLO 1
MODELS.push([
  (x, y, t) => x * (1 - (x * A * y) / (x + D)),
  (x, y, t) => B * y * (C + y - x),
  () => {
    let x = (A * C + 1 + sqrt(sq(A * C + 1) + 4 * A * D)) / (2 * A);
    return [x, x - C];
  },
]);

// EJEMPLO 2
MODELS.push([
  (x, y, t) => x * (1 - x) - A * x * y,
  (x, y, t) => y + A * x * y,
  () => [-1 / A, 1 / A + 1 / (A * A)],
]);

// GENERAL Ax(1-Bx) - Cxy
MODELS.push([
  (x, y, t) => x * (A - B * x - C * y),
  (x, y, t) => y * (D - E * y + F * x),
  (x, y, t) => [0, 0],
]);

MODELS.push([
  (x, y, t) => A * x * (1 - x / A) - x * y,
  (x, y, t) => B * y * (1 - y / B) - A * x * y,
  (x, y, t) => [0, 0],
]);

//// DIAP 7 - Modelo Lotka-Voltera
let preset = {
  vars: {
    A: ["p", "A_slider", 0, 2, 0.01, 1],
    B: ["b", "B_slider", 0, 2, 0.01, 1],
    C: ["r", "B_slider", 0, 1, 0.01, 0.5],
    D: ["d", "B_slider", 0, 2, 0.01, 1],
  },
};

// [
// 'cero_x = ["y=1"]',
// 'cero_y = ["x=2"]'
// 'p = 1',

// ]
