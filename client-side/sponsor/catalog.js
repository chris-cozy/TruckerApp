const publicDNS = 'http://ec2-54-87-82-227.compute-1.amazonaws.com:3306/';
const localHost = 'http://localhost:5000/';
const corsHeader = 'https://cors-anywhere.herokuapp.com/'
let currentUser = null;

document.addEventListener('DOMContentLoaded', function () {
    fetch(corsHeader + publicDNS + 'getCurrentSponsorUser')
        .then(response => response.json())
        .then(data => { currentUser = data.data[0] })
        .then(() => {
            console.log(currentUser);

            fetch(corsHeader + publicDNS + 'getSponsorProducts/' + currentUser.sponsorID)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    load_products(data['data']);
                });
        });


});

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

    data.forEach(function ({ title, condition, imageUrl, price }) {
        tableHtml += "<tr>";
        if (imageUrl != null) {
            tableHtml += `<td><img src= ${imageUrl}></img></td>`;
        } else {
            tableHtml += `<td><p>No Image Available</p></td>`;
        }
        tableHtml += `<td>${title}</td>`;
        tableHtml += `<td>${condition}</td>`;
        tableHtml += `<td>${price}</td>`;
        tableHtml += "</tr>"
    });

    productList.innerHTML = tableHtml;
}