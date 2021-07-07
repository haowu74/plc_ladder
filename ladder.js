var jsonObject;

var dragged;

const x = ["X0", "X1", "X2", "X3", "X4", "X5", "X6", "X7", "X8", "X9"];
const y = ["Y0", "Y1", "Y2", "Y3", "Y4", "Y5"];
const m = ["M0", "M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8", "M9"];

const rungTemplate =
  '<div class="rung rung-template" draggable="true">' +
  '<div class="short-wire">' +
  '<div class="wire-visible"></div>' +
  "</div>" +
  '<div class="wire">' +
  '<div class="wire-visible"></div>' +
  "</div>" +
  '<div class="short-wire">' +
  '<div class="wire-visible"></div>' +
  "</div>" +
  "</div>";

const xicTemplate =
  '<div class="ladder-element xic-template" draggable="true">' +
  '<div class="ladder-element-bool">' +
  '<select class="variable-select" disabled="">' +
  '<option value="" disabled="" hidden="">Variable</option>' +
  "</select>" +
  '<div class="circuit-element">' +
  '<div class="wire wire-left">' +
  '<div class="wire-visible"></div>' +
  "</div>" +
  '<div class="xic"></div>' +
  '<div class="wire wire-right">' +
  '<div class="wire-visible"></div>' +
  "</div>" +
  "</div>" +
  "</div>" +
  "</div>";

const xioTemplate =
  '<div class="ladder-element xio-template" draggable="true">' +
  '<div class="ladder-element-bool">' +
  '<select class="variable-select" disabled="">' +
  '<option value="" disabled="" hidden="">Variable</option>' +
  "</select>" +
  '<div class="circuit-element">' +
  '<div class="wire wire-left">' +
  '<div class="wire-visible"></div>' +
  "</div>" +
  '<div class="xio"></div>' +
  '<div class="wire wire-right">' +
  '<div class="wire-visible"></div>' +
  "</div>" +
  "</div>" +
  "</div>";

const oteTemplate =
  '<div class="ladder-element ote-template" draggable="true">' +
  '<div class="ladder-element-bool">' +
  '<select class="variable-select" disabled="">' +
  '<option value="" disabled="" hidden="">Variable</option>' +
  '</select><div class="circuit-element">' +
  '<div class="wire wire-left">' +
  '<div class="wire-visible"></div>' +
  "</div>" +
  '<div class="ote"></div>' +
  '<div class="wire wire-right">' +
  '<div class="wire-visible"></div>' +
  "</div>" +
  "</div>" +
  "</div>" +
  "</div>";

const branchTemplate =
  '<div class="branch-logic branch-template" draggable="true">' +
  '<div class="short-wire">' +
  '<div class="wire-visible"></div>' +
  "</div>" +
  '<div class="branch-vertical" style="height: 58px;"></div>' +
  '<div class="branch-rungs">' +
  '<div class="rung">' +
  '<div class="short-wire">' +
  '<div class="wire-visible"></div>' +
  "</div>" +
  '<div class="wire">' +
  '<div class="wire-visible"></div>' +
  "</div>" +
  '<div class="short-wire">' +
  '<div class="wire-visible"></div>' +
  "</div>" +
  "</div>" +
  '<div class="rung">' +
  '<div class="short-wire">' +
  '<div class="wire-visible"></div>' +
  "</div>" +
  '<div class="wire">' +
  '<div class="wire-visible"></div>' +
  "</div>" +
  '<div class="short-wire">' +
  '<div class="wire-visible"></div>' +
  "</div>" +
  "</div>" +
  "</div>" +
  '<div class="branch-vertical" style="height: 58px;"></div>' +
  '<div class="short-wire">' +
  '<div class="wire-visible"></div>' +
  "</div>" +
  "</div>";

function addRung() {
  $(".rungs").append(rungTemplate);
}

$(document).on("dragstart", "div[draggable=true]", function (event) {
  dragged = event.target;
});

// Move objects to the trash

$(".trash").on("dragenter", function (event) {
  $(this).css("outline", "2px dashed blue");
});

$(".trash").on("dragleave", function (event) {
  $(this).css("outline", "2px dashed #5c5c5c");
});

$(".trash").on("dragover", function (event) {
  event.preventDefault();
});

$(".trash").on("drop", function (event) {
  console.log(event);
  dragged.remove();
  dragged = null;
  $(this).css("outline", "2px dashed #5c5c5c");
});

// Move objects to the contact

$(
  ".logic > .rungs > .rung > .branch-logic > .branch-rungs > .rung > .ladder-element > .ladder-element-bool > .circuit-element > .wire"
).on("dragenter", function (event) {
  $(this).css("outline", "2px dashed blue");
});

