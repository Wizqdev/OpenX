const mongoose = require("mongoose");
const tokenSchema = require("../Schema/Token")
const stringUtil = require("../Utils/stringUtil")
const tokenModel = mongoose.model("tokens", tokenSchema)
tokenModel.init();
module.exports = {
    /**
     * Create the token and store to db
     * @param {String} tokenType The token type
     * @returns {Promise<String>} A promise for the token creation that resolved to the token
     */
    async createToken(tokenType, userid) {
        let token = stringUtil.generateRandomString(32); //the TODO below is for later, much much later lol
        await tokenModel.create({token, permissions: [tokenType], user: userid}) // TODO: write a better permissions system that allows for more granular control over what a token can and can't do
        return token
    },

    /**
     * Delete a token from the db.
     * @param {String} token The token to delete
     */
    async deleteToken(token) {
        await tokenModel.findOneAndDelete({token})
    },

    /**
     * Get tokens by a certain user ID
     * @param {Number} userId The ID of the user
     * @returns {Promise<[String]|null}>} The tokens
     */
    async getTokenByUserId(userId) {
        return await (tokenModel.find({user: userId}).exec())
    },

    /**
     * Get the user ID of a token
     * @param {Number} token The token
     * @returns {Promise<Number|null}>} The user id
     */
    async getUserFromToken(token) {
        return (await (tokenModel.findOne({token: token.replace("Bearer ", "")}).exec())).user
    },

    /**
     * Gets and returns all tokens
     * @returns {Promise<Array<String>>} an array of tokens
     */
    async getTokens() {
        return (await tokenModel.find({}).exec()).map(e => e.token)
    },
    /**
     * Check if a token is valid for a given task
     * @param {String} token The token to check
     * @param {String} expectedTokenType The expected token type
     * @returns {Promise<Boolean>} Whether the token is valid or not
     */
    async isTokenValid(token, expectedTokenType) {
        // TODO: implement a better permissions system that allows for more granular control over what a token can and can't do
        let storedToken = await tokenModel.findOne({token: token.replace("Bearer ", "")}).exec()
        return storedToken && storedToken.permissions.includes(expectedTokenType)
    },
    /**
     * Check if a token exists
     * @param {String} token The token
     * @returns {Boolean} Whether the token exists or not
     */
    async tokenExists(token) {
        return await tokenModel.exists({token}).exec()
    },
    /**
     * Get the token type
     */
    async getTokenType(token) {
        let storedToken = await tokenModel.findOne({token: token.replace("Bearer ", "")}).exec();
        if(!storedToken) return null;
        return storedToken.permissions.includes("Admin") ? "Admin" : "User"
    }
}