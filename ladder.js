var jsonObject;

var dragged;

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
  '<input type="text" value="Variable" class="tag-name" onchange="changeTagName(event)"></input>' +
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
  '<input type="text" value="Variable" class="tag-name" onchange="changeTagName(event)"></input>' +
  '<div class="circuit-element">' +
  '<div class="wire wire-left">' +
  '<div class="wire-visible"></div>' +
  "</div>" +
  '<div class="xio"></div>' +
  '<div class="wire wire-right">' +
  '<div class="wire-visible"></div>' +
  "</div>" +
  "</div>" +
  "</div>" +
  "</div>";

const oteTemplate =
  '<div class="ladder-element ote-template" draggable="true">' +
  '<div class="ladder-element-bool">' +
  '<input type="text" value="Variable" class="tag-name" onchange="changeTagName(event)"></input>' +
  '<div class="circuit-element">' +
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
  '<div class="branch-logic branch-template" draggable="true" data-level="2">' +
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
  ".logic .ladder-element:not('.ote-template') > .ladder-element-bool > .circuit-element > .wire",
  function (event) {
    $(this).css("outline", "2px dashed blue");
  }
);

$(document).on(
  "dragleave",
  ".logic .ladder-element:not('.ote-template') > .ladder-element-bool > .circuit-element > .wire",
  function (event) {
    $(this).css("outline", "");
  }
);

$(document).on(
  "dragover",
  ".logic .ladder-element:not('.ote-template') > .ladder-element-bool > .circuit-element > .wire",
  function (event) {
    event.preventDefault();
  }
);

$(document).on(
  "drop",
  ".logic .ladder-element:not('.ote-template') > .ladder-element-bool > .circuit-element > .wire-left",
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
  ".logic .ladder-element:not('.ote-template') > .ladder-element-bool > .circuit-element > .wire-right",
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
          .children(".branch-rungs")
          .first()
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

// Move branch to the coil
$(document).on(
  "dragenter",
  ".logic > .rungs > .rung > .ote-template > .ladder-element-bool > .circuit-element > .wire-right",
  function (event) {
    if ($(dragged).hasClass("branch-template")) {
      $(this).css("outline", "2px dashed blue");
    }
  }
);

$(document).on(
  "dragleave",
  ".logic > .rungs > .rung > .ote-template > .ladder-element-bool > .circuit-element > .wire-right",
  function (event) {
    $(this).css("outline", "");
  }
);

$(document).on(
  "dragover",
  ".logic > .rungs > .rung > .ote-template > .ladder-element-bool > .circuit-element > .wire-right",
  function (event) {
    event.preventDefault();
  }
);

$(document).on(
  "drop",
  ".logic > .rungs > .rung > .ote-template > .ladder-element-bool > .circuit-element > .wire-right",
  function (event) {
    var cloned = dragged.cloneNode(true);
    if ($(cloned).hasClass("branch-template")) {
      $(this).parent().parent().parent().after(cloned);
    } 
    dragged = null;
    $(this).css("outline", "");
  }
);

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
    // console.log(jsonObject);

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
        $(rung).prepend(temp[0]);
        break;
      case "or":
        var temp = renderOr(json[key]);
        $(rung).prepend(temp[0]);
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
  var s = $("<div></div>");
  var h = 1;
  for (var i in json) {
    if (typeof json[i] === "string") {
      temp = $(xicTemplate);
      temp.find("input:text").attr("value", json[i]);
      s.append(temp);
    } else {
      for (var j in json[i]) {
        if (j === "not") {
          temp = $(xioTemplate);
          temp.find("input:text").attr("value", json[i][j]);
          s.append(temp);
        } else if (j === "or") {
          s1 = renderOr(json[i][j]);
          s.append(s1[0]);
          if (s1[1] > h) {
            h = s1[1];
          }
        }
      }
    }
  }
  return [s.html(), h];
}