$(
  ".logic > .rungs > .rung > .branch-logic > .branch-rungs > .rung > .ladder-element > .ladder-element-bool > .circuit-element > .wire"
).on("dragleave", function (event) {
  $(this).css("outline", "");
});

$(
  ".logic > .rungs > .rung > .branch-logic > .branch-rungs > .rung > .ladder-element > .ladder-element-bool > .circuit-element > .wire"
).on("dragover", function (event) {
  event.preventDefault();
});

$(
  ".logic > .rungs > .rung > .branch-logic > .branch-rungs > .rung > .ladder-element > .ladder-element-bool > .circuit-element > .wire-left"
).on("drop", function (event) {
  var cloned = dragged.cloneNode(true);
  if ($(cloned).hasClass("xic-template")) {
    $(cloned).removeClass("xic-template");
  } else if ($(cloned).hasClass("xio-template")) {
    $(cloned).removeClass("xio-template");
  }
  $(this).parent().parent().parent().before(cloned);
  dragged = null;
  $(this).css("outline", "");
});

$(
  ".logic > .rungs > .rung > .branch-logic > .branch-rungs > .rung > .ladder-element > .ladder-element-bool > .circuit-element > .wire-right"
).on("drop", function (event) {
  var cloned = dragged.cloneNode(true);
  if ($(cloned).hasClass("xic-template")) {
    $(cloned).removeClass("xic-template");
  } else if ($(cloned).hasClass("xio-template")) {
    $(cloned).removeClass("xio-template");
  }
  $(this).parent().parent().parent().after(cloned);
  dragged = null;
  $(this).css("outline", "");
});

// Move objects to the branch

$(".logic > .rungs > .rung > .branch-logic > .branch-rungs > .rung > .wire").on(
  "dragenter",
  function (event) {
    $(this).css("outline", "2px dashed blue");
  }
);

$(".logic > .rungs > .rung > .branch-logic > .branch-rungs > .rung > .wire").on(
  "dragleave",
  function (event) {
    $(this).css("outline", "");
  }
);

$(".logic > .rungs > .rung > .branch-logic > .branch-rungs > .rung > .wire").on(
  "dragover",
  function (event) {
    event.preventDefault();
  }
);

$(".logic > .rungs > .rung > .branch-logic > .branch-rungs > .rung > .wire").on(
  "drop",
  function (event) {
    var cloned = dragged.cloneNode(true);
    $(this).before(cloned);
    dragged = null;
    $(this).css("outline", "");
  }
);

// Move objects to the rung
$(".logic > .rungs > .rung > .wire").on("dragenter", function (event) {
  $(this).css("outline", "2px dashed blue");
});

$(".logic > .rungs > .rung > .wire").on("dragleave", function (event) {
  $(this).css("outline", "");
});

$(".logic > .rungs > .rung > .wire").on("dragover", function (event) {
  event.preventDefault();
});

$(".logic > .rungs > .rung > .wire").on("drop", function (event) {
  var cloned = dragged.cloneNode(true);
  if ($(cloned).hasClass("ote-template")) {
    $(this).after(cloned);
  } else {
    $(this).before(cloned);
  }
  dragged = null;
  $(this).css("outline", "");
});

// Document ready
$.ready(function () {});

async function readFromJson() {
  $("#json_file").trigger("click");
  do {
    var fileToLoad = document.getElementById("json_file").files[0];
    // console.log(fileToLoad);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  } while (fileToLoad === undefined);

  var fileReader = new FileReader();
  fileReader.onload = function (fileLoadedEvent) {
    var textFromFileLoaded = fileLoadedEvent.target.result;
    jsonObject = JSON.parse(textFromFileLoaded);
    console.log(jsonObject);

    renderJson(jsonObject);
  };

  fileReader.readAsText(fileToLoad, "UTF-8");
}

function renderJson(json) {
  $(".rungs").empty();
  for (r in json.rung) {
    // console.log(rung, json.rung[r]);
    var rung = renderRung(json.rung[r]);
    $(".rungs").append(rung);
  }
}

function renderRung(json) {
var rung = rungTemplate;
  for (var key in json) {
    switch (key) {
      case "and":
        renderAnd(json[key])
        break;
      case "or":
        renderOr(json[key])
        break;
      case "not":
        renderNot(json[key]) 
        break;
      case "=":
        renderAssign(json[key])
        break;
      default:
        break;
    }
  }
  return rung; 
}

function renderAnd(json) {
    console.log(json);
    for (var i in json) {

    }
}

function renderOr(json) {
    console.log(json);

}

function renderNot(json) {
    console.log(json);

}

function renderAssign(json) {
    console.log(json);

}

function saveToJson() {}
