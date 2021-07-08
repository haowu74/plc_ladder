var jsonObject;

var dragged;

const x = ["X0", "X1", "X2", "X3", "X4", "X5", "X6", "X7", "X8", "X9"];
const y = ["Y0", "Y1", "Y2", "Y3", "Y4", "Y5"];
const m = ["M0", "M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8", "M9"];

const rungTemplate =
  '<div class="rung rung-template" draggable="true">' +
  '<div class="short-wire wire-left">' +
  '<div class="wire-visible"></div>' +
  "</div>" +
  '<div class="wire">' +
  '<div class="wire-visible"></div>' +
  "</div>" +
  '<div class="short-wire wire-right">' +
  '<div class="wire-visible"></div>' +
  "</div>" +
  "</div>";

const xicTemplate =
  '<div class="ladder-element xic-template" draggable="true">' +
  '<div class="ladder-element-bool">' +
  '<input type="text" value="Variable" class="tag-name"></input>' +
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
  '<input type="text" value="Variable" class="tag-name"></input>' +
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
  '<input type="text" value="Variable" class="tag-name"></input>' +
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
  '<div class="short-wire wire-left">' +
  '<div class="wire-visible"></div>' +
  "</div>" +
  '<div class="branch-vertical" style="height: 58px;"></div>' +
  '<div class="branch-rungs">' +
  '<div class="rung">' +
  '<div class="short-wire wire-left">' +
  '<div class="wire-visible"></div>' +
  "</div>" +
  '<div class="wire">' +
  '<div class="wire-visible"></div>' +
  "</div>" +
  '<div class="short-wire wire-right">' +
  '<div class="wire-visible"></div>' +
  "</div>" +
  "</div>" +
  '<div class="rung">' +
  '<div class="short-wire wire-left">' +
  '<div class="wire-visible"></div>' +
  "</div>" +
  '<div class="wire">' +
  '<div class="wire-visible"></div>' +
  "</div>" +
  '<div class="short-wire wire-right">' +
  '<div class="wire-visible"></div>' +
  "</div>" +
  "</div>" +
  "</div>" +
  '<div class="branch-vertical" style="height: 58px;"></div>' +
  '<div class="short-wire wire-right">' +
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

$(document).on(
  "dragenter",
  ".logic .ladder-element > .ladder-element-bool > .circuit-element > .wire",
  function (event) {
    $(this).css("outline", "2px dashed blue");
  }
);

$(document).on(
  "dragleave",
  ".logic .ladder-element > .ladder-element-bool > .circuit-element > .wire",
  function (event) {
    $(this).css("outline", "");
  }
);

$(document).on(
  "dragover",
  ".logic .ladder-element > .ladder-element-bool > .circuit-element > .wire",
  function (event) {
    event.preventDefault();
  }
);

$(document).on(
  "drop",
  ".logic .ladder-element > .ladder-element-bool > .circuit-element > .wire-left",
  function (event) {
    var cloned = dragged.cloneNode(true);
    if ($(cloned).hasClass("xic-template")) {
      $(cloned).removeClass("xic-template");
      $(this).parent().parent().parent().before(cloned);
    } else if ($(cloned).hasClass("xio-template")) {
      $(cloned).removeClass("xio-template");
      $(this).parent().parent().parent().before(cloned);
    }
    dragged = null;
    $(this).css("outline", "");
  }
);

$(document).on(
  "drop",
  ".logic .ladder-element > .ladder-element-bool > .circuit-element > .wire-right",
  function (event) {
    var cloned = dragged.cloneNode(true);
    if ($(cloned).hasClass("xic-template")) {
      $(cloned).removeClass("xic-template");
      $(this).parent().parent().parent().after(cloned);
    } else if ($(cloned).hasClass("xio-template")) {
      $(cloned).removeClass("xio-template");
      $(this).parent().parent().parent().after(cloned);
    }
    dragged = null;
    $(this).css("outline", "");
  }
);

// Add parallel rung onto a contact

$(document).on(
  "dragenter",
  ".logic .branch-logic > .branch-rungs > .rung > .ladder-element > .ladder-element-bool > .circuit-element > .xic, .logic .branch-logic > .branch-rungs > .rung > .ladder-element > .ladder-element-bool > .circuit-element > .xio",
  function (event) {
    if ($(dragged).hasClass("branch-template")) {
      $(this).css("outline", "2px dashed blue");
    }
  }
);

$(document).on(
  "dragleave",
  ".logic .branch-logic > .branch-rungs > .rung > .ladder-element > .ladder-element-bool > .circuit-element > .xic, .logic .branch-logic > .branch-rungs > .rung > .ladder-element > .ladder-element-bool > .circuit-element > .xio",
  function (event) {
    if ($(dragged).hasClass("branch-template")) {
      $(this).css("outline", "");
    }
  }
);

$(document).on(
  "dragover",
  ".logic .branch-logic > .branch-rungs > .rung > .ladder-element > .ladder-element-bool > .circuit-element > .xic, .logic .branch-logic > .branch-rungs > .rung > .ladder-element > .ladder-element-bool > .circuit-element > .xio",
  function (event) {
    if ($(dragged).hasClass("branch-template")) {
      event.preventDefault();
    }
  }
);

