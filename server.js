const express = require("express");
const app = express();
const axios = require("axios");
var config = require("config.json")("./config.json");

app.use(express.json());
app.use(express.static("public"));

app.post("/weather", (req, res) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${req.body.latitude}&lon=${req.body.longitude}&appid=${config.OWM_API_KEY}&units=imperial`;

  axios({
    url: url,
    responseType: "json",
  }).then((data) => res.json(data.data));
});

//Handle 404 erorrs
app.use(function (req, res, next) {
  res.status(404).sendFile("404.html", { root: "./public/" });
});

app.listen(process.env.PORT || config.port, () => {
  console.log("running");
});
