const publicDNS = 'http://ec2-54-87-82-227.compute-1.amazonaws.com:3306/';
const localHost = 'http://localhost:5000/';
const corsHeader = 'https://cors-anywhere.herokuapp.com/'

document.addEventListener('DOMContentLoaded', function () {
    fetch(corsHeader + publicDNS + 'getCurrentDriverUser')
        .then(response => response.json())
        .then(data => { currentUser = data.data[0] })
        .then(() => {
            console.log(currentUser);
            load_points(currentUser);
        })

});

/*
    @desc: Loads points into html page
    @params: Data object of point
    @return: Nothing
*/
function load_points(data) {
    const points = document.querySelector('#points');

    if (data == null) {
        points.innerHTML = "<p>No point data</p>";
        return;
    }

    let tableHtml = "";

    if (data.points == null) {
        tableHtml += `<p>No point data</p>`;
    } else {
        tableHtml += `<p>${data.points}</p>`;
    }
    points.innerHTML = tableHtml;
}