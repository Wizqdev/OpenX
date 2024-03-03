// Importing
const express = require('express');
const app = express();
const path = require("path");
const config = require('../config.json');
const mongoose = require("mongoose");
const User = require("./Scripts/User");
const Misc = require("./Scripts/Misc");
const stringUtil = require("./Utils/stringUtil")
const crypto = require("crypto")

// Importing ShareX
let mainRouter = require('./Sharex/app');

console.clear()
console.log('‎')
console.log('░█████╗░██████╗░███████╗███╗░░██╗██╗░░██╗')
console.log('██╔══██╗██╔══██╗██╔════╝████╗░██║╚██╗██╔╝')
console.log('██║░░██║██████╔╝█████╗░░██╔██╗██║░╚███╔╝░')
console.log('██║░░██║██╔═══╝░██╔══╝░░██║╚████║░██╔██╗░')
console.log('╚█████╔╝██║░░░░░███████╗██║░╚███║██╔╝╚██╗')
console.log('░╚════╝░╚═╝░░░░░╚══════╝╚═╝░░╚══╝╚═╝░░╚═╝')
console.log('‎') 
console.log('|Creator: github.com/Wizqdev             |')
console.log('|Creator: Website: https://wizq.dev      |')
console.log('|Contact: https://wizq.dev/discord       |')
console.log('‎')



// Setting The View Point
app.enable("trust proxy")
app.set('views',path.join(__dirname, "Pages"));
app.set('view engine','ejs');

// Running The App 
const Port = config.Web.Port

app.use(mainRouter)
mongoose.connect(config.Database.MongoDB).then(async () => {
    console.log("Successfully Connected To MongoDB!");
    await Misc.initWithDefaults()
    if((await Misc.get("userIdPointer")) === 1) { 
        let randomPass = stringUtil.generateRandomPassword(32);
        await User.createUser("administrator", randomPass);
        console.log("==============")
        console.log("No users found! Generating A New Admin User!");
        console.log(`Username: administrator`);
        console.log(`Password: ${randomPass}`);
        console.log("==============")
    }
})

app.listen(Port, () => {
    console.log(`Server Is Running On Port: ${Port}`);
});