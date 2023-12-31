// Global Variables
var apiKey = 'b67c7c3b23f4622d3fc413765b9c99ec';
var searches = [];

// When a user searches a city
    // It is stored underneath the search bar
var cityHistoryList = function(cityName) {
    $('.past-search:contains("' + cityName + '")').remove();

    var cityHistoryEntry = $("<p>");
    cityHistoryEntry.addClass("past-search");
    cityHistoryEntry.text(cityName);

    var cityEntryContainer = $("<div>");
    cityEntryContainer.addClass("past-search-container");

    cityEntryContainer.append(cityHistoryEntry);

    var cityHistoryContainerEl = $("#search-history-container");
    cityHistoryContainerEl.append(cityEntryContainer);

    if (savedSearches.length > 0){
        var previousSavedSearches = localStorage.getItem("savedSearches");
        savedSearches = JSON.parse(previousSavedSearches);
    }

    savedSearches.push(cityName);
    localStorage.setItem("savedSearches", JSON.stringify(savedSearches));

    $("#search-input").val("");

};
// Cities previously searched show up underneath the search bar.
var loadSearchHistory = function() {
    var savedSearchHistory = localStorage.getItem("savedSearches");

    if (!savedSearchHistory) {
        return false;
    }

    savedSearchHistory = JSON.parse(savedSearchHistory);

    for (var i = 0; i < savedSearchHistory.length; i++) {
        searchHistoryList(savedSearchHistory[i]);
    }
};
    // The current forecast is displayed with
        // date
        // city name
        // humidiity
        // temperature
        // wind speed
        // current weather icon
    // The 5 day forecast is displayed with
        // city name
        // date
        // humidiity
        // temperature
        // wind speed
        // current weather icon

