# Introduction 
This is the readme file for our Good Driver Program! The site can be reached at https://team21.cpsc4911.com/
It is a web application with the purpose of being a platform for drivers to earn rewards through sponsorship.

# Tech Stack
Front-End - HTML/CSS, Javascript
Back-End - Node.js, Express, Javascript

# Login Informaton
Login by selecting your user type from the homepage, then completing the sign-in process via AWS Cognito Hosted UI.  To log in as one of 
our admin users, login with username Team21-DummyAdmin and password Test123!

# Catalog Information
Ebay is our catalog API.

# Running the Web Application
Before running application, request temporary access from the cors demo server at:
        https://cors-anywhere.herokuapp.com

Then ssh into the EC2 instance using the command:
ssh -i C:\path-to-key\Team21-Key.pem ubuntu@54.87.82.227

Example:
C:\Users\cjsan\Documents\TruckerSystem\Team21-Key.pem ubuntu@54.87.82.227

After the ssh is complete, navigate to:
 ~/F22-Team21-Sprenkle.Zhao.Sanders.Kissane.Towery/Program/server-side

Run the command:
node server.js

The back-end server is now online and the web application can be accessed.

# Testing credentials
Driver Account:
test_driver
!Password1

Sponsor Account:
test_sponsor
!Password1