function renderOr(json) {
  var s = $("<div></div>");
  var level = json.length;
  var h = 0;
  var branches = buildMultiBranch(level);
  s.append(branches);
  var rungs = [];
  for (var i in json) {
    rungs.push(s.find(".rung:eq(" + i + ") > .wire"));
  }
  for (var i in json) {
    var h1 = 1;

    if (typeof json[i] === "string") {
      temp = $(xicTemplate);
      temp.find("input:text").attr("value", json[i]);
      rungs[i].before(temp);
    } else {
      for (var j in json[i]) {
        if (j === "not") {
          temp = $(xioTemplate);
          temp.find("input:text").attr("value", json[i][j]);
          rungs[i].before(temp);
        } else if (j === "and") {
          s1 = renderAnd(json[i][j]);
          rungs[i].before(s1[0]);
          if (i < json.length - 1 && s1[1] > h1) {
            h1 = s1[1];
          }
        }
      }
    }
    h += h1;
  }
  s.children(".branch-logic:eq(0)")
    .children(".branch-vertical")
    .each(function (index, node) {
      $(node).height(58 * (h - 1));
    });
  return [s.html(), h];
}

function renderNot(json) {
  console.log(json);
}

// escalate the change of height of the branch vertical links

function escalateBranchVertical(element, expand) {
  var toExpand = true;
  $(element)
    .siblings(".branch-logic")
    .each(function (index, node) {
      if ($(node).data("level") >= 2) {
        toExpand = false;
      }
    });
  if (!toExpand) {
    return;
  }
  $(element)
    .parents(".branch-logic")
    .each(function (index, node) {
      var level = $(node).data("level");
      $(node)
        .siblings(".branch-logic")
        .each(function (index, node) {
          if ($(node).data("level") > level) {
            toExpand = false;
          }
        });
      if (toExpand) {
        $(node).data("level", level + 1);
        $(node)
          .children(".branch-vertical")
          .each(function (index, node) {
            height = $(node).height();
            $(node).height(height + expand);
          });
      } else {
        return;
      }
    });
}

function renderAssign(json) {
  console.log(json);
  var s = document.createElement("div");
  if (typeof json === "string") {
    temp = $(oteTemplate);
    temp.find("input:text").attr("value", json);
    $(s).append(temp);
  }
  return s.innerHTML;
}

function buildMultiBranch(level) {
  var s = $("<div></div>");
  if (level <= 2) {
    s.append(branchTemplate);
  } else {
    s.append(branchTemplate);
    s.find(".branch-logic").each(function (index, node) {
      // $(node).data("level", level);
      $(node).attr("data-level", level);
    });
    s.find(".branch-vertical").height(58 * (level - 1));
    for (var i = 2; i < level; i++) {
      s.find(".branch-rungs").append(
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
          "</div>"
      );
    }
  }
  return s.html();
}

//Serialize the ladder logic to json

