const request = require("request");

// create forecast
const forecast = (lattitude, longitude, callback) => {
    const url =
        "http://api.weatherstack.com/current?access_key=d4571b7d50cb1b9de7a13c72cd070a9e&query=" +
        lattitude +
        "," +
        longitude + ""
    console.log(url);
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to the service", undefined);
        } else if (body.error) {
            callback("unable to find location, try another search", undefined);
        } else {
            console.log(body)
            callback(undefined, {
                country: body.location.country,
                region: body.location.region,
                localtime: body.location.localtime,
                obsTime: body.current.observation_time,
                pressure: body.current.pressure,
                humidity: body.current.humidity,
                weatherCode: body.current.weather_code,
                cloudcover: body.current.cloudcover,
                temp: body.current.temperature,
                isDay: body.current.is_day,
                desc: body.current.weather_descriptions,
                chancesOfRain: body.current.precip
            });
        }
    });
};

module.exports = forecast;