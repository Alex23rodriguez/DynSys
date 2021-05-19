NUM_STEPS = 100;

function makeSliderController(name, id, min, max, step, value) {
  //MAKE SLIDER
  let sld = document.createElement("input");
  sld.setAttribute("type", "range");
  sld.setAttribute("min", min);
  sld.setAttribute("max", max);
  sld.setAttribute("step", step);
  sld.setAttribute("value", value);
  sld.setAttribute("id", id);
  sld.setAttribute("class", "slider");

  // SLIDER EDGE TEXT INPUTS
  let min_edge = document.createElement("input");
  min_edge.setAttribute("type", "text");
  min_edge.setAttribute("class", "slider-textinput");
  min_edge.setAttribute("value", min);
  min_edge.onkeyup = makeKeyupFunction(min_edge, "value", sld, "min");

  let max_edge = document.createElement("input");
  max_edge.setAttribute("type", "text");
  max_edge.setAttribute("class", "slider-textinput");
  max_edge.setAttribute("value", max);
  max_edge.onkeyup = makeKeyupFunction(max_edge, "value", sld, "max");

  //SLIDER STEP SETTER
  let step_setter = document.createElement("input");
  step_setter.setAttribute("type", "text");
  step_setter.setAttribute("class", "slider-textinput");
  step_setter.setAttribute("value", step);
  step_setter.onkeyup = makeKeyupFunction(step_setter, "value", sld, "step");

  //SLIDER VALUE SETTER
  let val_setter = document.createElement("input");
  val_setter.setAttribute("type", "text");
  val_setter.setAttribute("class", "slider-textinput");
  val_setter.setAttribute("value", value);
  let temp = makeKeyupFunction(val_setter, "value", sld, "value");
  val_setter.onkeyup = function (e) {
    if (e.key == "Enter") {
      let n = Number(val_setter.value);
      if (Number(sld.min) > n) {
        sld.min = n;
        min_edge.value = n;
      }
      if (Number(sld.max) < n) {
        sld.max = n;
        max_edge.value = n;
      }
      temp(e);
    }
  };
  // keep value updated
  sld.oninput = () => (val_setter.value = sld.value);

  // MAKE DIV
  let myDiv = document.createElement("div");
  myDiv.setAttribute("class", "var-container row");
  let wrapper = document.createElement("p");
  wrapper.innerText = name;
  wrapper.setAttribute("class", "var-name");
  myDiv.appendChild(wrapper);
  wrapper = wrapInDiv(val_setter, "margin-left row", "Value:");
  myDiv.appendChild(wrapper);
  myDiv.appendChild(min_edge);
  myDiv.appendChild(sld);
  myDiv.appendChild(max_edge);
  wrapper = wrapInDiv(step_setter, "margin-left row", "Step size:");
  myDiv.appendChild(wrapper);

  return myDiv;
}

function makeKeyupFunction(source, source_property, target, target_property) {
  return function (e) {
    if (e.key == "Enter") {
      target[target_property] = source[source_property];
    }
  };
}

function wrapInDiv(element, classes, text) {
  let temp = document.createElement("div");
  temp.setAttribute("class", classes);
  temp.innerText = text;
  temp.appendChild(element);
  return temp;
}

function sketchyFuncMaker(str) {
  //   console.log(`(x,y,t)=>${str}`);
  return eval(`(x,y,t)=>${str}`);
}

/////////// TODO make better
function makeKeyupTriggerFunction(source, source_property, func) {
  return function (e) {
    if (e.key == "Enter") {
      func(source[source_property]);
    }
  };
}

let xp = document.getElementById("xprime");
xp.onkeyup = makeKeyupTriggerFunction(xp, "value", (val) => {
  console.log(val);
  xprime_fn = sketchyFuncMaker(val);
});
let yp = document.getElementById("yprime");
yp.onkeyup = makeKeyupTriggerFunction(yp, "value", (val) => {
  console.log(val);
  yprime_fn = sketchyFuncMaker(val);
});

let upbtn = document.getElementById("update-btn");
upbtn.onclick = () => {
  prepare_photo();
  draw_ceroclinas();
};
