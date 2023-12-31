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
var currWeather = function(cityName) {
    fetch('api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}')

    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        var cityLon = response.coord.lon;
        var cityLat = response.coord.lat;

        fetch('api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}')

            .then(function(response) {
                return response.json();
            })

        .then(function(response){
            searchHistoryList(cityName);

            var currWeatherContainer = $("#current-weather-container");
            currWeatherContainer.addClass("current-weather-container");

            var currentTitle = $("#current-title");
                    var currentDay = moment().format("M/D/YYYY");
                    currentTitle.text(`${cityName} (${currentDay})`);
                    var currentIcon = $("#current-weather-icon");
                    currentIcon.addClass("current-weather-icon");
                    var currentIconCode = response.current.weather[0].icon;
                    currentIcon.attr("src", `https://openweathermap.org/img/wn/${currentIconCode}@2x.png`);

                    var currentTemperature = $("#current-temperature");
                    currentTemperature.text("Temperature: " + response.current.temp + " \u00B0F");

                    var currentHumidity = $("#current-humidity");
                    currentHumidity.text("Humidity: " + response.current.humidity + "%");

                    var currentWindSpeed = $("#current-wind-speed");
                    currentWindSpeed.text("Wind Speed: " + response.current.wind_speed + " MPH");
                })
            })
// Give error if input by user is invalid
            .catch(function(err) {
                $("#search-input").val("");
    
                alert("Please enter a city name.");
            });
        };

    // The 5 day forecast is displayed with
        // city name
        // date
        // humidiity
        // temperature
        // wind speed
        // current weather icon

$("#search-form").on("submit", function() {
    event.preventDefault();
    
    var cityName = $("#search-input").val();

    if (cityName === "" || cityName == null) {
        alert("Please enter the name of city.");
        event.preventDefault();
    } else {
        currWeather(cityName);
        fiveDayForecast(cityName);
    }
});

$("#search-history-container").on("click", "p", function() {
    var previousCityName = $(this).text();
    currWeather(previousCityName);
    fiveDayForecast(previousCityName);

    var previousCityClicked = $(this);
    previousCityClicked.remove();
});

loadSearchHistory();