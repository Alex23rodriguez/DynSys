// ADD CONTROLERS

let myDiv = document.getElementById("variables");

myDiv.appendChild(makeSliderController("A", "A_slider", 0, 5, 0.01, 1));
myDiv.appendChild(makeSliderController("B", "B_slider", 0, 5, 0.01, 1));
myDiv.appendChild(makeSliderController("C", "C_slider", 0, 5, 0.01, 0.5));
myDiv.appendChild(makeSliderController("D", "D_slider", 0, 5, 0.01, 1));
// myDiv.appendChild(makeSliderController("p", "E_slider", 0, 5, 0.01, 1));
/*
myDiv.appendChild(
  makeSliderController("left edge", "leftEdge_slider", -1, 0, 0.1, -0.5)
);
myDiv.appendChild(
  makeSliderController("right edge", "rightEdge_slider", 0, 10, 0.1, 5)
);
myDiv.appendChild(
  makeSliderController("top edge", "topEdge_slider", 0, 10, 0.1, 5)
);
myDiv.appendChild(
  makeSliderController("bottom edge", "bottomEdge_slider", -1, 0, 0.1, -0.5)
);
myDiv.appendChild(
  makeSliderController("arrLength", "arrLength_slider", 0, 20, 0.01, 10)
);
*/
myDiv.appendChild(
  makeSliderController("time speed (10^x)", "delta_t_slider", -4, -2, 0.1, -3)
);

//
//
//
/// im sorry for doing this...
// let xprm = document.createElement('input')
// xprm.setAttribute('type', 'text')
// xprm.oninput()

////
///

let VAR_TRACKER = {
  A: document.getElementById("A_slider"),
  B: document.getElementById("B_slider"),
  C: document.getElementById("C_slider"),
  D: document.getElementById("D_slider"),
  /*
  leftEdge: document.getElementById("leftEdge_slider"),
  rightEdge: document.getElementById("rightEdge_slider"),
  topEdge: document.getElementById("topEdge_slider"),
  bottomEdge: document.getElementById("bottomEdge_slider"),
  arrLength: document.getElementById("arrLength_slider"),
  */
  delta_t: document.getElementById("delta_t_slider"),
};

// HORRIBLE FUNCTION
function update_variables() {
  for (entry of Object.entries(VAR_TRACKER)) {
    let elem = entry[1].value;
    eval(`${entry[0]} = ${elem}`);
  }
  // for ([a, k] of Object.entries(MAPPED)) {
  // eval(`${a} = ${k}`);
  // }
}

update_variables();
