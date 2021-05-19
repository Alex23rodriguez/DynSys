/*
x * (1 - x*A*y/(x+D))
B*y*(C+y-x)

"-y + x"
x + 100"
*/

var VARS = {
  xprime: { type: "text", handler: DE_parser, text: "x * (1 - x*A*y/(x+D))" },
  yprime: { type: "text", handler: DE_parser, text: "B*y*(C+y-x)" },
  A: { type: "slider", min: 0, max: 5, step: 0.1, value: A },
  B: { type: "slider", min: 0, max: 5, step: 0.1, value: B },
  C: { type: "slider", min: 0, max: 1, step: 0.1, value: C },
  D: { type: "slider", min: 0, max: 5, step: 0.1, value: D },
  leftEdge: { type: "text", text: leftEdge },
  rightEdge: { type: "text", text: rightEdge },
  topEdge: { type: "text", text: topEdge },
  bottomEdge: { type: "text", text: bottomEdge },
  dt: { type: "text", text: dt },
  fade: { type: "slider", min: 0, max: 1, step: 0.1, value: fade },
  pause: { type: "button", value: "pause", target: "pause_fn" },
};

let myDiv = document.getElementById("variables");

for (v in VARS) {
  let newDiv = document.createElement("div");
  newDiv.setAttribute("id", v + "_div");
  newDiv.setAttribute("style", "margin:20px 0px");
  newDiv.appendChild(document.createTextNode(v));
  if (VARS[v].type == "slider") {
    newDiv.appendChild(
      makeSlider(v, VARS[v].min, VARS[v].max, VARS[v].step, VARS[v].value)
    );
  } else if (VARS[v].type == "text") {
    newDiv.appendChild(makeInput(v));
  } else if (VARS[v].type == "button") {
    newDiv.appendChild(makeButton(v, VARS[v].value));
  }
  myDiv.appendChild(newDiv);
}

function makeButton(id, text) {
  let btn = document.createElement("button", "trast");
  btn.innerHTML = text;
  btn.onclick = eval(`${VARS[id].target}`);
  return btn;
}

function makeSlider(id, min, max, step, value) {
  let sld = document.createElement("input");
  sld.setAttribute("type", "range");
  sld.setAttribute("min", min);
  sld.setAttribute("max", max);
  sld.setAttribute("step", step);
  sld.setAttribute("value", value);
  sld.oninput = evalMaker(id, sld);
  return sld;
}

function makeInput(id) {
  let ele = document.createElement("input");
  ele.setAttribute("type", "text");
  if (VARS[id].text) {
    ele.setAttribute("value", VARS[id].text);
  }
  let evalFunc = evalMaker(id, ele);
  ele.onkeyup = (e) => {
    if (e.key === "Enter") {
      evalFunc();
      if (VARS[id].handler) {
        eval(`${id}_fn = ${VARS[id].handler.name}('${ele.value}')`);
      }
      clearScreen();
    }
  };

  return ele;
}

function evalMaker(myVar, elem) {
  return () => eval(`${myVar} = Number('${elem.value}')`);
}

function DE_parser(str) {
  return eval(`(x,y,t) => ${str}`);
}

// disc = (a * c + 1) ** 2 + 4 * a * d;
// r = (a * c + 1 + disc ** 0.5) / (2 * a);
