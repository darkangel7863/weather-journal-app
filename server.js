// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
const { response } = require('express');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = process.env.port || 8080;

const server = app.listen(port, () => {
    console.log(`Server running on Localhost: ${port}`);
})
app.get('/all', (req, res) => {
    res.send(projectData);
})

app.post('/postData', addData);

function addData(request, response) {
    projectData.temperature = request.body.temperature;
    projectData.date = request.body.date;
    projectData.user = request.body.user;
    response.send({ msg: "POST Received" });
    console.log(projectData);
}