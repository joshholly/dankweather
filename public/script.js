//City Searchbox & event listener
const searchElement = document.querySelector("[data-city-search]");
const searchBox = new google.maps.places.SearchBox(searchElement);
searchBox.addListener("places_changed", () => {
  const place = searchBox.getPlaces()[0];
  if (place == null) return;
  const latitude = place.geometry.location.lat();
  const longitude = place.geometry.location.lng();
  fetch("/weather", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      latitude: latitude,
      longitude: longitude,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      setWeatherData(data, place.formatted_address);
    });
});

//Try and grab user's current location
var options = {
  enableHighAccuracy: true,
  timeout: 9999999999,
  maximumAge: 0,
};
navigator.geolocation.getCurrentPosition(grabLocation, onError, options);

//Set element variables
const locationElement = document.querySelector("[data-location]");
const statusElement = document.querySelector("[data-status]");
const temperatureElement = document.querySelector("[data-temperature]");
const feelslikeElement = document.querySelector("[data-feelslike]");
const windElement = document.querySelector("[data-wind]");
const iconElement = document.querySelector(["[data-icon"]);

//Function to set the Weather Data on main page
function setWeatherData(data, place) {
  locationElement.textContent = place;
  statusElement.textContent = titleCase(data.weather[0].description);
  temperatureElement.textContent = Math.round(data.main.temp) + "° F";
  feelslikeElement.textContent = Math.round(data.main.feels_like) + "°  F";
  windElement.textContent = Math.round(data.wind.speed) + " MPH";
  iconElement.innerHTML =
    '<img src="https://openweathermap.org/img/wn/' +
    data.weather[0].icon +
    '@2x.png">';
}

//Function to capitalize as a title - for weather summary
function titleCase(str) {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(" ");
}

//Function to try and grab weaether using the user's current location
function grabLocation(pos) {
  var crd = pos.coords;
  getReverseGeocodingData(crd.latitude, crd.longitude);

  fetch("/weather", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      latitude: crd.latitude,
      longitude: crd.longitude,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      setWeatherData(data);
      console.log(crd.latitude);
      console.log(crd.longitude);
      getReverseGeocodingData(crd.latitude, crd.longitude);
    });
}

//Function to get address from user's current location
function getReverseGeocodingData(lat, lng) {

  var latlng = new google.maps.LatLng(lat, lng);
  // This is making the Geocode request
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode(
    {
      latLng: latlng,
    },
    function (results, status) {
      // This is checking to see if the Geoeode Status is OK before proceeding
      if (status == google.maps.GeocoderStatus.OK) {
        locationElement.textContent = results[6].formatted_address;
        //searchElement.value = results[7].formatted_address;
      }
    }
  );
}

//Function to handle error incase grabbing user's location fails
function onError(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}