function saveToJson() {
  var element = document.createElement("a");
  var json = {
    rung: [],
  };

  $(".rungs")
    .children(".rung")
    .each(function (index, node) {
      // json.rung.push(index);
      json.rung.push(rungToJson(index, node));
    });

  element.setAttribute(
    "href",
    "data:application/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(json))
  );
  element.setAttribute("download", "test.json");
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function rungToJson(index, rung) {
  var json = {}
  json['id'] = index;
  var num = $(rung).children('.ladder-element, .branch-logic').length;
  if (num >= 3) {
    // "and" be the first level
    json['and'] = [];
    $(rung).children('.ladder-element, .branch-logic').each(function(index, node) {
      if ($($(rung).children('.ladder-element, .branch-logic')[index]).hasClass("xic-template")) {
        var name = $($(rung).children('.ladder-element, .branch-logic')[index]).find("input").attr("value");
        json['and'].push(name);
      } else if ($($(rung).children('.ladder-element, .branch-logic')[index]).hasClass("xio-template")) {
        var name = $($(rung).children('.ladder-element, .branch-logic')[index]).find("input").attr("value");
        json['and'].push({"not": name});
      } else if (index != num - 1 && $($(rung).children('.ladder-element, .branch-logic')[index]).hasClass("branch-logic")) {
        var branches = $($(rung).children('.ladder-element, .branch-logic')[index]).children('.branch-rungs')[0];
        var branchesJson = verticalToJson(branches);
        json['and'].push(branchesJson);
      }
    });

    // json["="] = $($(rung).children('.ladder-element, .branch-logic')[num-1]).find("input").attr("value");
  } else if (num == 2) {
    if ($($(rung).children('.ladder-element, .branch-logic')[0]).hasClass("ladder-element")) {
      // "and" be the first level
      json['and'] = [];
      if ($($(rung).children('.ladder-element, .branch-logic')[0]).hasClass("xic-template")) {
        var name = $($(rung).children('.ladder-element, .branch-logic')[0]).find("input").attr("value");
        json['and'].push(name);
      } else if ($($(rung).children('.ladder-element, .branch-logic')[0]).hasClass("xio-template")) {
        var name = $($(rung).children('.ladder-element, .branch-logic')[0]).find("input").attr("value");
        json['and'].push({"not": name});
      }
    } else if ($($(rung).children('.ladder-element, .branch-logic')[0]).hasClass("branch-logic")) {
      // "or" be the first level
      var branches = $($(rung).children('.ladder-element, .branch-logic')[0]).children('.branch-rungs')[0];
      var branchesJson = verticalToJson(branches);
      $.extend(json, branchesJson);
    }

  } else if (num == 1) {

  } else {

  }

  if ($($(rung).children('.ladder-element, .branch-logic')[num-1]).hasClass('branch-logic')) {
    var branches = $($(rung).children('.ladder-element, .branch-logic')[num-1]).children('.branch-rungs')[0];
    var branchesJson = parallelCoilToJson(branches);
    $.extend(json, branchesJson);
  } else {
    json["="] = $($(rung).children('.ladder-element, .branch-logic')[num-1]).find("input").attr("value");
  }

  return json;
}

function verticalToJson(branches) {
  var json = {}
  json['or'] = [];
  $(branches).children('.rung').each(function(index, node) {
    if ($(node).children('.ladder-element, .branch-logic').length == 1) {
      if ($($(node).children('.ladder-element, .branch-logic')[0]).hasClass("xic-template")) {
        var name = $($(node).children('.ladder-element, .branch-logic')[0]).find("input").attr("value");
        json['or'].push(name);
      } else if ($($(node).children('.ladder-element, .branch-logic')[0]).hasClass("xio-template")) {
        var name = $($(node).children('.ladder-element, .branch-logic')[0]).find("input").attr("value");
        json['or'].push({'not': name});
      } 
    } else if ($(node).children('.ladder-element, .branch-logic').length > 1) {
      json['or'].push(horizontalToJson(node));
    } else {
      json['or'].push('true');
    }
  });
  return json;
}

function horizontalToJson(rung) {
  var json = {};
  json['and'] = [];
  $(rung).children('.ladder-element, .branch-logic').each(function(index, node) {
    if ($(node).hasClass("xic-template")) {
      var name = $(node).find("input").attr("value");
      json['and'].push(name);
    } else if ($(node).hasClass("xio-template")) {
      var name = $(node).find("input").attr("value");
      json['and'].push({'not': name});
    } else if ($(node).hasClass('branch-logic')) {
      json['and'].push(verticalToJson($(node).children('.branch-rungs')[0]));
    } 
  });
  return json;
}

function parallelCoilToJson(branches) {
  var json = {}
  json['='] = [];
  $(branches).children('.rung').each(function(index, node) {
    if ($(node).children('.ladder-element, .branch-logic').length == 1) {
      if ($($(node).children('.ladder-element, .branch-logic')[0]).hasClass("ote-template")) {
        var name = $($(node).children('.ladder-element, .branch-logic')[0]).find("input").attr("value");
        json['='].push(name);
      } 
    }
  });
  return json;  
}

function changeTagName(e) {
  $(e.target).attr('value', e.target.value);
}
