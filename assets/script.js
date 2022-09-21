//connects to open weather one call AP
var clicks = 0
var today = moment();

var apiKey = "f134c88b914b12f6422fd757a1b6307c"
var searchBar = document.querySelector("input")


function getCity (){
var city = $("input").val()
console.log(city)
var history = $("<card></card>").text(city)
$(".card").append(history);
}
$("#searchBtn").on("click", getCity) 
//     var userChoice =$(".input").val()
// //     var clickCount=$('#searchBtn').on('click', clicks++);
// //     console.log(userChoice)
// //     console.log(typeof"userChoice")
// //     console.log(city)
// //     console.log(clickCount)
// //    localStorage.setItem(clickCount, userChoice)
// function getCity (){
//     var city = $("input").val()
//     console.log(city)
//     // var history = $("<card></card>").text(city)
//     // $("aside").append(history);
//     // var card = $("card")
//     // if (card.style.display == "none") {
//     //     card.style.display == "block"
//     // }
//     }
//     $("#searchBtn").on("click", getCity) 
//     //     var userChoice =$(".input").val()
//     //     var clickCount=$('#searchBtn').on('click', clicks++);
//     //     console.log(userChoice)
//     //     console.log(typeof"userChoice")
    //     console.log(city)
    //     console.log(clickCount)
    //    localStorage.setItem(clickCount, userChoice)
    
    // }
// }
// )
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



// $(".saveBtn").on("click", function () {

//     var text = $(this).siblings("textarea").val()
//     var time = $(this).siblings("textarea").attr("id")
//     localStorage.setItem(time, text)
// }
// )



fetch(queryURL)



// //edit to have this resutlt
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

// //weather dashboad that contains form inputs
// //search function by city
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