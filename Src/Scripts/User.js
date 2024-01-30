    // Importing
const mongoose = require("mongoose")
const argon2 = require("argon2")
const userSchema = require("../Schema/User");
const Misc = require("./Misc")
const userModel = mongoose.model("User", userSchema);
userModel.init().catch(e => console.error(e));

module.exports = {
    /**
     * Fetches the users from the db and returns all the users
     * @returns {Promise<Array<Object>>} Returns all the users
     */
    async getAllUsers() {
        return (await userModel.find({})).map(({userid, username, isAdmin}) => ({userid, username, isAdmin}));
    },
    /**
     * Create the user and store to db
     * @param {String} username The username of the user
     * @param {String} password The plaintext password. This function hashes the password before storing it
     * @param {Boolean} isAdmin Whether the user is an admin or not
     * @returns {Promise<Object>} A promise for the user creation
     */
    async createUser(username, password, isAdmin) {
        let hashedPassword = await argon2.hash(password);
        let userid = parseInt(await Misc.get("userIdPointer"));
        await Misc.set("userIdPointer", userid+1);
        return userModel.create({userid, username, password: hashedPassword, isAdmin})
    },

    /**
     * Delete a user from the db.
     * @param {String} username The username of the user to delete
     */
    async deleteUser(username) {
        await userModel.findOneAndDelete({username})
    }, 

    /**
     * Verifies the password, or returns a rejected promise if the user does not exist
     * @returns {Promise<Boolean>} Whether the password is correct or not
     */
    async verifyPassword(username, enteredPassword) {
        return new Promise(async (resolve, reject) => { 
            let storedUser = await userModel.findOne({username}).exec()
            if(storedUser && storedUser.password) {
                resolve(await argon2.verify(storedUser.password, enteredPassword));
            }
            reject("The user does not exist!")
        }) 
    },

    /**
     * Update a user's password. 
     * @param {String} username The username of the user
     * @param {String} password The password to update to. This function will hash the password
     */
    async updateUserPassword(username, password) {
        let hashedPassword = await argon2.hash(password);
        await userModel.findOneAndUpdate({username}, {password: hashedPassword})
    },

    /**
     * Check if a user exists
     * @param {String} username The username of the user
     * @returns {Promise<Boolean>} Whether the user exists or not
     */
    async userExists(username) {
        return (await userModel.exists({username}).exec()) != null
    },
    /**
     * Check if a user is admin or not (defaults to false if user doesnt exist)
     * @param username The username of the user
     * @returns {Promise<Boolean>} Whether the user is an admin or not
     */
    async isAdmin(username) {
        let user = await userModel.findOne({username}).exec()
        return user && user.isAdmin
    },
    
    /**
     * Get a user by username
     * @param {String} username The username
     * @returns {Promise<Object>} The user object
     */
    async getUserByName(username) {
        return userModel.findOne({username}).exec();
    },
    getUserModel: () => userModel,
}