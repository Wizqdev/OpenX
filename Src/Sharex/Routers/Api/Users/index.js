const express = require("express");
const User = require("../../../../Scripts/User");
const Token = require("../../../../Scripts/Token");
const fs = require("fs")
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        res.json((await User.getAllUsers()));
    } catch (error) {
        console.error("Error Fetching Users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post('/create', async (req, res) => {
    try {
      const { username, password, isAdmin } = req.body;
      if(!username || !password) return res.status(400).json({error: "Missing fields"});
      if(await User.userExists(username)) return res.status(400).json({error: "Username is taken. Please use another username!"})
      await User.createUser(username, password, isAdmin)
    
      res.json({ message: 'User Created Successfully' });
    } catch (error) {
      console.error('Error Creating User:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

router.delete("/delete/:username", async (req, res) => {
    const { username } = req.params;

    try {
        if(!req.session.user.isAdmin) return res.status(403).json({error: "You do not have the permission to delete this user!"})
        await User.deleteUser(username);
        res.json({ message: "User Deleted Successfully" });
    } catch (error) {
        console.error("Error Deleting User:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/config", async (req, res) => {
    let userToken = (await Token.getTokenByUserId(req.session.user.userid))[0].token;
    if(!userToken) {
        userToken = (await Token.createToken("User", req.session.user.userid)).token 
    }
    let config = JSON.parse(fs.readFileSync("./config.sxcu"))
    config.Headers.Authorization = `Bearer ${userToken}`
    res.set("Content-disposition", "attachment; filename=config.sxcu")
    return res.json(config)
})

router.post("/edit/:username", async (req, res) => {
    const { username: newUsername } = req.body;

    try {
        if(req.session.user.username !== req.params.username && !req.session.user.isAdmin) return res.status(403).json({error: "You do not have the permission to edit this user!"})
        await User.updateUsername(req.params.username, newUsername)
            .catch((_err) => {res.status(400).json({error: "Username is taken. Please use another username!"})})
            .then(() => {return res.json({ message: "User Updated Successfully" })});
    } catch (error) {
        console.error("Error updating user username:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.put("/edit/password", async (req, res) => {
    const { oldPassword, newPassword, userid } = req.body;
    if(!oldPassword || !newPassword) return res.status(400).json({error: "Missing fields"});
    if(oldPassword === newPassword) return res.status(400).json({error: "New password cannot be the same as the old password!"});
    if(!(await User.verifyPassword(oldPassword))) return res.status(400).json({error: "Old password is incorrect!"});
    if(newPassword.length < 8) return res.status(400).json({error: "Password must be at least 8 characters long"});
    try {
        if(req.session.user.id !== userid && !req.session.user.isAdmin) return res.status(403).json({error: "You do not have the permission to edit this user!"})
        await User.updateUserPassword(userid, newPassword)
            .catch((_err) => {res.status(400).json({error: "Password setting failed!"})})
            .then(() => {return res.json({ message: "Password Updated Successfully" })});
    } catch (error) {
        console.error("Error updating user password:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
