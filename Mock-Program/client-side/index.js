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