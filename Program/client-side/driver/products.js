document.addEventListener('DOMContentLoaded', function () {
    // Setting the endpoint
    fetch('http://localhost:5000/ebaySearch')
        // Converting response to json format
        .then(response => response.json())
        // Getting data back in json format and logging it to the console. Must access the data key of the json file
        //.then(data => console.log(data['data']['itemSummaries']))
        .then(data => load_products(data['data']['itemSummaries']));
});

/*
    @desc: When called, loads a list of the active sponsors into the select dropdown list
    @params: Data object of sponsors, from database query
    @return: Nothing
*/
function load_products(data) {
    console.log(data)
    const productList = document.querySelector('#product-table');

    // If there is no data
    if (data.length === 0) {
        productList.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
        return;
    }

    // If there is data
    let tableHtml = "";

    data.forEach(function ({ title, condition, itemWebUrl, image, price }) {
        tableHtml += "<tr>";
        tableHtml += `<td><img src= ${image['imageUrl']}></img></td>`;
        tableHtml += `<td>${title}</td>`;
        tableHtml += `<td>${condition}</td>`;
        tableHtml += `<td>${price['value']}</td>`;
        tableHtml += "</tr>"
    });

    // Updating the HTML
    productList.innerHTML = tableHtml;
}