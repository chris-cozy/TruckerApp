//-----GLOBALS-----//
const publicDNS = 'http://54.87.82.227:3306/';
const localHost = 'http://localhost:5000/';
const corsHeader = 'https://cors-anywhere.herokuapp.com/'
let currentUser = null;

document.addEventListener('DOMContentLoaded', function () {

    fetch(corsHeader + publicDNS + 'getCurrentSponsorUser')
        .then(response => response.json())
        .then(data => { currentUser = data.data[0] })
        .then(() => {
            console.log(currentUser);
            load_personal_info(currentUser);

            fetch(corsHeader + publicDNS + 'getDrivers/' + currentUser.sponsorID)
                .then(response => response.json())
                .then(data => load_drivers(data['data']));
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

    if (data.bio != null) {
        tableHtml += `<p>${data.bio}</p>`;
    }
    personalInfo.innerHTML = tableHtml;
}

/* 
    Function that takes in data and loads it into the table
    Args: Array of data
*/
function load_drivers(data) {
    // Grab the table body
    const sponsors = document.querySelector('#drivers');

    // If there is no data
    if (data == null) {
        sponsors.innerHTML = "<p>No Driver Data</p>";
        return;
    }
    let tableHtml = "";

    data.forEach(function ({ firstName, lastName }) {
        tableHtml += `<p>${firstName} ${lastName}</p>`;
    });

    sponsors.innerHTML = tableHtml;
}