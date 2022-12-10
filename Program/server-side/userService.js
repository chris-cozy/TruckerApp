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
}

//-----MODULE EXPORT-----//
module.exports = user;