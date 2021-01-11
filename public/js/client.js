let address = document.getElementById("location");
address.addEventListener("input", checkWeatherString)
let getBtn = document.getElementById("get-btn");
let reportId = document.getElementById("weatherReport");
let error = document.getElementById("error");
let errormessage = document.getElementById("error-message")

getBtn.addEventListener('click', getWeatherData);
var letters = /^[A-Za-z ]+$/;

function checkWeatherString(e) {
    console.log(e.target.value);
    if (e.target.value.length < 1) {
        errormessage.innerHTML =
            '<p>Please enter location to check weather!</p>'
    } else {
        errormessage.innerHTML = "";
    }
    if (e.target.value.length > 1) {
        if (!e.target.value.match(letters)) {
            errormessage.innerHTML =
                '<p>Please enter valid text!</p>'
        } else {
            errormessage.innerHTML = "";
        }
    }

}
//to get weather report based on location
function getWeatherData(e) {
    reportId.innerHTML = "";
    error.innerHTML = "";
    if (!address.value) {
        e.preventDefault();
        address.focus();
        errormessage.innerHTML =
            '<p>Please enter location to check weather</p>'
            // return alert("please enter a location");
    } else {
        if (address.value.match(letters)) {
            getBtn.innerHTML = 'Get Weather Report ' +
                '<i class="fa fa-spinner fa-spin" style="font-size:18px"></i>'
            fetch(`/weather?address=${address.value}`).then((response) => {
                response.json().then((data) => {
                    getBtn.innerHTML = "Get Weather Report";
                    if (data.error) {
                        console.log("error is " + data.error);
                        address.value = "";
                        error.classList.add('card')
                        error.innerHTML = '<div class="card-body">' +
                            "OOPS! " + data.error +
                            '</div>'

                    } else {
                        address.value = "";
                        let weatherClassName = "";
                        console.log(data);
                        weatherClassName = getWeatherClassName(data.forecast.weatherCode);
                        reportId.innerHTML =
                            '<h6>' + data.location + '</h6>' +
                            '<p id="temp">' + data.forecast.temp + '&#8451;</p>' +
                            '<div class="icon">' +
                            '<i class="wi ' + weatherClassName + '" aria-hidden="true"></i>' +
                            '</div>' +
                            '<p>' + data.forecast.desc + '</p>' +
                            '<p>' + data.forecast.localtime + '</p>' +
                            '<p>Pressure :' + data.forecast.pressure + ' &nbsp;&nbsp; wind :' + data.forecast.pressure + '</p>'
                    }
                });
            });
            weatherClassName = "";
        } else {
            errormessage.innerHTML =
                '<p>Please enter valid text!</p>'
                // alert("Location should not contain numbers and special characters!");
            address.value = "";
        }
    }
}
//to adding weather image dynamically
function getWeatherClassName(code) {
    switch (code) {
        case 119:
            return "wi-day-rain";
            break;
        case 122:
            return "wi-day-rain";
            break;
        case 176:
            return "wi-day-rain";
            break;
        case 230:
            return "wi-day-rain";
            break;
        case 284:
            return "wi-day-rain";
            break;
        case 113:
            return "wi-day-sunny"
            break;
        case 116:
            return "wi-night-partly-cloudy"
            break;
        case 119:
            return "wi-night-partly-cloudy"
            break;
        case 143:
            return "wi-sleet"
            break;
        case 182:
            return "wi-sleet"
            break;
        case 185:
            return "wi-sleet"
            break;
        case 200:
            return "wi-sleet"
            break;
        case 230:
            return "wi-sleet"
            break;
        case 263:
            return "wi-sleet"
            break;
        case 266:
            return "wi-sleet"
            break;
        case 293:
            return "wi-sleet"
            break;
        case 296:
            return "wi-sleet"
            break;
        case 299:
            return "wi-sleet"
            break;
        case 302:
            return "wi-sleet"
            break;
        case 311:
            return "wi-sleet"
            break;
        case 305:
            return "wi-day-thunderstorm"
            break;
        case 308:
            return "wi-day-thunderstorm"
            break;
        case 284:
            return "wi-day-thunderstorm"
            break;
        case 119:
            return "wi-sleet"
            break;
        case 389:
            return "wi-day-thunderstorm"
            break;
        case 386:
            return "wi-day-thunderstorm"
            break;
        case 179:
            return "wi-snow-wind"
            break;
        case 227:
            return "wi-snow-wind"
            break;
        case 248:
            return "wi-snow-wind"
            break;
        case 260:
            return "wi-snow-wind"
            break;
        case 392:
            return "wi-snow-wind"
            break;
        case 395:
            return "wi-snow-wind"
            break;
        case 280:
            return "wi-night-sleet-storm"
            break;
        case 284:
            return "wi-night-sleet-storm"
            break;
        default:
            return "wi-day-sunny"

    }

}