//connects to open weather one call AP
var today = moment();
var apiKey = "f134c88b914b12f6422fd757a1b6307c"
var searchBar = document.querySelector("input")
var city;

function getCity(city) {
    city = $("input").val()

    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    appendHistory(city)

    //connects to the API to get inforation about location searched  byt the user
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data)

            var lon = data.coord.lon
            var lat = data.coord.lat
            fiveDay(lat, lon)

        })
}
function appendHistory(city) {
    var history = $("<div>").text(city).addClass("card")
    $("#history").append(history);

}
function fiveDay(lat, lon) {
    city = $("input").val()

    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
        .then(function (response) {
            return response.json();
        })
       
        .then(function (data) {

            // console.log(data)
            //this set of variabel displays the day of the week for the future forecasts
            var today = moment().format('dddd');
            var day2Day = moment().add(1, 'days').format('dddd');
            var day3Day = moment().add(2, 'days').format('dddd')
            var day4Day = moment().add(3, 'days').format('dddd')
            var day5Day = moment().add(4, 'days').format('dddd')

            var temp = data.list[0].main.temp
            var humidity = data.list[0].main.humidity
            var windSpeed = data.list[0].wind.speed
            var weatherIcon = data.list[0].weather[0].icon
            var iconUrl = `https://openweathermap.org/img/w/${weatherIcon}.png`


            var day1City = $("<p>").append("City: ", city)
            var day1Temp = $("<p>").append("Temp: ", temp, "°F")
            var day1Humidity = $("<p>").append("Humidity: ", humidity, "%")
            var day1Wind = $("<p>").append("Windspeed: ", windSpeed, "mph")
            var iconImage = $("<img>").attr({ src: iconUrl })
            $("#day1").empty()

            $("#day1").append(day1Temp);
            $("#day1").append(day1Wind);
            $("#day1").append(day1Humidity);
            $("#day1").append(today)
            $("#day1").prepend(iconImage)
            $("#day1").prepend(day1City);


            // var today = moment().format('dddd');
            //this handles day 2 of the furutre weather 
            //i know that this could be handled more efficiantly with a for loop, however the 2 reasons i am not doing that is 1: i need more practice understading JS and how it functions and 2: the for loop is something i understand but not well enough to impliment it for so many different variable so i want to avoid issues within the time constraints of the homework.


            var temp2 = data.list[8].main.temp
            var humidity2 = data.list[8].main.humidity
            var windSpeed2 = data.list[8].wind.speed
            var weatherIcon2 = data.list[8].weather[0].icon
            var iconUrl2 = `https://openweathermap.org/img/w/${weatherIcon2}.png`

            var day2City = $("<p>").append("City: ", city)
            var day2Temp = $("<p>").append("Temp: ", temp2, "°F")
            var day2Humidity = $("<p>").append("Humidity: ", humidity2, "%")
            var day2Wind = $("<p>").append("Windspeed: ", windSpeed2, "mph")
            var iconImage2 = $("<img>").attr({ src: iconUrl2 })

            $("#day2").empty()
            $("#day2").append(day2City);
            $("#day2").append(day2Temp);
            $("#day2").append(day2Wind);
            $("#day2").append(day2Humidity);
            $("#day2").append(day2Day)
            $("#day2").append(iconImage2)

            //this handles day 3 of the furutre weather 
            var temp3 = data.list[16].main.temp
            var humidity3 = data.list[16].main.humidity
            var windSpeed3 = data.list[16].wind.speed
            var weatherIcon3 = data.list[16].weather[0].icon
            var iconUrl3 = `https://openweathermap.org/img/w/${weatherIcon3}.png`

            var day3City = $("<p>").append("City: ", city)
            var day3Temp = $("<p>").append("Temp: ", temp3, "°F")
            var day3Humidity = $("<p>").append("Humidity: ", humidity3, "%")
            var day3Wind = $("<p>").append("Windspeed: ", windSpeed3, "mph")
            var iconImage3 = $("<img>").attr({ src: iconUrl3 })

            $("#day3").empty()
            $("#day3").append(day3City);
            $("#day3").append(day3Temp);
            $("#day3").append(day3Wind);
            $("#day3").append(day3Humidity);
            $("#day3").append(day3Day)
            $("#day3").append(iconImage3)

            //this handles day 4 of the furutre weather 
            var temp4 = data.list[24].main.temp
            var humidity4 = data.list[24].main.humidity
            var windSpeed4 = data.list[24].wind.speed
            var weatherIcon4 = data.list[24].weather[0].icon
            var iconUrl4 = `https://openweathermap.org/img/w/${weatherIcon4}.png`

            var day4City = $("<p>").append("City: ", city)
            var day4Temp = $("<p>").append("Temp: ", temp4, "°F")
            var day4Humidity = $("<p>").append("Humidity: ", humidity4, "%")
            var day4Wind = $("<p>").append("Windspeed: ", windSpeed4, "mph")
            var iconImage4 = $("<img>").attr({ src: iconUrl4 })

            $("#day4").empty()
            $("#day4").append(day4City);
            $("#day4").append(day4Temp);
            $("#day4").append(day4Wind);
            $("#day4").append(day4Humidity);
            $("#day4").append(day4Day)
            $("#day4").append(iconImage4)


            //this handles day 5 of the furutre weather 
            var temp5 = data.list[32].main.temp
            var humidity5 = data.list[32].main.humidity
            var windSpeed5 = data.list[32].wind.speed
            var weatherIcon5 = data.list[32].weather[0].icon
            var iconUrl5 = `https://openweathermap.org/img/w/${weatherIcon5}.png`

            var day5City = $("<p>").append("City: ", city)
            var day5Temp = $("<p>").append("Temp: ", temp5, "°F")
            var day5Humidity = $("<p>").append("Humidity: ", humidity5, "%")
            var day5Wind = $("<p>").append("Windspeed: ", windSpeed5, "mph")
            var iconImage5 = $("<img>").attr({ src: iconUrl5 })

            $("#day5").empty()
            $("#day5").append(day5City);
            $("#day5").append(day5Temp);
            $("#day5").append(day5Wind);
            $("#day5").append(day5Humidity);
            $("#day5").append(day5Day)
            $("#day5").append(iconImage5)

        })
}

$("#searchBtn").on("click", getCity)


var title = $("<p>").text("5-day weather forecast")

// displays and date 
$("#currentDay").text(today.format("dddd, MMM Do, YYYY"));
$("#currentDay").append(title)



// //local storage that contains city serach history
// //when i click a city in history i am displayed current and future conditions
//i know that local storage here is complicated because my function is so repetaive.  I need to figure out how to save the data from the function into local storage and how to make the history cards an event to trick the retrieval of the localstorage.
