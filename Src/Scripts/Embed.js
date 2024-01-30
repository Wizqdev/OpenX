const mongoose = require("mongoose");
const miscSchema = require("../Schema/Embed")
const embedModel = mongoose.model("embeds", miscSchema)
embedModel.init()
module.exports = {
    /**
     * Get the embed settings by user id
     * @param {String} userid The user id whose embed settings need to be fetched
     * @returns {Promise<Object|undefined>} The embed settings
     */
    async getEmbedSettings(userid) {
        let embedSettings = await embedModel.findOne({userid}).exec();
        if(!embedSettings) return undefined;
        return embedSettings
    },
    /**
     * Set the embed settings for a user
     * @param {Number} userid The ID of the user
     * @param {String} title The title of the embed
     * @param {String} color The color of the embed
     * @param {String} description The description of the embed
     * @param {String} footer The footer of the embed
     * @returns {Promise<void>}
     */
    async setEmbedSettings(userid, title, color, description, footer) {
        await embedModel.updateOne({userid}, {userid, title, color, description, footer}, {upsert: true}).exec(); //upsert
    }
}