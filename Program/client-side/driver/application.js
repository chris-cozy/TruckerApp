const publicDNS = 'http://54.87.82.227:3306/';
const localHost = 'http://localhost:5000/';
const corsHeader = 'https://cors-anywhere.herokuapp.com/'
let currentUser = null;

document.addEventListener('DOMContentLoaded', function () {
    fetch(corsHeader + publicDNS + 'getAllSponsors')
        .then(response => response.json())
        .then(data => load_sponsor_list(data['data']));


    fetch(corsHeader + publicDNS + 'getCurrentUser')
        .then(response => response.json())
        .then(data => { currentUser = data.data[0] })
        .then(() => {
            fetch(corsHeader + publicDNS + 'getApplications/' + currentUser.driverID)
                .then(response => response.json())
                .then(data => load_applications(data['data']));
        });
});

document.querySelector('table tbody').addEventListener('click', function (event) {
    console.log(event.target);
    if (event.target.className === 'delete-row-btn') {
        delete_app_by_key(event.target.dataset.id);
    }
});

/* 
    Function that takes in data and loads it into the table
    Args: Array of data
*/
function load_applications(data) {
    const table = document.querySelector('table tbody');

    if (data == null || data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Applications</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({ sponsorID, dateCreated, status, Key }) {
        tableHtml += "<tr>";
        tableHtml += `<td>${sponsorID}</td>`;
        tableHtml += `<td>${new Date(dateCreated).toLocaleString()}</td>`;
        if (status == 0) {
            tableHtml += `<td>Pending</td>`;
        } else if (status == 1) {
            tableHtml += `<td>Accepted</td>`;
        } else if (status == -1) {
            tableHtml += `<td>Rejected</td>`;
        }
        // A button to delete the application
        tableHtml += `<td><button class="delete-row-btn" data-id =${Key}>Delete</button></td>`;
        tableHtml += "</tr>"
    });

    table.innerHTML = tableHtml;
}

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

function delete_app_by_key(key) {
    fetch(corsHeader + publicDNS + 'deleteApplication/' + key, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                location.reload();
            }
        });

}
/*
    @desc: After 'Save Changes' button is pressed, gathers the form information and places into an object 
    @params: N/A
    @return: An object containing the form data
*/
const submitBtn = document.querySelector('#submit');
submitBtn.onclick = function () {

    const reason = document.querySelector('#reason');
    const sponsor = document.querySelector('#sponsor-select')

    const applicationInfo = {
        driverID: currentUser.driverID,
        sponsorID: sponsor.value,
        reason: reason.value,
        initialStatus: 0
    }
    appJson = JSON.stringify(applicationInfo);
    console.log(appJson);

    fetch(corsHeader + publicDNS + 'sendApp', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: appJson
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data != null) {
                location.reload();
            }
        });
}