// const { response } = require("express");

document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/getAllSponsors')
        .then(response => response.json())
        .then(data => load_sponsor_list(data['data']));
});
//-----GET-----//
/*
    @desc: When called, loads a list of the active sponsors into the table
    @params: Data object of sponsors, from database query
    @return: Nothing
*/
/*
function load_sponsor_list(data) {
    // Grab the table body
    const sponsorSelect = document.querySelector('table tbody');

    // If there is no data
    if (data.length === 0) {
        sponsorSelect.innerHTML = "<p class='no-data'>No Available Sponsors</p>";
        return;
    }

    // If there is data
    let tableHTML = "";

    data.forEach(function ({ username, firstName, lastName, organization }) {
        tableHTML += "<tr>";
        tableHTML += `<td>${firstName}</td>`;
        tableHTML += `<td>${lastName}</td>`;
        tableHTML += `<td>${organization}</td>`;
        // A button to select the sponsor
        tableHTML += `<td><input type="checkbox" class="select-sponsor-btn" data-id=${username} name=${username} value=${username}></input><td>`;
        tableHTML += "</tr>"
    });

    // Updating the HTML
    sponsorSelect.innerHTML = tableHTML;
}
*/
/*
    @desc: When called, loads a list of the active sponsors into the select dropdown list
    @params: Data object of sponsors, from database query
    @return: Nothing
*/
function load_sponsor_list(data) {
    // Grab the table body
    const sponsorSelect = document.querySelector('#sponsor-select');

    // If there is no data
    if (data.length === 0) {
        sponsorSelect.innerHTML = "<p class='no-data'>No Available Sponsors</p>";
        return;
    }

    // If there is data
    let optionHTML = "";

    data.forEach(function ({ username, firstName, lastName, organization, sponsorID }) {
        optionHTML += `<option value=${sponsorID}>${firstName} ${lastName}</option>`;
    });

    // Updating the HTML
    sponsorSelect.innerHTML = optionHTML;
}
//-----POST-----//
/*
    @desc: After 'Save Changes' button is pressed, gathers the form information and places into an object 
    @params: N/A
    @return: An object containing the form data
*/
const submitBtn = document.querySelector('#submit');
submitBtn.onclick = function () {
    const emailInput = document.querySelector('#email');
    const phoneNumInput = document.querySelector('#phone');

    const drivingExpInput = document.querySelector('#exp');

    const shippingStreetInput = document.querySelector('#street');

    const shippingCityInput = document.querySelector('#city');

    const shippingStateInput = document.querySelector('#state');

    const shippingZipInput = document.querySelector('#zip');

    const reason = document.querySelector('#desc');

    const sponsor = document.querySelector('#sponsor-select')

    const applicationInfo = {
        email: emailInput.value,
        phoneNum: phoneNumInput.value,
        drivingExp: drivingExpInput.value,
        shippingAddress: {
            shippingStreet: shippingStreetInput.value,
            shippingCity: shippingCityInput.value,
            shippingState: shippingStateInput.value,
            shippingZip: shippingZipInput.value
        },
        // Sub this for the chosen sponsor's ID
        sponsorID: sponsor.value,
        reason: reason.value,
        initialStatus: 0
    }

    console.log(applicationInfo);

    fetch('http://localhost:5000/sendApplication', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            // sub this for the current user's id
            id: '41147626-3056-4454-895e-60027f449388',
            body: applicationInfo
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                location.reload();
            }
        })
}