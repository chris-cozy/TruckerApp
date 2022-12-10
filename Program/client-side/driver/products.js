const publicDNS = 'http://ec2-54-87-82-227.compute-1.amazonaws.com:3306/';
const localHost = 'http://localhost:5000/';
const corsHeader = 'https://cors-anywhere.herokuapp.com/'

document.addEventListener('DOMContentLoaded', function () {

});

const searchBtn = document.querySelector('#search-btn');
/*
    @desc: Calls the ebay API endpoint, to do a keyword search
    @params: Search input value
    @return: Item summary data object
*/
searchBtn.onclick = function () {
    const keyword = document.querySelector('#search-input').value;

    fetch(corsHeader + publicDNS + 'ebaySearch/' + keyword)
        .then(response => response.json())
        .then(data => load_products(data['data']['itemSummaries']));
}

/*
    @desc: Loads product data into html page
    @params: Data object of product summaries
    @return: Nothing
*/
function load_products(data) {
    const productList = document.querySelector('#product-table');
    if (data.length === 0) {
        productList.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({ title, condition, itemWebUrl, image, price }) {
        tableHtml += "<tr>";
        if (image) {
            tableHtml += `<td><img src= ${image['imageUrl']}></img></td>`;
        } else {
            tableHtml += `<td><p>No Image Available</p></td>`;
        }
        tableHtml += `<td>${title}</td>`;
        tableHtml += `<td>${condition}</td>`;
        tableHtml += `<td>${price['value']}</td>`;
        tableHtml += "</tr>"
    });

    productList.innerHTML = tableHtml;
}