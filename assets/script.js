const apiKey = "f134c88b914b12f6422fd757a1b6307c";
let city;

const capitalizeWords = (str) => {
    if (!str) return ""; // Add this line to handle undefined or null values

    return str.replace(/\w\S*/g, (word) => {
        return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
       
    });
    
};


const getCity = () => {

    city = capitalizeWords($("#input").val() || $("#input-mobile").val());
   
    if (!city) {
        $("#error-message").removeClass("d-none"); // Show the error message
        return;
    } else {
        $("#error-message").addClass("d-none"); // Hide the error message
    }
    city = capitalizeWords(city);
    const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    updateLocalStorage(city);

    fetch(queryURL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const { lon, lat } = data.coord;
            fiveDay(lat, lon, city);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert("Error fetching data: " + error);
        });
    console.log('city')
};

$(document).ready(function() {
    document.getElementById("searchBtn").addEventListener("click", getCity);
    document.getElementById("searchBtn-mobile").addEventListener("click", getCity);
});

const appendHistory = city => {
    const history = $("<div>").text(city).addClass("card");
    $("#history").append(history);
};

const updateLocalStorage = city => {
    const storedHistory = JSON.parse(localStorage.getItem("history")) || [];
    if (storedHistory.indexOf(city) === -1) {
        storedHistory.push(city);
        localStorage.setItem("history", JSON.stringify(storedHistory));
        renderHistory(1);
    }
};

const clearHistory = () => {
    localStorage.removeItem("history");
    renderHistory(1);
};

$("#clearBtn").on("click", clearHistory);

const fiveDay = (lat, lon, city) => {
    fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
    )
        .then(response => response.json())
        .then(data => {
            const days = [
                "Today",
                "Tomorrow",
                moment().add(2, "days").format("dddd"),
                moment().add(3, "days").format("dddd"),
                moment().add(4, "days").format("dddd")
            ];
            days.forEach((day, index) => {
                const temp = data.list[index * 8].main.temp;
                const humidity = data.list[index * 8].main.humidity;
                const windSpeed = data.list[index * 8].wind.speed;
                const weatherIcon = data.list[index * 8].weather[0].icon;
                const iconUrl = `https://openweathermap.org/img/w/${weatherIcon}.png`;
                const cityName = $("<div>").addClass("city-name").text(city);
                const dayCity = $("<p>").append(`${day} in ${city}`);
                const dayTemp = $("<p>").append(`Temp: ${temp} °F`);
                const dayHumidity = $("<p>").append(`Humidity: ${humidity}%`);
                const dayWind = $("<p>").append(`Windspeed: ${windSpeed} mph`);
                const iconImage = $("<img>").attr("src", iconUrl);

                $(`#day${index + 1}`).empty();
                $(`#day${index + 1}`).append(cityName, dayCity, dayTemp, dayWind, dayHumidity, iconImage);

            });
        });
};
$(".history-btn").on("click", function () {
    $("#history-mobile").toggleClass("show");
});

$("#history").on("click", "#clearBtn", clearHistory);

$("#currentDay").text(moment().format("dddd, MMM Do, YYYY"));
$("#currentDay").append($("<p>").text("5-day weather forecast"));


const appendHistoryMobile = (city) => {
    const history = $("<div>").text(city).addClass("card");
    $("#history-mobile .card-container").append(history);
};

$("#history-pagination").on("click", ".page-link", function (event) {
    event.preventDefault();
    const currentPage = parseInt($(this).text());
    renderHistory(currentPage);
});


