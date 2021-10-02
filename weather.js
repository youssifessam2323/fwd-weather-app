const fetch = require('node-fetch');
const dotenv = require('dotenv');

dotenv.config();

const apiUrl = "http://api.openweathermap.org/data/2.5/weather";
const apiKey = process.env.WEATHER_API_KEY;


module.exports.requestWeatherByZipcode = async (zipcode) => { 
    // console.log("KEY IS = " + apiKey);
    var result;
    const res = await fetch(`${apiUrl}?zip=${zipcode}&appid=${apiKey}`)
   .then(res => res.json())
   .then(data => {
       console.log(data);
        result = data;

   })
   console.log(result);

   return result
}


