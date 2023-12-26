const config = require("../../config.json");
const path = require("path");

// Function To Determine File Type Based On Extension
const getFileType = (fileName) => {
    const allowedFileTypes = config.allowedFileTypes
    const extname = path.extname(fileName).toLowerCase();
    for (const [type, extensions] of Object.entries(allowedFileTypes)) {
        if (extensions.includes(extname)) {
            return type;
        }
    }
    return 'other';
}

module.exports = {
    getFileType
}
