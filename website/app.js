// const { json } = require("stream/consumers");

/* Global Variables */
const apiKey = process.env.API_KEY;
const apiUrl = "http://api.openweathermap.org/data/2.5/weather";


/*Util variables*/
const queryStringChar = '?';

/*dom elements */
const tempDiv = document.querySelector("#temp");
const contentDiv = document.querySelector("#content");
const dateDiv = document.querySelector("#date");
const zipInput = document.querySelector("#zip");
const submitBtn = document.querySelector("#generate");
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


submitBtn.addEventListener("click", async e => {
    const zipCode = zipInput.value;
    await fetch(`${apiUrl}?zip=${zipCode}&appid=${apiKey}`)
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(e => console.log(e))
});

