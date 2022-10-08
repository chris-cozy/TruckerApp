/*
    This is an event listener that is called when the page loads. It fetches the endpoint for table data.
*/
document.addEventListener('DOMContentLoaded', function () {
    // Setting the endpoint
    fetch('http://localhost:5000/getAll')
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
    fetch('http://localhost:5000/insert', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ name: name })
    })
        .then(response => response.json())
        .then(data => insertRowIntoTable(data['data']));
}

//-----DELETE-----//
/*
    Using an event listener for when the user decides to delete a row
*/
document.querySelector('table tbody').addEventListener('click', function (event) {
    console.log(event.target);
    if (event.target.className === 'delete-row-btn') {
        deleteRowById(event.target.dataset.id);
    }
    if (event.target.className === 'edit-row-btn') {
        handleEditRow(event.target.dataset.id);
    }
});

/*
    Sending the PATCH request, and if successful, reloading the page. Ideally this is not the best way to display the results but it will work for now.
*/
const updateBtn = document.querySelector('#update-row-btn');
updateBtn.onclick = function () {
    const updatedInput = document.querySelector('#update-input');

    fetch('http://localhost:5000/update', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify({
            id: updateBtn.dataset.id,
            name: updatedInput.value
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                location.reload();
            }
        })
}

//-----HELPER FUNCTIONS-----//
/*
    Show the UI and set the data id for the Update button. This links the update button to the corresponding database table row.
*/
function handleEditRow(id) {
    const updateSection = document.querySelector("#update-row");
    updateSection.hidden = false;
    document.querySelector('#update-row-btn').dataset.id = id;
}


/*
    Calls server side to delete the row. If successful, reloads the page
*/
function deleteRowById(id) {
    fetch('http://localhost:5000/delete/' + id, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                location.reload();
            }
        });

}
/*
    This function will take data and insert it into the table as a new row. The purpose of this is the update the table once the add button is clicked, rather than needing to refresh.
    Takes in an array of data.
*/
function insertRowIntoTable(data) {
    const table = document.querySelector('table tbody');
    const nonEmptyTable = table.querySelector('.no-data');

    let tableHtml = "<tr>";

    // Cannot use a forEach because we are dealing with an abject, not an array.
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            if (key === 'dateAdded') {
                data[key] = new Date(data[key]).toLocaleString();
            }
            tableHtml += `<td>${data[key]}</td>`;
        }
    }
    // A button to delete the data
    tableHtml += `<td><button class="delete-row-btn" data-id =${data.id}>Delete</button></td>`;
    // A button to edit the data
    tableHtml += `<td><button class="edit-row-btn" data-id =${data.id}>Edit</button></td>`;

    tableHtml += "</tr>";

    // If table is empty, add a new row
    if (nonEmptyTable) {
        table.innerHTML = tableHtml;
    } else {
        const newRow = table.insertRow();
        newRow.innerHTML = tableHtml;
    }
}

/* 
    Function that takes in data and loads it into the table
    Args: Array of data
*/
function loadHTMLTable(data) {
    // Grab the table body
    const table = document.querySelector('table tbody');

    // If there is no data
    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
        return;
    }

    // If there is data
    let tableHtml = "";

    data.forEach(function ({ id, name, date_added }) {
        tableHtml += "<tr>";
        tableHtml += `<td>${id}</td>`;
        tableHtml += `<td>${name}</td>`;
        tableHtml += `<td>${new Date(date_added).toLocaleString()}</td>`;
        // A button to delete the data
        tableHtml += `<td><button class="delete-row-btn" data-id =${id}>Delete</button></td>`;
        // A button to edit the data
        tableHtml += `<td><button class="edit-row-btn" data-id =${id}>Edit</button></td>`;
        tableHtml += "</tr>"
    });

    // Updating the HTML
    table.innerHTML = tableHtml;
}