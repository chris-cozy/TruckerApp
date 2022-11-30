let currentUser;
document.addEventListener('DOMContentLoaded', function () {
    const cognitoAuth = new URLSearchParams(window.location.search);
    const authCode = cognitoAuth.get('code');

    body = {
        grant_type: 'authorization_code',
        client_id: '5g4pb7a3is4s1hcbltlsfojuf9',
        code: authCode,
        redirect_uri: 'https://team21.cpsc4911.com/driver/'
    }

        (async () => {
            const response = await fetch('https://team21-good-driver-program.auth.us-east-1.amazoncognito.com/oauth2/token', {
                Method: 'POST',
                Headers: {
                    'Accept': 'application.json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic NWc0cGI3YTNpczRzMWhjYmx0bHNmb2p1Zjk6Z2I2anRzaXUxZ2VoZGI5czBpcmNmYjZxdXNrNWZoc2IzbGdsM2VwYjZrOXFibWM3c2lv'
                },
                Body: body
            })
        });

    (async () => {
        const userInfo = await fetch('https://team21-good-driver-program.auth.us-east-1.amazoncognito.com/oauth2/userinfo', {
            Method: 'GET',
            Headers: {
                'Authorization': response.access_token
            }
        })
    });

    let currentUser = userInfo.username;
    console.log(currentUser);

    const welcome = document.querySelector('#welcome-msg');
    welcome.innerHTML = 'Welcome ' + currentUser;
});