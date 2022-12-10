//-----GLOBALS-----//
const publicDNS = 'http://54.87.82.227:3306/';
const localHost = 'http://localhost:5000/';
const corsHeader = 'https://cors-anywhere.herokuapp.com/'
let currentUser = null;

let firstNameInput = document.querySelector('#fname');
let lastNameInput = document.querySelector('#lname');
let emailInput = document.querySelector('#email');
let phoneNumInput = document.querySelector('#phone');

let bioInput = document.querySelector('#bio');

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
            bioInput.defaultValue = currentUser.bio;
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
        bio: bioInput.value
    }

    console.log(profileInfo);

    fetch(corsHeader + publicDNS + '/updateSponsorInfo', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify({
            // sub this for the current user's id
            id: currentUser.sponsorID,
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