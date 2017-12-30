var xmlHttpRequest = new XMLHttpRequest();
var searchBox = document.getElementById("searchBox");
var suggestions = document.getElementById("suggestions");

searchBox.addEventListener("keyup", onKeyUp);

function clearSuggestions() {
    suggestions.innerHTML = "";     // clearing the suggestion list...
}

function onKeyUp() {
    if (searchBox.value.length == 0) {
        clearSuggestions();
    }
    else {
        xmlHttpRequest.open("GET", "resources/scripts/php/suggest.php?query=" + searchBox.value);
        xmlHttpRequest.onload = onLoad;
        xmlHttpRequest.send();
    }
}

function onLoad() {
    clearSuggestions();

    var data = xmlHttpRequest.responseText;
    var splittedCountryNames = data.split("-");     // splitting received data on character '-'...

    for (var i = 0; i < splittedCountryNames.length; i++) {
        suggestions.insertAdjacentHTML("beforeend", "<p>" + splittedCountryNames[i] + "</p>");
    }

    if (splittedCountryNames.length == 1) {
        suggestions.insertAdjacentHTML("beforeend", "<p>No results found.</p>");
    }
}