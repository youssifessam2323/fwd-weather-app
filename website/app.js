
const serverUrl = "http://localhost:8000"


/*dom elements */
const tempDiv = document.querySelector("#temp");
const contentDiv = document.querySelector("#content");
const dateDiv = document.querySelector("#date");
const zipInput = document.querySelector("#zip");
const submitBtn = document.querySelector("#generate");
const feelingInput = document.querySelector("#feelings");
const feelingError = document.querySelector("#feeling-error");
let d = new Date();



submitBtn.addEventListener("click", async e => {

    //handling of the feel input is empty
    handleTheEmptyFieldCase();

    let userData = {
        feeling : feelingInput.value,
        zipcode : zipInput.value,
    };

    await fetch(`${serverUrl}/api/weather?zib=${userData.zipcode}`)
            .then(res => res.json())
            .then(async data => {

                let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
                
                if(data.cod =="404"){
                   asyncAlertToUser(data.message);
                }
                userData = {...userData,
                     temp:data.main.temp,
                     date:newDate
                     }
                
                updateTheUI(userData);


                await fetch(`${serverUrl}/api/data`,{
                    method:'POST',
                    body: userData
                }).then(res => res.text())
                .then(d => console.log(d))

            }).catch(e =>  console.log(e));
        })


const updateTheUI = ({feeling,temp,date}) => { 
    tempDiv.textContent = temp;
    contentDiv.textContent = feeling;
    dateDiv.textContent = date
}


const asyncAlertToUser = async message => {
    alert(message);
}

const handleTheEmptyFieldCase = () => {
    if(feelingInput.value === ""){
        feelingError.removeAttribute("hidden")
        return;        
    }else { 
        feelingError.setAttribute("hidden","true");

    }
}