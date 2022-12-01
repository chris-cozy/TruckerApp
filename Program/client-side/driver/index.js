//-----GLOBALS-----//
let response;
let userInfo;
let instance = null;

document.addEventListener('DOMContentLoaded', function () {
    console.log('LOGGED IN');
    const cognitoAuth = new URLSearchParams(window.location.search);
    const authCode = cognitoAuth.get('code');

    body = {
        grant_type: 'authorization_code',
        client_id: '5g4pb7a3is4s1hcbltlsfojuf9',
        code: authCode,
        redirect_uri: 'https://team21.cpsc4911.com/driver/'
    }

    async () => {
        response = await fetch('https://team21-good-driver-program.auth.us-east-1.amazoncognito.com/oauth2/token', {
            Method: 'POST',
            Headers: {
                'Accept': 'application.json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic NWc0cGI3YTNpczRzMWhjYmx0bHNmb2p1Zjk6Z2I2anRzaXUxZ2VoZGI5czBpcmNmYjZxdXNrNWZoc2IzbGdsM2VwYjZrOXFibWM3c2lv'
            },
            Body: body
        })
    };

    async () => {
        userInfo = await fetch('https://team21-good-driver-program.auth.us-east-1.amazoncognito.com/oauth2/userinfo', {
            Method: 'GET',
            Headers: {
                'Authorization': 'Bearer ' + response.access_token
            }
        })
    };

    console.log(userInfo);
    const currentUser = user.get_instance();

    const welcome = document.querySelector('#welcome-msg');
    welcome.innerHTML = 'Welcome ' + currentUser.userName;
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