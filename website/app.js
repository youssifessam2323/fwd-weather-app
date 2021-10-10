
const serverUrl = "http://localhost:8000";
const apiKey = "&appid=04a35fc35c5c08c17b53830c5b582769&units=imperial";
const apiUrl = "http://api.openweathermap.org/data/2.5/weather";


/*dom elements */
const tempDiv = document.querySelector("#temp");
const contentDiv = document.querySelector("#content");
const dateDiv = document.querySelector("#date");
const zipInput = document.querySelector("#zip");
const submitBtn = document.querySelector("#generate");
const feelingInput = document.querySelector("#feelings");
const feelingError = document.querySelector("#feeling-error");


const getDataByZibCode = async (zipcode) => {
    // console.log("KEY IS = " + apiKey);
    return await fetch(`${apiUrl}?zip=${zipcode}${apiKey}`)
        .then(res => {

            if (res.status == 404)
                alert("Enter a valid Zipcode");

            else
                return res.json();
        });
}

const getDataFromServer = async () => {
    return await fetch("http://localhost:8000/api/data")
        .then(res => res.json())
}

const updateTheUI = ({ feeling, temp, date }) => {
    tempDiv.textContent = "Temp: " + temp;
    contentDiv.textContent = "last feeling: " + feeling;
    dateDiv.textContent = "Date: " + date;
}

const loadLastDataAndUpdateUI = async () => {

    const reqToServer = await getDataFromServer();
    console.log("the object return for the server is " + JSON.stringify(reqToServer));

    if (!(Object.keys(reqToServer).length === 0)) {
        updateTheUI(reqToServer);
    }
}

const getValues = (dataComeFromAPI) => {
    const date = new Date();

    const { temp } = dataComeFromAPI.main;
    const feeling = feelingInput.value;

    return { temp, feeling, date };
}


const asyncAlertToUser = async message => {
    alert(message);
}

const isFeelingEmpty = () => {
    if (feelingInput.value === "") {
        feelingError.removeAttribute("hidden")
        return true;
    } else {
        feelingError.setAttribute("hidden", "true");

    }
}


loadLastDataAndUpdateUI();

submitBtn.addEventListener("click", async e => {

    //handling of the feel input is empty
    if (isFeelingEmpty()) {
        return;
    };

    console.log(zipInput.value);
    await getDataByZibCode(zipInput.value)
        .then(async data => {
            if (data == undefined) {
                return;
            }
            console.log("Data after weather API call is " + JSON.stringify(data));

            const {date, temp, feeling } = getValues(data);
            
           await fetch("http://localhost:8000/api/data", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(getValues(data))
            })
                .then(res => res.json())
                .then(res => {
                    console.log("response come from the server is " + JSON.stringify(res));
                    updateTheUI({
                        temp: temp,
                        date: date,
                        feeling: feeling
                    });
                });




        });
});










