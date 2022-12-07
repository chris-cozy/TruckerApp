//-----GLOBALS-----//
let tokens;
let userInfo;
let instance = null;

const publicDNS = 'https://cors-everywhere.herokuapp.com/http://54.87.82.227:3306/';
const localHost = 'http://localhost:5000/';

document.addEventListener('DOMContentLoaded', function () {
    const cognitoAuth = new URLSearchParams(window.location.search);
    const authCode = cognitoAuth.get('code');

    console.log('AuthCode: ' + authCode);

    body = {
        'grant_type': 'authorization_code',
        'client_id': '5g4pb7a3is4s1hcbltlsfojuf9',
        'code': authCode,
        'redirect_uri': 'https://team21.cpsc4911.com/driver/'
    }

    let formBody = [];
    for (let property in body) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(body[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");
    console.log(formBody);

    fetch('https://team21-good-driver-program.auth.us-east-1.amazoncognito.com/oauth2/token', {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': 'Basic NWc0cGI3YTNpczRzMWhjYmx0bHNmb2p1Zjk6Z2I2anRzaXUxZ2VoZGI5czBpcmNmYjZxdXNrNWZoc2IzbGdsM2VwYjZrOXFibWM3c2lv'
        },
        body: formBody
    })
        .then(response => response.json())
        .then(data => { tokens = data })
        .then(() => {
            console.log(tokens);
            fetch(publicDNS + 'getUserInfo/' + tokens.access_token)
                .then(response => response.json())
                .then(data => { userInfo = data })
                .then(() => {
                    console.log(userInfo);
                    /*
                    const currentUser = user.get_instance();

                    
                    */
                    const welcome = document.querySelector('#welcome-msg');
                    welcome.innerHTML = 'Welcome ' + userInfo.test;
                })
                .catch(error => console.log(error));
        })
});



//-----CLASS-----//
//This class will be used to hold the information for the current user of the application
class user {
    constructor(userName, userSub, userEmail) {
        this.userName = userName;
        this.userSub = userSub;
        this.userEmail = userEmail;
    }
    /*
    Grabs the instance of the class. Without it, multiple instances would be made.
    The return statment checks if instance is not null. If it is, creates a new instance.
    */
    static get_instance() {
        return instance ? instance : new user(userInfo.username, userInfo.sub, userInfo.email);
    }


}

//-----MODULE EXPORT-----//
module.exports = user;