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

Sponsor AWS Account:
Team21-Sponsor
Test123!

Admin AWS Account:
Team21-DummyAdmin
Test123!

#Our AWS resource breakdown:

The environment:
We are hosting our application on an EC2 instance inside of a VPC with a private and public subnet.  Our data is being stored in a RDS instance with a custom security group attached to it.  Our security group has inbound rules to allow MySQL and all ICMP, and an outbound rule for all traffic.  We are using 2 Cognito User Pools to manage our users and sign-in processes (1). Our 

Users:
Our users are managed through 3 Cognito user pools.  We have a separate user pool for our admin, sponsor, and driver users.  The user pools all enforce a password complexity system of a minimum length of 8 characters, and a requirement of containing at least 1 number, 1 special character, 1 uppercase letter, and 1 lowercase letter.  Our admin user pool has self-sign up disabled, so that admin users must be created by other admin users in order to have an account.

We also have management console functionality for our Sponsor and Admin users, which allows them to access the management console from our application and log in using their credentials to perform tasks in our AWS environment.  Admins and Sponsors are both User Groups in our IAM environment, meaning that we can have many users that are assigned to these User Groups.  There is one admin and one sponsor user currently registered with each of these groups for demo purposes.  The admin group has a policy attached to it that only allows admin users to have access to CloudTrail and Cognito, because they need to create logs for user login and password changes and add/modify users.  This policy also only allows our admins to access our User Pools, since we are on a shared account with all of our classmates, to enforce the principle of least privilege. The sponsor group only has access to Cognito because they only need to be able to add other users.  The sponsor users are only allowed to view and create users in our sponsor pool, so that sponsors would not be able to create admin users.

Logs:
Our logs are managed by AWS Cloudtrail.  This was done by creating a Cloud Trail for our team and configured it to listen to our web application’s API calls.  There are different keywords that you can search for in the CloudTrail to find logs for that specific event such as, ConfirmForgotPassword for  a log of when users forgot their passwords, and  CognitoAuthentication for users that logged in.

Security:
Our application is protected from SQL injection attacks through a Web Application Firewall (WAF).  This was configured by first setting up an Application Load Balancer to distribute our incoming traffic to our target.  We then configured a Target Group, which is where traffic is passed to from the ALB.  Next, we created two Application Control Lists (ACL), one for our Cognito set up and another for our Application Load Balancer.  These are each configured with the AWS Managed SQLI rule to prevent these services from being exposed to a SQL injection attack.

