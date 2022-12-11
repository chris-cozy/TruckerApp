//-----GLOBALS-----//
const publicDNS = 'http://54.87.82.227:3306/';
const localHost = 'http://localhost:5000/';
const corsHeader = 'https://cors-anywhere.herokuapp.com/'
let currentUser = null;

document.addEventListener('DOMContentLoaded', function () {
    fetch(corsHeader + publicDNS + 'getAllSponsors')
        .then(response => response.json())
        .then(data => load_sponsor_list(data['data']));

    fetch(corsHeader + publicDNS + 'getCurrentDriverUser')
        .then(response => response.json())
        .then(data => { currentUser = data.data[0] })
        .then(() => {
            fetch(corsHeader + publicDNS + 'getAppsByDriver/' + currentUser.driverID)
                .then(response => response.json())
                .then(data => load_applications(data['data']));
        });
});

/*
    @desc: Deletes an application
    @params: Delete button pressed on application row
    @return: Nothing
*/
document.querySelector('table tbody').addEventListener('click', function (event) {
    console.log(event.target);
    if (event.target.className === 'delete-row-btn') {
        delete_app_by_key(event.target.dataset.id);
    }
});

/*
    @desc: Loads applcation data into html page
    @params: object of application data
    @return: Nothing
*/
function load_applications(data) {
    const table = document.querySelector('table tbody');
    if (data == null || data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Applications</td></tr>";
        return;
    }

    let tableHtml = "";
    data.forEach(function ({ firstName, lastName, dateCreated, status, appID }) {
        tableHtml += "<tr>";
        tableHtml += `<td>${firstName} ${lastName}</td>`;
        tableHtml += `<td>${new Date(dateCreated).toLocaleString()}</td>`;
        if (status == 0) {
            tableHtml += `<td>Pending</td>`;
        } else if (status == 1) {
            tableHtml += `<td>Accepted</td>`;
        } else if (status == -1) {
            tableHtml += `<td>Rejected</td>`;
        }
        tableHtml += `<td><button class="delete-row-btn" data-id =${appID}>Delete</button></td>`;
        tableHtml += "</tr>"
    });

    table.innerHTML = tableHtml;
}

/*
    @desc: Loads sponsor names into the select dropdown list
    @params: object of sponsor data
    @return: Nothing
*/
function load_sponsor_list(data) {
    const sponsorSelect = document.querySelector('#sponsor-select');

    if (data.length === 0) {
        sponsorSelect.innerHTML = "<p class='no-data'>No Available Sponsors</p>";
        return;
    }

    let optionHTML = "";

    data.forEach(function ({ firstName, lastName, sponsorID }) {
        optionHTML += `<option value=${sponsorID}>${firstName} ${lastName}</option>`;
    });

    sponsorSelect.innerHTML = optionHTML;
}

/*
    @desc: Sends query to delete application
    @params: appID
    @return: Nothing
*/
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

const submitBtn = document.querySelector('#submit');
/*
    @desc: Sends the application
    @params: Submit button clicked
    @return: Nothing
*/
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
            if (data != null) {
                location.reload();
            }
        });
}