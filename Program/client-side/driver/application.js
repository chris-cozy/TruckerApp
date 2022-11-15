document.addEventListener('DOMContentLoaded', function () {

});

//-----POST-----//
/*
    @desc: After 'Save Changes' button is pressed, gathers the form information and places into an object 
    @params: N/A
    @return: An object containing the form data
*/
const submitBtn = document.querySelector('#submit');
submitBtn.onclick = function () {
    const emailInput = document.querySelector('#email');
    const phoneNumInput = document.querySelector('#phone');

    const drivingExpInput = document.querySelector('#exp');

    const shippingStreetInput = document.querySelector('#street');

    const shippingCityInput = document.querySelector('#city');

    const shippingStateInput = document.querySelector('#state');

    const shippingZipInput = document.querySelector('#zip');

    const reason = document.querySelector('#desc');

    const applicationInfo = {
        email: emailInput.value,
        phoneNum: phoneNumInput.value,
        drivingExp: drivingExpInput.value,
        shippingAddress: {
            shippingStreet: shippingStreetInput.value,
            shippingCity: shippingCityInput.value,
            shippingState: shippingStateInput.value,
            shippingZip: shippingZipInput.value
        },
        // Sub this for the chosen sponsor's ID
        sponsorID: 'c9e2d249-af19-4dfd-a091-831d27e81e29',
        reason: reason.value,
        initialStatus: 0
    }

    console.log(applicationInfo);

    fetch('http://localhost:5000/sendApplication', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            // sub this for the current user's id
            id: '41147626-3056-4454-895e-60027f449388',
            body: applicationInfo
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                location.reload();
            }
        })
}