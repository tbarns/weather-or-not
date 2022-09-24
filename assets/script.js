//connects to open weather one call AP
var today = moment();
var apiKey = "f134c88b914b12f6422fd757a1b6307c"
var searchBar = document.querySelector("input")
var city;

function getCity(city) {

    city = $("input").val()
    console.log(city)
    var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
    appendHistory(city)

    //connects to the API to get inforation about location searched 
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            var today = moment().format('L');
            var temp = data.main.temp
            var humidity = data.main.humidity
            var windSpeed = data.wind.speed
            var weatherIcon = data.weather[0].icon
            var iconUrl = `https://openweathermap.org/img/w/${weatherIcon}.png`
        console.log(iconUrl)
            // var uvIndex =
            var day1City = $("<p>").text(city)
            var day1Temp = $("<p>").text(temp)
            var day1Humidity = $("<p>").text(humidity)
            var day1Wind = $("<p>").text(windSpeed)
            var iconImage = $("<img>").attr({src:iconUrl})
            var lat = data.coord.lat
            var lon = data.coord.lon
            fiveDay(lat, lon)

            // var day1Wind =document.createElement("p")
            // day1Wind.textContent= day1WindSpeed

            $("#day1").append(day1City);
            $("#day1").append(day1Temp);
            $("#day1").append(day1Wind);
            $("#day1").append(day1Humidity);
            $("#day1").append(today)
            $("#day1").append(iconImage)

            console.log("city:" + city)
            console.log("temp:" + temp)
            console.log("humidity:" + humidity)
            console.log("Wind Speed:" + windSpeed)
            console.log("TOday :" + today)
        })
}
function appendHistory(city) {
    var history = $("<div>").text(city).addClass("card")
    $("#history").append(history);

}
function fiveDay(lat, lon) {
 var apiKey2 ="9463a2f89658134991482cc1e1033c49"
    fetch(`http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey2}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
        })

}

$("#searchBtn").on("click", getCity)




// displays time and date 
$("#currentDay").text(today.format("MMM Do, YYYY"));

// clearSearchBar()

// //need to clear the search bar after the user clicks search
// function clearSearchBar (){
//     $('input:text').focus(
//         function(){
//             $(this).val('');
//         });
// }



// // //weather dashboad that contains form inputs
// // //search function by city
// // HINT
// // Using the 5 Day Weather Forecast API, you'll notice that you will need to pass in coordinates instead of just a city name. Using the OpenWeatherMap APIs, how could we retrieve geographical coordinates given a city name?
// //presents city's current and future conditions
// //presents city's name date and an icon representing weather conditions, temp, humidity, wind speed and uv index
// //when viewong the UV index im presented with a color idicating either favorabel, moderate, or severe

// //furture: 5 day forecast displays date, an icon repping the weather conditions, temp, wind speed, and humidity


// //local storage that contains city serach history
// //when i click a city in history i am displayed current and future conditions


// // function historyBtnUpdater(){
// //     //this needs to fun a foreach everytime the search button is clicked the value of the inpit needs to be added to the text content of a new button and displayed below.  there needs to be a stop default aspect that allows the history buttins to persist.
// // }

// // $(".saveBtn").on("click", function () {

// //     var city = $(searchBox).siblings("input").val()
// //     //this is the data from weather API update when you understand this portion better
// //     var data = $(searchBox).siblings("input").val()
// //     localStorage.setItem(city, data)
// // })


// var searchBtn =document.getElementById(searchBtn)
// var userInput =document.querySelector("input")



// // var userFormEl = document.querySelector('#user-form');
// // var languageButtonsEl = document.querySelector('#language-buttons');
// // var nameInputEl = document.querySelector('#username');
// // var repoContainerEl = document.querySelector('#repos-container');
// // var repoSearchTerm = document.querySelector('#repo-search-term');

// // var formSubmitHandler = function (event) {
// //   event.preventDefault();

// //   var username = nameInputEl.value.trim();

// //   if (username) {
// //     getUserRepos(username);

// //     repoContainerEl.textContent = '';
// //     nameInputEl.value = '';
// //   } else {
// //     alert('Please enter a GitHub username');
// //   }
// // };