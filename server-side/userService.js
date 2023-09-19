//-----GLOBALS-----//
let instance = null;


//-----USER CLASS-----//
class user {
    /*
        @desc: Initializes class instance with user info
        @params: userInfo object (optional)
        @return: None
    */
    constructor(userInfo = null) {
        this.username = userInfo.userInfo.data.username;
        this.sub = userInfo.userInfo.data.sub;
        this.email = userInfo.userInfo.data.email;
    }

    /*
        @desc: Grabs instance of class. Keeps multiple instances from being made. The return statment checks if instance is not null. If it is, creates new instance.
        @params: None
        @return: User class instance
    */
    static get_instance(userInfo = null) {
        return instance ? instance : new user(userInfo);
    }

    /*
        @desc: Deletes instance of class. The return statment checks if instance is deleted.
        @params: None
        @return: true or false
    */
    static delete_instance() {
        instance = null;
        return instance === null ? true : false;
    }
}

//-----MODULE EXPORT-----//
module.exports = user;