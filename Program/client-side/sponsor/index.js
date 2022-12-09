//-----GLOBALS-----//
let tokens;
let userInfo;
const corsHeader = 'https://cors-anywhere.herokuapp.com/'
const publicDNS = 'http://54.87.82.227:3306/';
const localHost = 'http://localhost:5000/';

document.addEventListener('DOMContentLoaded', function () {
    const cognitoAuth = new URLSearchParams(window.location.search);
    const authCode = cognitoAuth.get('code');

    //console.log('AuthCode: ' + authCode);

    body = {
        'grant_type': 'authorization_code',
        'client_id': '	3nd0gqg60v9e2c2frlfpbrpf1s',
        'code': authCode,
        'redirect_uri': 'https://team21.cpsc4911.com/sponsor/'
    }

    let formBody = [];
    for (let property in body) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(body[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    //console.log(formBody);


    fetch('https://team-21-sponsor.auth.us-east-1.amazoncognito.com/oauth2/token', {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': 'Basic M25kMGdxZzYwdjllMmMyZnJsZnBicnBmMXM6bG9hMDJndHR1Z21kbTFhbWQ0ZWFjMjczZzlvc2RwOGk0Ymx2cW5ybXVidXM0Zm1kcTMw'
        },
        body: formBody
    })
        .then(response => response.json())
        .then(data => { tokens = data })
        .then(() => {
            console.log(tokens);

            fetch(corsHeader + publicDNS + 'getUserInfo/' + tokens.access_token)
                .then(response => response.json())
                .then(data => { userInfo = data })
                .then(() => {
                    console.log(userInfo);

                    const welcome = document.querySelector('#welcome-msg');
                    welcome.innerHTML = 'Welcome ' + userInfo.data.username;

                    fetch(corsHeader + publicDNS + 'setCurrentUser', {
                        headers: {
                            'Content-type': 'application/json'
                        },
                        method: 'POST',
                        body: JSON.stringify({ userInfo })
                    })
                        .then(response => console.log(response));
                })
                .catch(error => console.log(error));

        })

});