// Function to render the history cards based on the current page
const renderHistory = currentPage => {
    const itemsPerPage = 5;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const storedHistory = JSON.parse(localStorage.getItem("history")) || [];
    // Clear the history section
    $("#history").empty();
    $("#history-mobile .card-container").empty();
    // Render the history-mobile cards
    storedHistory.slice(startIndex, endIndex).forEach(appendHistoryMobile);
    // Add the input, search button, and clear button back to the history section
    const input = $('<input>').addClass('col-md-10').attr('placeholder', 'where?').attr('id', 'input');
    const searchBtn = $('<button>').addClass('col-md-10').attr('id', 'searchBtn').text('SEARCH');
    const clearBtn = $('<button>').addClass('col-md-10').attr('id', 'clearBtn').text('CLEAR HISTORY');
    $("#history").append(input, '<br><br>', searchBtn, '<br>', clearBtn);



    // Add history cards for the current page
    storedHistory.slice(startIndex, endIndex).forEach(city => appendHistory(city));



    // Render the pagination
    const totalPages = Math.ceil(storedHistory.length / itemsPerPage);
    const pagination = $('<nav>').attr('aria-label', 'History pagination');
    const paginationUl = $('<ul>').addClass('pagination');
    for (let i = 1; i <= totalPages; i++) {
        const paginationLi = $('<li>').addClass('page-item').toggleClass('active', i === currentPage);
        const paginationLink = $('<a>').addClass('page-link').attr('href', '#').text(i);
        paginationLi.append(paginationLink);
        paginationUl.append(paginationLi);
    }
    pagination.append(paginationUl);
    $("#history").append(pagination);
    $("#history").on("click", ".page-link", function (event) {
        event.preventDefault();
        pagination.attr('id', 'history-pagination');
        const newPage = parseInt($(this).text());
        renderHistory(newPage);
    });
};

// Call renderHistory on page load
renderHistory(1);

$("#history").on("click", ".card", function () {
    const city = capitalizeWords($(this).text());
    $("input").val(city);
    getCity();
});

$(window).on('resize', () => {
    const isMobile = window.matchMedia('screen and (max-width: 576px)').matches;

    if (isMobile) {
        $('#history').hide();
        $('#history-mobile').addClass('show');
        renderMobileHistory();
    } else {
        $('#history').show();
        $('#history-mobile').removeClass('show');
    }
});

const renderMobileHistory = (currentPage = 1) => {
    const itemsPerPage = 5;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const storedHistory = JSON.parse(localStorage.getItem("history")) || [];
    const historyContainer = $("<div>").addClass("card-container");
    const input = $('<input>').addClass('col-md-10').attr('placeholder', 'where?').attr('id', 'input-mobile');
    const searchBtn = $('<button>').addClass('col-md-10').attr('id', 'searchBtn-mobile').text('SEARCH');
    const clearBtn = $('<button>').addClass('col-md-10').attr('id', 'clearBtn-mobile').text('CLEAR HISTORY');
    $("#history-mobile").empty().append(input, '<br><br>', searchBtn, '<br>', clearBtn);

    storedHistory.slice(startIndex, endIndex).forEach(city => {
        const historyCard = $("<div>").addClass("card").text(city);
        historyCard.on("click", () => {
            $("#input-mobile").val(city);
            getCity();
        });
        historyContainer.append(historyCard);
    });
    $("#history-mobile").append(historyContainer);

    // Render the pagination for mobile view
    const totalPages = Math.ceil(storedHistory.length / itemsPerPage);
    const pagination = $('<nav>').attr('aria-label', 'History pagination');
    const paginationUl = $('<ul>').addClass('pagination');
    for (let i = 1; i <= totalPages; i++) {
        const paginationLi = $('<li>').addClass('page-item').toggleClass('active', i === currentPage);
        const paginationLink = $('<a>').addClass('page-link').attr('href', '#').text(i);
        paginationLi.append(paginationLink);
        paginationUl.append(paginationLi);
    }
    pagination.append(paginationUl);
    $("#history-mobile").append(pagination);
    $("#history-mobile").on("click", ".page-link", function (event) {
        event.preventDefault();
        const newPage = parseInt($(this).text());
        renderMobileHistory(newPage);
    });
};


$("#clearBtn-mobile").on("click", clearHistory);


const checkForMobile = () => {
    const isMobile = window.matchMedia("screen and (max-width: 576px)").matches;

    if (isMobile) {
        $("#history").hide();
        $("#history-mobile").addClass("show");
        renderMobileHistory();
    } else {
        $("#history").show();
        $("#history-mobile").removeClass("show");
    }
};

// Call checkForMobile on page load
checkForMobile();

// Call checkForMobile on window resize
$(window).on("resize", checkForMobile);


//prevents input field from losing focus on mobile devices
$(document).on("touchmove", function () {
    document.activeElement.blur();
});
