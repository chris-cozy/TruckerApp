//-----MODULE SETUP-----//
const Ebay = require('ebay-node-api');
const ebay = new Ebay({
    clientID: 'YunaZhao-Driving-SBX-dd24d8a8b-916424cc',
    clientSecret: 'SBX-d24d8a8b72b6-a8f0-4aaa-aa8a-5dd9',
    env: 'SANDBOX',
    body: {
        grant_type: 'client_credentials',
        scope: 'https://api.ebay.com/oauth/api_scope/sell.inventory'
    }
});

//-----GLOBALS-----//
let instance = null;

//-----EBAY CLASS-----//
class ebayService {
    /*
        @desc: Grabs instance of class. Keeps multiple instances from being made. The return statment checks if instance is not null. If it is, creates new instance.
        @params: None
        @return: Ebay class instance
    */
    static get_instance() {
        return instance ? instance : new ebayService();
    }

    /*
        @desc: Searches for item information based on a keyword
        @params: item keyword
        @return: object containing item information
    */
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

    /*
        UNFINISHED
        @desc: Searches for item information based on a category
        @params: item category keyword
        @return: object containing item information
    */
    async search_by_category() {
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