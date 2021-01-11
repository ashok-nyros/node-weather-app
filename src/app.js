const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();
const port = process.env.PORT || 8080;

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

console.log(__dirname);
console.log(path.join(__dirname, "../public"));

// define path for public directory
const publicDirectory = path.join(__dirname, "../public");
console.log(publicDirectory);
const viewsPath = path.join(__dirname, "../templates/views");
console.log("view path is: " + viewsPath);
// set path for partials
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handle bars engine and view location
// set key and value after installing hbs
app.set("view engine", "hbs");
app.set("views", viewsPath);
// register partials
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectory));

// for rendering the index.hbs
app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        createdBy: "Ashok",
    });
});

// route for the weather page
app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "please provide address to search",
        });
    }
    geocode(
        req.query.address,
        (error, { lattitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error });
            }
            forecast(lattitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error });
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address,
                });
                console.log(forecastData);
            });
        }
    );
});

//Route to load about page
app.get("/about", (req, res) => {
    res.render("about", {
        title: "Weather App",
        createdBy: "Ashok",
    });
});

// generally setting 404 error using render()
app.get("*", (req, res) => {
    res.render("404", {
        title: "Weather App",
        errorMsg: "No page Found - 404 Error",
        createdBy: "Ashok",
    });
});

// to listen to the server
app.listen(port, () => {
    console.log("server is up and running in " + port);
});