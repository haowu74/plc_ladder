var jsonObject;

function loadFileAsJson() {
    var fileToLoad = document.getElementById("json_file").files[0];

    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent){
        var textFromFileLoaded = fileLoadedEvent.target.result;
        jsonObject = JSON.parse(textFromFileLoaded)
        console.log(jsonObject);
    };
  
    fileReader.readAsText(fileToLoad, "UTF-8");
}

function readFromJson() {

}

function saveToJson() {

}

$.ready(function() {
    
});

