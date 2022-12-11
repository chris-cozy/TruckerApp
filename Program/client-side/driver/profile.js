//-----GLOBALS-----//
const publicDNS = 'http://54.87.82.227:3306/';
const localHost = 'http://localhost:5000/';
const corsHeader = 'https://cors-anywhere.herokuapp.com/';

let currentUser = null;

document.addEventListener('DOMContentLoaded', function () {
    fetch(corsHeader + publicDNS + 'getCurrentDriverUser')
        .then(response => response.json())
        .then(data => { currentUser = data.data[0] })
        .then(() => {
            console.log(currentUser);
            load_personal_info(currentUser);
            load_points(currentUser);

            fetch(corsHeader + publicDNS + 'getSponsors/' + currentUser.driverID)
                .then(response => response.json())
                .then(data => load_sponsors(data['data']));
        })
});

/*
    @desc: Loads personal information into html page
    @params: Data object of personal information
    @return: Nothing
*/
function load_personal_info(data) {
    const personalInfo = document.querySelector('#personal-info');
    if (data == null) {
        personalInfo.innerHTML = "<p>No Profile Data</p>";
        return;
    }

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
    @desc: Loads points into html page
    @params: Data object of point
    @return: Nothing
*/
function load_points(data) {
    const points = document.querySelector('#points');

    if (data == null) {
        points.innerHTML = "<p>No Point Data</p>";
        return;
    }

    let tableHtml = "";

    if (data.points == null) {
        tableHtml += `<p>0</p>`;
    } else {
        tableHtml += `<p>${data.points}</p>`;
    }
    points.innerHTML = tableHtml;
}

/*
    @desc: Loads sponsors into html page
    @params: Data object of sponsors
    @return: Nothing
*/
function load_sponsors(data) {
    const sponsors = document.querySelector('#sponsors');

    if (data == null) {
        sponsors.innerHTML = "<p>No Sponsor Data</p>";
        return;
    }
    let tableHtml = "";

    data.forEach(function ({ firstName, lastName }) {
        tableHtml += `<p>${firstName} ${lastName}</p>`;
    });

    sponsors.innerHTML = tableHtml;
}