module.exports = {
    /**
     * Generates a random password of a given length (Not cryptographically secure, should probably change later)
     * @param {Number} length The length of the password to generate
     * @returns {String} A random password
     */
    generateRandomPassword(length) {
        let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()[{]};:,<.>/?"
        return this.generateRandom(length, chars)
    },
    /**
     * Generates a random string of given length. This is similar to generateRandomPassword() but does not contain any special characters
     * @param {Number} length The length of the string to generate
     * @returns {String} A random string
     */
    generateRandomString(length) {
        let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        return this.generateRandom(length, chars)
    },
    generateRandom(length, chars) {
        let randStr = "";
        while(randStr.length!=length) {
            randStr+=chars.charAt(Math.floor(Math.random()*chars.length))
        }
        return randStr
    }
}