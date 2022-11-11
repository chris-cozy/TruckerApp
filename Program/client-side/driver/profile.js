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

    fetch('http://localhost:5000/updateProfileInfo', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify({
            // sub this for current user id
            id: '41147626-3056-4454-895e-60027f449388',
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