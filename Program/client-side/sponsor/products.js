const publicDNS = 'http://ec2-54-87-82-227.compute-1.amazonaws.com:3306/';
const localHost = 'http://localhost:5000/';
const corsHeader = 'https://cors-anywhere.herokuapp.com/'

let currentSearchData = null;
let currentUser = null;

document.addEventListener('DOMContentLoaded', function () {
    fetch(corsHeader + publicDNS + 'getCurrentSponsorUser')
        .then(response => response.json())
        .then(data => { currentUser = data.data[0] })
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
        .then(data => {
            console.log(data);
            currentSearchData = data['data']['itemSummaries'];
            load_products(data['data']['itemSummaries']);
        });
}

/*
    @desc: Adds a product to the catalog
    @params: Add button pressed on product row
    @return: Nothing
*/
document.querySelector('table tbody').addEventListener('click', function (event) {
    console.log(event.target);
    if (event.target.className === 'add-item') {
        console.log(event.target.dataset.id);
        add_to_catalog(event.target.dataset.id);
    }
});

/*
    @desc: Adds a product to the catalog
    @params: itemID
    @return: Nothing
*/
function add_to_catalog(ID) {
    let itemInfo = null;

    currentSearchData.forEach(function ({ title, condition, itemId, image, price }) {
        if (itemId == ID) {
            itemInfo = {
                sponsorID: currentUser.sponsorID,
                itemID: itemId,
                imageUrl: image['imageUrl'],
                title: title,
                condition: condition,
                price: price
            }
        }
    });

    itemJson = JSON.stringify(itemInfo);
    console.log(itemJson);

    fetch(corsHeader + publicDNS + 'addToCatalog', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: itemJson
    })
        .then(response => response.json())
        .then(data => {
            if (data != null) {
                alert("Item added successfully");
                location.reload();
            }
        });
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

    data.forEach(function ({ title, condition, itemId, image, price }) {
        tableHtml += "<tr>";
        if (image) {
            tableHtml += `<td><img src= ${image['imageUrl']}></img></td>`;
        } else {
            tableHtml += `<td><p>No Image Available</p></td>`;
        }
        tableHtml += `<td>${title}</td>`;
        tableHtml += `<td>${condition}</td>`;
        tableHtml += `<td>${price['value']}</td>`;
        tableHtml += `<td><button class="add-item" data-id =${itemId}>Add</button></td>`;
        tableHtml += "</tr>"
    });

    productList.innerHTML = tableHtml;
}