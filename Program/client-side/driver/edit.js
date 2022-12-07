//-----GLOBALS-----//
const publicDNS = 'http://ec2-54-87-82-227.compute-1.amazonaws.com:3306/';
const localHost = 'http://localhost:5000/';
const corsHeader = 'https://cors-anywhere.herokuapp.com/'
let currentUser = null;

let firstNameInput = document.querySelector('#fname');
let lastNameInput = document.querySelector('#lname');
let emailInput = document.querySelector('#email');
let phoneNumInput = document.querySelector('#phone');

let drivingExpInput = document.querySelector('#exp');

let shippingStreetInput = document.querySelector('#street');

let shippingCityInput = document.querySelector('#city');

let shippingStateInput = document.querySelector('#state');

let shippingZipInput = document.querySelector('#zip');


document.addEventListener('DOMContentLoaded', function () {

    fetch(corsHeader + publicDNS + 'getCurrentUser')
        .then(response => response.json())
        .then(data => { currentUser = data['RowDataPacket'] })
        .then(() => {
            console.log(currentUser);
            firstNameInput.defaultValue = 'a';
            lastNameInput = defaultValue = 'a';
            emailInput = defaultValue = 'a';
            phoneNumInput = defaultValue = 'a';

            drivingExpInput = defaultValue = 'a';

            shippingStreetInput = defaultValue = 'a';

            shippingCityInput = defaultValue = 'a';

            shippingStateInput = defaultValue = 'a';

            shippingZipInput = defaultValue = 'a';
        })



});

//-----POST-----//
/*
    @desc: After 'Save Changes' button is pressed, gathers the form information and places into an object 
    @params: N/A
    @return: An object containing the form data
*/
const updateBtn = document.querySelector('#update');
updateBtn.onclick = function () {
    const profileInfo = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        email: emailInput.value,
        phoneNum: phoneNumInput.value,
        drivingExp: drivingExpInput.value,
        shippingAddress: {
            shippingStreet: shippingStreetInput.value,
            shippingCity: shippingCityInput.value,
            shippingState: shippingStateInput.value,
            shippingZip: shippingZipInput.value
        }
    }

    console.log(profileInfo);
    const currentUser = user.get_instance();

    fetch(corsHeader + publicDNS + '/updateProfileInfo', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify({
            // sub this for the current user's id
            id: currentUser.driverID,
            body: profileInfo
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                location.reload();
            }
        })
}