/* Global Variables */
const key = '&APPID=b1300a6252002e96854cc7a9125cace4';
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const contbaseURL = ',us&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    console.log(newDate);
    getTemp(baseURL, zipCode, contbaseURL, key)
        .then(function (data) {
            postData('http://localhost:8080/postData', {
                temperature: data.main.temp, date: newDate,
                user: feelings
            })
            updateUI();
            // .then(function () {

            //     })
        })

}
const getTemp = async (baseURL, zipCode, contbaseURL, key) => {
    const response = await fetch(baseURL + zipCode + contbaseURL + key)
    console.log(response);
    try {
        const data = await response.json();
        console.log(data);
        console.log('PRIMAS');
        return data;
    } catch (error) {
        console.log('error', error)
    }
}

const postData = async (url = '', data = {}) => {
    const postReq = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        console.log('ANTRAS');
        const newData = await postReq.json();
        console.log(newData, 'ANTRAS VEL');
        return newData;
    } catch (error) {
        console.log('error', error);
    }
}

const updateUI = async () => {
    const req = await fetch('/all');
    try {
        const allData = await req.json();
        console.log('allData');
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temperature;
        document.getElementById('content').innerHTML = allData.user;
    } catch (error) {
        console.log('error', error);
    }
}