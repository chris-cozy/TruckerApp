//-----GLOBALS-----//
const publicDNS = 'http://ec2-54-87-82-227.compute-1.amazonaws.com:3306/';
const localHost = 'http://localhost:5000/';
const corsHeader = 'https://cors-anywhere.herokuapp.com/'
let currentUser = null;

const firstNameInput = document.querySelector('#fname');
const lastNameInput = document.querySelector('#lname');
const emailInput = document.querySelector('#email');
const phoneNumInput = document.querySelector('#phone');

const drivingExpInput = document.querySelector('#exp');

const shippingStreetInput = document.querySelector('#street');

const shippingCityInput = document.querySelector('#city');

const shippingStateInput = document.querySelector('#state');

const shippingZipInput = document.querySelector('#zip');


document.addEventListener('DOMContentLoaded', function () {

    fetch(corsHeader + publicDNS + 'getCurrentUser')
        .then(response => response.json())
        .then(data => { currentUser = data.data[0] })
        .then(() => {
            console.log(currentUser);
            firstNameInput.defaultValue = currentUser.firstName;
            lastNameInput.defaultValue = currentUser.lastName;
            emailInput.defaultValue = currentUser.email;
            phoneNumInput.defaultValue = currentUser.phoneNum;

            //drivingExpInput.defaultValue = 'a';

            shippingStreetInput.defaultValue = currentUser.shippingStreet;

            shippingCityInput.defaultValue = currentUser.shippingCity;

            shippingStateInput.defaultValue = currentUser.shippingState;

            shippingZipInput.defaultValue = currentUser.shippingZip;
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