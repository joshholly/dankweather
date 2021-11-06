# dankweather
Dank Weather is a very simple weather web app that uses nodeJS to use do an API call to OpenWeatherMap, Google Maps API using Places, Maps, and Geocode. 

This weather app allows you to get a user's weather based on their current location (if permission is granted to the website), or they can specify a location. The Google Maps / Places / Geocode allows gets longitude or latitude from user's location, or from user input. It is then sent to the OpenWeatherMap API to display the weather.

**Prerequisites:**
- NodeJS
- Google API key with Maps Javascript API, Places API, and Geocode API
- OpenWeatherMap API Key

## Configuring your app ##
Rename config.json.sample to config.json

### Your config.json file should look like the following: ###
```json
{
    "port": "3000",
    "OWM_API_KEY": "YOUR_OPENWEATHERMAP_API_KEY_HERE"
}
```
Replace "3000" with the port you wish to run on. 
The port you set will be the port it will use unless a port is specified with an ENV (services such as heroku defaults it to 80/443, and that usually cannot be changed)

### Edit public/index.html ###

Edit your index.html and plug your Google API into the Google Maps API script link.

Google Maps javascript code in your index.html file looks like the following:

```
  <script
      defer
      src="//maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_API_KEY&libraries=places"
    ></script>
```
Replace "YOUR_GOOGLE_API" key with your Google API key.

### To Do List ###
- Get 3-5+ day forecast
- Display more weather information such as precipitation likihood
- Get hourly forecast

### Feel free to fork this repo and make any changes or add cool features! I'd love to see what you guys can do!

