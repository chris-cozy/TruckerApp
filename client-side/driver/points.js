const publicDNS = 'http://ec2-54-87-82-227.compute-1.amazonaws.com:3306/';
const localHost = 'http://localhost:5000/';
const corsHeader = 'https://cors-anywhere.herokuapp.com/'
let currentUser = null;

document.addEventListener('DOMContentLoaded', function () {
    fetch(corsHeader + publicDNS + 'getCurrentDriverUser')
        .then(response => response.json())
        .then(data => { currentUser = data.data[0] })
        .then(() => {
            console.log(currentUser);
            load_points(currentUser);

            fetch(corsHeader + publicDNS + 'getDriverPointHistory/' + currentUser.driverID)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    load_point_history(data['data']);
                });
        });


});

/*
    @desc: Loads points into html page
    @params: Data object of point
    @return: Nothing
*/
function load_points(data) {
    const points = document.querySelector('#points');

    if (data == null) {
        points.innerHTML = "<h1>No Point Data</h1>";
        return;
    }

    let tableHtml = "";

    if (data.points == null) {
        tableHtml += `<h1>No Point Data</h1>`;
    } else {
        tableHtml += `<h1>${data.points} Points</h1>`;
    }
    points.innerHTML = tableHtml;
}

/*
    @desc: Loads point history data into html page
    @params: object of point history data
    @return: Nothing
*/
function load_point_history(data) {
    const table = document.querySelector('table tbody');
    if (data == null || data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='4'>No Point History</td></tr>";
        return;
    }

    let tableHtml = "";
    data.forEach(function ({ firstName, lastName, pointAmount, reason, dateChanged }) {
        tableHtml += "<tr>";
        tableHtml += `<td>${firstName} ${lastName}</td>`;
        tableHtml += `<td>${pointAmount}</td>`;
        tableHtml += `<td>${reason}</td>`;
        tableHtml += `<td>${new Date(dateChanged).toLocaleString()}</td>`;
        tableHtml += "</tr>"
    });

    table.innerHTML = tableHtml;
}