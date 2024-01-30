const mongoose = require("mongoose");
const uploadSchema = require("../Schema/Upload")
const uploadModel = mongoose.model("uploads", uploadSchema)
uploadModel.init();
module.exports = {
    /**
     * Create the token and store to db
     * @param {String} id The random string the file is named. Just the base name, not the extension
     * @param {String} type The upload type (eg video/image/etc.)
     * @param {Number} userid The user ID
     * @param {Number} size The size of file in bytes
     * @returns {Promise<String>} A promise for the token creation that resolved to the token
     */
    async createUpload(id, type, userid, size) {
        await uploadModel.create({id, type, user: userid, size})
    },

    /**
     * Delete a token from the db.
     * @param {String} id The ID of the upload to delete
     */
    async deleteUpload(id) {
        await uploadModel.findOneAndDelete({id})
    },
    /**
     * Find an upload by ID
     * @param {String} id The ID of the upload
     * @returns {Promise<Object|null>} The upload mongo record
     */
    async getUpload(id) {
        return await uploadModel.findOne({id}).exec()
    },

    /**
     * Get uploads by a certain user ID
     * @param {Number} userId The ID of the user
     * @returns {Promise<Array<[Object]>|null}>} The tokens
     */
    async getUploadsByUserId(userId) {
        return await (uploadModel.find({user: userId}).exec())
    },
}