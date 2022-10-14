document.addEventListener('DOMContentLoaded', function () {
    // Setting the endpoint
    fetch('http://localhost:5000/getAllAccounts');
});

var navLinks = document.getElementById("navLinks");
    function showMenu(){
        navLinks.style.right = "0";
    }
    function hideMenu(){
        navLinks.style.right = "-400px";
    }