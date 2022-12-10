let instance = null;


//-----CLASS-----//
//This class will be used to hold the information for the current user of the application
class user {
    constructor(userInfo = null) {
        this.username = userInfo.userInfo.data.username;
        this.sub = userInfo.userInfo.data.sub;
        this.email = userInfo.userInfo.data.email;
    }
    /*
    Grabs the instance of the class. Without it, multiple instances would be made.
    The return statment checks if instance is not null. If it is, creates a new instance.
    */
    static get_instance(userInfo = null) {
        return instance ? instance : new user(userInfo);
    }




}

//-----MODULE EXPORT-----//
module.exports = user;