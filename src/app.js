const express = require("express");
const path = require("path");
const hbs = require("hbs");
const { geocode, forecast } = require("./utils/geo");
const app = express();

//define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//define handlebar and view location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//define the static direcoty
app.use(express.static(publicDirectoryPath));

//page index
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Ahmad balbissi",
  });
});

//page about
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Ahmad balbissi",
  });
});

//page help
app.get("/help", (req, res) => {
  res.render("help", {
    title: "We will help you",
    helpText: "This is some helpful text.",
  });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (forecastData,error) => {
            if (error) {
                return res.send({error} )
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Ahmad balbissi",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Ahmad balbissi",
    errorMessage: "Page not found.",
  });
});

app.listen(3000, () => {
  console.log("the server is running on port 3000");
});