$(document).on(
  "drop",
  ".logic .branch-logic > .branch-rungs > .rung > .ladder-element > .ladder-element-bool > .circuit-element > .xic, .logic .branch-logic > .branch-rungs > .rung > .ladder-element > .ladder-element-bool > .circuit-element > .xio",
  function (event) {
    if ($(dragged).hasClass("branch-template")) {
      var cloned = dragged.cloneNode(true);
      dragged = null;
      $(this).css("outline", "");
      // var s = $(this).parent().parent().parent().parent();
      // var branch = branchTemplate;
      // var contact = $(s).html();
      // $(this).parent().parent().parent().replaceWith(branch);
      // $(s).find(".wire-left:eq(1)").after(contact);

      // escalateBranchVertical($(s), 58);
    }
  }
);

// Move objects to the branch

$(document).on(
  "dragenter",
  ".logic .branch-logic > .branch-rungs > .rung > .wire",
  function (event) {
    $(this).css("outline", "2px dashed blue");
  }
);

$(document).on(
  "dragleave",
  ".logic .branch-logic > .branch-rungs > .rung > .wire",
  function (event) {
    $(this).css("outline", "");
  }
);

$(document).on(
  "dragover",
  ".logic .branch-logic > .branch-rungs > .rung > .wire",
  function (event) {
    event.preventDefault();
  }
);

$(document).on(
  "drop",
  ".logic .branch-logic > .branch-rungs > .rung > .wire",
  function (event) {
    var cloned = dragged.cloneNode(true);

    if ($(cloned).hasClass("branch-template")) {
      if ($(this).parent().is(":last-child")) {
        $(this)
          .parent()
          .parent()
          .parent()
          .find(".branch-rungs")
          .append(
            '<div class="rung">' +
              '<div class="short-wire wire-left">' +
              '<div class="wire-visible"></div>' +
              "</div>" +
              '<div class="wire">' +
              '<div class="wire-visible"></div>' +
              "</div>" +
              '<div class="short-wire wire-right">' +
              '<div class="wire-visible"></div>' +
              "</div>" +
              "</div>" +
              "</div>"
          );
        escalateBranchVertical($(this), 58);
      } else {
        // sub branch on this branch
        escalateBranchVertical($(this), 58);
        $(this).after(branchTemplate);
      }
    } else {
      $(this).before(cloned);
    }

    dragged = null;
    $(this).css("outline", "");
  }
);

// Move objects to the rung
$(document).on(
  "dragenter",
  ".logic > .rungs > .rung > .wire",
  function (event) {
    $(this).css("outline", "2px dashed blue");
  }
);

$(document).on(
  "dragleave",
  ".logic > .rungs > .rung > .wire",
  function (event) {
    $(this).css("outline", "");
  }
);

$(document).on("dragover", ".logic > .rungs > .rung > .wire", function (event) {
  event.preventDefault();
});

$(document).on("drop", ".logic > .rungs > .rung > .wire", function (event) {
  var cloned = dragged.cloneNode(true);
  if ($(cloned).hasClass("ote-template")) {
    $(this).after(cloned);
  } else if (
    $(cloned).hasClass("xic-template") ||
    $(cloned).hasClass("xio-template")
  ) {
    $(this).before(cloned);
  } else if ($(cloned).hasClass("branch-template")) {
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
  var rung = $(rungTemplate).clone();
  for (var key in json) {
    switch (key) {
      case "and":
        var temp = renderAnd(json[key]);
        $(rung).prepend(temp);
        break;
      case "or":
        renderOr(json[key]);
        break;
      case "not":
        renderNot(json[key]);
        break;
      case "=":
        var temp = renderAssign(json[key]);
        $(rung).append(temp);
        break;
      default:
        break;
    }
  }
  return rung;
}

function renderAnd(json) {
  var s = "";
  for (var i in json) {
    if (typeof json[i] === "string") {
      s += xicTemplate;
    } else {
      for (var j in json[i]) {
        if (j === "not") {
          s += xioTemplate;
        } else if (j === "or") {
          s1 = renderOr(json[i][j]);
          s += s1;
        }
      }
    }
  }
  return s;
}

function renderOr(json) {
  var s = $("<div></div>");
  s.append(branchTemplate);
  for (var i in json) {
    if (typeof json[i] === "string") {
    }
  }
  return s.html();
}

function renderNot(json) {
  console.log(json);
}

// escalate the change of height of the branch vertical links

function escalateBranchVertical(element, expand) {
  $(element)
    .parentsUntil(".rungs")
    .siblings(".branch-vertical")
    .each(function (index, node) {
      height = $(node).height();
      $(node).height(height + expand);
    });
}

function renderAssign(json) {
  console.log(json);
  var s = document.createElement("div");
  if (typeof json === "string") {
    $(s).append(oteTemplate);
  }
  // console.log(s);

  return s.innerHTML;
}

function saveToJson() {}
