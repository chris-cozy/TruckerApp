/*
    This is an event listener that is called when the page loads. It fetches the endpoint for tabe data.
*/
document.addEventListener('DOMContentLoaded', function () {
    // Setting the endpoint
    fetch('http://localHost:5000/getAll')
        // Converting response to json format
        .then(response => response.json())
        // Getting data back in json format and logging it to the console. Must access the data key of the json file
        .then(data => loadHTMLTable(data['data']));
});

//-----POST-----//
/*
    Function that waits for the submit button to be pressed, then takes the argument in the input box and sends it to the back-end

    There is no .catch or error handling, since we have that in the back-end.
*/
const addBtn = document.querySelector('#add-btn');
addBtn.onclick = function () {
    const nameInput = document.querySelector('#test-input');
    // Every time we grab value and send to back-end, reset value to empty string
    const name = nameInput.value;
    nameInput.value = "";

    // Accesses the API and transmits the data to the back-end. After a response is recieved, fulfills the .then promises
    fetch('http://localHost:5000/insert', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ name: name })
    })
        .then(response => response.json)
        .then(data => insertRowIntoTable(data['data']));
}

/*
    This function will take data and insert it into the table as a row.
    Takes in an array of data.
*/
function insertRowIntoTable(data) {

}

//-----TABLE LOADER-----//
/* 
    Function that takes in data and loads it into the table
    Args: Array of data
*/
function loadHTMLTable(data) {
    // Grab the table body
    const table = document.querySelector('table tbody');

    // If there is no data, display that
    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
    }
}