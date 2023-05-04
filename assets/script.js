const apiKey = "f134c88b914b12f6422fd757a1b6307c";
let city;

const capitalizeWords = str => {
    return str.replace(/\w\S*/g, word => {
        return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    });
};

const getCity = () => {
    city = capitalizeWords($("input").val());
    const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    updateLocalStorage(city);
    console.log('click')
    fetch(queryURL)
        .then(response => response.json())
        .then(data => {
            const { lon, lat } = data.coord;
            fiveDay(lat, lon);
        });
};

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
    console.log('clearedHistory')
};

$("#clearBtn").on("click", clearHistory);

const fiveDay = (lat, lon) => {
    city = $("input").val();
console.log("fivedayfunction")
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

                const dayCity = $("<p>").append(`${day} in ${city}`);
                const dayTemp = $("<p>").append(`Temp: ${temp} °F`);
                const dayHumidity = $("<p>").append(`Humidity: ${humidity}%`);
                const dayWind = $("<p>").append(`Windspeed: ${windSpeed} mph`);
                const iconImage = $("<img>").attr("src", iconUrl);

                $(`#day${index + 1}`).empty();
                $(`#day${index + 1}`).append(dayCity, dayTemp, dayWind, dayHumidity, iconImage);
            });
        });
};

$("#searchBtn").on("click", (event) => {
    console.log('searchClick')
    event.preventDefault();
    getCity();
});

$("#currentDay").text(moment().format("dddd, MMM Do, YYYY"));
$("#currentDay").append($("<p>").text("5-day weather forecast"));



// Function to render the history cards based on the current page
const renderHistory = currentPage => {
    const itemsPerPage = 5;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const storedHistory = JSON.parse(localStorage.getItem("history")) || [];
    console.log('renderHistory')
    // Clear the history section
    $("#history").empty();

    // Add the input, search button, and clear button back to the history section
    const input = $('<input>').addClass('col-md-10').attr('placeholder', 'Type your next location here');
    const searchBtn = $('<button>').addClass('col-md-10').attr('id', 'searchBtn').text('SEARCH');
    const clearBtn = $('<button>').addClass('col-md-10').attr('id', 'clearBtn').text('CLEAR HISTORY');
    $("#history").append(input, '<br><br>', searchBtn, '<br>', clearBtn);

    $("#searchBtn").on("click", (event) => {
        console.log('searchClick');
        event.preventDefault();
        getCity();
    });

    $("#clearBtn").on("click", clearHistory);


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