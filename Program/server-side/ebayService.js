//import Ebay from '/node_modules/ebay-node-api';
const Ebay = require('ebay-node-api');

//-----GLOBALS-----//
let instance = null;

let ebay = new Ebay({
    clientID: 'YunaZhao-Driving-SBX-dd24d8a8b-916424cc',
    clientSecret: 'SBX-d24d8a8b72b6-a8f0-4aaa-aa8a-5dd9',
    env: 'SANDBOX',
    body: {
        grant_type: 'client_credentials',
        scope: 'https://api.ebay.com/oauth/api_scope/sell.inventory'
    }
});

class ebayService {
    /*
        Grabs the instance of the class. Without it, multiple instances would be made.
        The return statment checks if instance is not null. If it is, creates a new instance.
    */
    static get_instance() {
        return instance ? instance : new ebayService();
    }

    async search(item) {
        try {
            const promise = new Promise((resolve, reject) => {
                ebay.getAccessToken()
                    .then((data) => {
                        ebay.searchItems({
                            keyword: item,
                            limit: 3,
                            filter: { priceCurrency: 'USD' }
                        })
                            .then((data) => {
                                let response = JSON.parse(data)
                                resolve(response)

                            })
                    })
            })

            let results = await promise;

            return results;

        } catch (error) {
            console.log(error);
        }

    }

    async searchByCategory() {
        ebay.getAccessToken()
            .then((data) => {
                ebay.getItemByItemGroup('158671')
                    .then((results) => {
                        console.log(results)
                        return results;
                    })
            })
            .catch((error) => { console.log(error) });
    }

}



//-----MODULE EXPORT-----//
module.exports = ebayService;