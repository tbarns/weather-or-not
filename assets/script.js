//connects to open weather one call API

var today = moment();
var searchBox = $(aside)


// displays time and date 
$("#currentDay").text(today.format("MMM Do, YYYY"));

//weather dashboad that contains form inputs
//search function by city
// HINT
// Using the 5 Day Weather Forecast API, you'll notice that you will need to pass in coordinates instead of just a city name. Using the OpenWeatherMap APIs, how could we retrieve geographical coordinates given a city name?
//presents city's current and future conditions
//presents city's name date and an icon representing weather conditions, temp, humidity, wind speed and uv index
//when viewong the UV index im presented with a color idicating either favorabel, moderate, or severe

//furture: 5 day forecast displays date, an icon repping the weather conditions, temp, wind speed, and humidity


//local storage that contains city serach history
//when i click a city in history i am displayed current and future conditions


function historyBtnUpdater(){
    //this needs to fun a foreach everytime the search button is clicked the value of the inpit needs to be added to the text content of a new button and displayed below.  there needs to be a stop default aspect that allows the history buttins to persist.
}

$(".saveBtn").on("click", function () {

    var city = $(searchBox).siblings("input").val()
    //this is the data from weather API update when you understand this portion better
    var data = $(searchBox).siblings("input").val()
    localStorage.setItem(city, data)
})
