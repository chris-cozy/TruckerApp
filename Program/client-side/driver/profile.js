//-----GLOBALS-----//
const publicDNS = 'http://54.87.82.227:3306/';
const localHost = 'http://localhost:5000/';
const corsHeader = 'https://cors-anywhere.herokuapp.com/'
let currentUser = null;

document.addEventListener('DOMContentLoaded', function () {

    fetch(corsHeader + publicDNS + 'getCurrentUser')
        .then(response => response.json())
        .then(data => { currentUser = data.data[0] })
        .then(() => {
            console.log(currentUser);
            load_personal_info(currentUser);
            load_points(currentUser);
            load_sponsors(currentUser);
        })



});
/* 
    Function that takes in data and loads it into the table
    Args: Array of data
*/
function load_personal_info(data) {
    // Grab the table body
    const personalInfo = document.querySelector('#personal-info');

    // If there is no data
    if (data == null) {
        personalInfo.innerHTML = "<p>No Profile Data</p>";
        return;
    }

    // If there is data
    let tableHtml = "";

    if (data.firstName != null && data.lastName != null) {
        tableHtml += `<p>${data.firstName} ${data.lastName}</p>`;
    }

    if (data.email != null) {
        tableHtml += `<p>${data.email}</p>`;
    }

    if (data.phoneNum != null) {
        tableHtml += `<p>${data.phoneNum}</p>`;
    }

    if (data.dateCreated != null) {
        tableHtml += `<p>Joined Since: ${data.dateCreated}</p>`;
    }

    if (data.shippingStreet != null && data.shippingCity != null && data.shippingState != null && data.shippingZip != null) {
        tableHtml += `<p>Shipping Address: ${data.shippingStreet} ${data.shippingCity},${data.shippingState} ${data.shippingZip}</p>`;
    }
    personalInfo.innerHTML = tableHtml;
}

/* 
    Function that takes in data and loads it into the table
    Args: Array of data
*/
function load_points(data) {
    // Grab the table body
    const points = document.querySelector('#points');

    // If there is no data
    if (data == null) {
        points.innerHTML = "<p>No Point Data</p>";
        return;
    }

    // If there is data
    let tableHtml = "";

    if (data.points == null) {
        tableHtml += `<p>0</p>`;
    } else {
        tableHtml += `<p>${data.points}</p>`;
    }
    points.innerHTML = tableHtml;
}

/* 
    Function that takes in data and loads it into the table
    Args: Array of data
*/
function load_sponsors(data) {
    // Grab the table body
    const sponsors = document.querySelector('#sponsors');

    // If there is no data
    if (data == null) {
        sponsors.innerHTML = "<p>No Sponsor Data</p>";
        return;
    }
    let tableHtml = "";

    sponsors.innerHTML = tableHtml;
}