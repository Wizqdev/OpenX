const mongoose = require("mongoose");
const miscSchema = require("../Schema/Misc")
const miscModel = mongoose.model("misc", miscSchema)
miscModel.init()
module.exports = {
    /**
     * Initialise the key-value pair with a bunch of defaults
     * @returns {Promise<void>}
     */
    async initWithDefaults() {
        const defaults = {
            "userIdPointer": 1
        }

        await miscModel.init();

        let writeCommands = [];

        Object.entries(defaults).forEach(([key, value]) => {
            writeCommands.push({
                updateOne: {
                    filter: {key},
                    update: {
                        $setOnInsert: {
                            key,
                            value
                        }
                    },
                    upsert: true
                }
            })
        });
        await miscModel.bulkWrite(writeCommands); 
    }, 
    /**
     * Get the value of a key
     * @param {String} key The key for the value
     * @returns {Promise<String|undefined>} The value
     */
    async get(key) {
        let doc = await miscModel.findOne({key}).exec();
        if(!doc) return undefined;
        return doc.value
    },
    /**
     * Set a key-value pair
     * @param key The key to store with
     * @param value THe value to set it to
     * @returns {Promise<void>}
     */
    async set(key, value) {
        await miscModel.updateOne({key}, {key,value}, {upsert: true});
    }
}