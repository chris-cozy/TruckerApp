const user = require('./user');

const publicDNS = 'http://ec2-54-87-82-227.compute-1.amazonaws.com:3306/';
const localHost = 'http://localhost:5000/';
const corsHeader = 'https://cors-anywhere.herokuapp.com/'

document.addEventListener('DOMContentLoaded', function () {

});

//-----POST-----//
/*
    @desc: After 'Save Changes' button is pressed, gathers the form information and places into an object 
    @params: N/A
    @return: An object containing the form data
*/
const updateBtn = document.querySelector('#update');
updateBtn.onclick = function () {
    const firstNameInput = document.querySelector('#fname');
    const lastNameInput = document.querySelector('#lname');
    const emailInput = document.querySelector('#email');
    const phoneNumInput = document.querySelector('#phone');

    const drivingExpInput = document.querySelector('#exp');

    const shippingStreetInput = document.querySelector('#street');

    const shippingCityInput = document.querySelector('#city');

    const shippingStateInput = document.querySelector('#state');

    const shippingZipInput = document.querySelector('#zip');

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
            id: currentUser.userSub,
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