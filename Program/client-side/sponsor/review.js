const publicDNS = 'http://54.87.82.227:3306/';
const localHost = 'http://localhost:5000/';
const corsHeader = 'https://cors-anywhere.herokuapp.com/'
let currentUser = null;

document.addEventListener('DOMContentLoaded', function () {
    fetch(corsHeader + publicDNS + 'getCurrentSponsorUser')
        .then(response => response.json())
        .then(data => { currentUser = data.data[0] })
        .then(() => {
            fetch(corsHeader + publicDNS + 'getAppsBySponsor/' + currentUser.sponsorID)
                .then(response => response.json())
                .then(data => load_applications(data['data']));
        });
});

document.querySelector('table tbody').addEventListener('click', function (event) {
    console.log(event.target);
    if (event.target.className === 'accept-btn') {
        accept_app_by_key(event.target.dataset.id);
    }
    if (event.target.className === 'reject-btn') {
        reject_app_by_key(event.target.dataset.id);
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

        tableHtml += `<td><button class="accept-btn" data-id =${appID}>Accept</button></td>`;

        tableHtml += `<td><button class="reject-btn" data-id =${appID}>Reject</button></td>`;

        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}

function accept_app_by_key(key) {
    fetch(corsHeader + publicDNS + 'appDecision', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify({
            key: key,
            value: 1
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                location.reload();
            }
        });

}

function reject_app_by_key(key) {
    fetch(corsHeader + publicDNS + 'appDecision', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify({
            key: key,
            value: -1
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                location.reload();
            }
        });

}