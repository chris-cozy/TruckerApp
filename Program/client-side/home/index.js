//-----GLOBALS-----//
const corsHeader = 'https://cors-anywhere.herokuapp.com/'
const publicDNS = 'http://54.87.82.227:3306/';
const localHost = 'http://localhost:5000/';

document.addEventListener('DOMContentLoaded', function () {
    fetch(corsHeader + publicDNS + 'resetUser')
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));

});