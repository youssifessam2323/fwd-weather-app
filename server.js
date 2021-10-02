let projectData = {};


const PORT = 8000;
const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();


/* Including my weather api client js file */
const weatherApi = require('./weather');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cors());

app.use(express.static('website'));



app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
})


app.get('/api/data', (req,res) => {
    res.send(projectData);
});

app.post('/api/data', (req,res) => { 
    projectData = req.body;
    res.send({message: "data added", status: 200});
});

app.get("/api/weather", async (req,res) => {
    res.send(await weatherApi.requestWeatherByZipcode(req.query.zib));
})
