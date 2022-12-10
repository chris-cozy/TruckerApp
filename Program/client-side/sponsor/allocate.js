const publicDNS = 'http://54.87.82.227:3306/';
const localHost = 'http://localhost:5000/';
const corsHeader = 'https://cors-anywhere.herokuapp.com/'
let currentUser = null;

document.addEventListener('DOMContentLoaded', function () {
    fetch(corsHeader + publicDNS + 'getCurrentSponsorUser')
        .then(response => response.json())
        .then(data => { currentUser = data.data[0] })
        .then(() => {
            console.log("currentUser");
            console.log(currentUser);
            fetch(corsHeader + publicDNS + 'getDrivers/' + currentUser.sponsorID)
                .then(response => response.json())
                .then(data => load_driver_list(data['data']));
        });
});


/*
    @desc: When called, loads a list of the active sponsors into the select dropdown list
    @params: Data object of sponsors, from database query
    @return: Nothing
*/
function load_driver_list(data) {
    console.log(data);
    // Grab the table body
    const driverSelect = document.querySelector('#driver-select');

    // If there is no data
    if (data.length === 0) {
        driverSelect.innerHTML = "<p class='no-data'>No Available Drivers</p>";
        return;
    }

    // If there is data
    let optionHTML = "";

    data.forEach(function ({ firstName, lastName, driverID }) {
        optionHTML += `<option value=${driverID}>${firstName} ${lastName}</option>`;
    });

    // Updating the HTML
    driverSelect.innerHTML = optionHTML;
}

/*
    @desc: After 'Save Changes' button is pressed, gathers the form information and places into an object 
    @params: N/A
    @return: An object containing the form data
*/
const submitBtn = document.querySelector('#submit');
submitBtn.onclick = function () {

    const reason = document.querySelector('#reason');
    const driver = document.querySelector('#driver-select');
    const points = document.querySelector('#point-amt');

    const pointInfo = {
        sponsorID: currentUser.sponsorID,
        driverID: driver.value,
        pointAmount: points.value,
        reason: reason.value
    }

    pointJson = JSON.stringify(pointInfo);
    console.log(pointJson);

    fetch(corsHeader + publicDNS + 'sendPoints', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: pointJson
    })
        .then(response => response.json())
        .then(data => {
            if (data != null) {
                alert("Points added successfully");
                location.reload();
            }
        });
}