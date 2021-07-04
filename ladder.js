var jsonObject;

var dragged;

const x = ['X0', 'X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7', 'X8', 'X9'];
const y = ['Y0', 'Y1', 'Y2', 'Y3', 'Y4', 'Y5'];
const m = ['M0', 'M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9'];

const rungTemplate =    '<div class="rung" draggable="true">' +
                            '<div class="short-wire">' +
                                '<div class="wire-visible"></div>' +
                            '</div>' +
                            '<div class="wire">' +
                                '<div class="wire-visible"></div>' +
                            '</div>' +
                            '<div class="short-wire">' +
                                '<div class="wire-visible"></div>' +
                            '</div>' +
                        '</div>';

const xicTemplate = 

async function readFromJson() {
    $("#json_file").trigger("click");
    do {
        var fileToLoad = document.getElementById("json_file").files[0];
        // console.log(fileToLoad);
        await new Promise(resolve => setTimeout(resolve, 1000));
    } while(fileToLoad === undefined)

    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent){
        var textFromFileLoaded = fileLoadedEvent.target.result;
        jsonObject = JSON.parse(textFromFileLoaded)
        console.log(jsonObject);
    };
  
    fileReader.readAsText(fileToLoad, "UTF-8");
}

function saveToJson() {

}

function addRung() {
    $(".rungs").append(rungTemplate);
}

$(document).on("dragstart", "div[draggable=true]", function(event) {
    dragged = event.target;
});

$(".trash").on("dragenter", function(event) {
    $(this).css("outline", "2px dashed blue");
});

$(".trash").on("dragleave", function(event) {
    $(this).css("outline", "2px dashed #5c5c5c");
});

$(".trash").on("dragover", function(event) {
    event.preventDefault();
});

$(".trash").on("drop", function(event) {
    console.log(event);
    dragged.remove();
    dragged = null;
});

$.ready(function() {

});

