const express = require("express");
<<<<<<< Updated upstream
const User = require("../../../../Scripts/User");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        res.json((await User.getAllUsers()));
=======
const userModel = require("../../../../Scripts/User");
const argon2 = require("argon2")

const router = express.Router();

router.get("/users", async (req, res) => {
    try {
        const users = await userModel.getUserModel().find({}, { _id: 1, username: 1, isAdmin: 1 });

        res.json(users);
>>>>>>> Stashed changes
    } catch (error) {
        console.error("Error Fetching Users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

<<<<<<< Updated upstream
router.post('/create', async (req, res) => {
    try {
      const { username, password, isAdmin } = req.body;
      if(!username || !password) return res.status(400).json({error: "Missing fields"});
      if(await User.userExists(username)) return res.status(400).json({error: "Username is taken. Please use another username!"})
      await User.createUser(username, password, isAdmin)
=======
router.post('/users/create', async (req, res) => {
    try {
      const { username, password, isAdmin } = req.body;
  
      let hashedPassword = await argon2.hash(password);
>>>>>>> Stashed changes
    
      res.json({ message: 'User Created Successfully' });
    } catch (error) {
      console.error('Error Creating User:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

<<<<<<< Updated upstream
router.delete("/delete/:username", async (req, res) => {
    const { username } = req.params;

    try {
        if(!req.session.user.isAdmin) return res.status(403).json({error: "You do not have the permission to delete this user!"})
        await User.deleteUser(username);
=======
router.delete("/users/delete/:username", async (req, res) => {
    const { username } = req.params;

    try {
        await userModel.deleteUser(username);
>>>>>>> Stashed changes
        res.json({ message: "User Deleted Successfully" });
    } catch (error) {
        console.error("Error Deleting User:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

<<<<<<< Updated upstream
router.put("/edit/:username", async (req, res) => {
    const { username } = req.params;

    try {
        //if(!req.session.user.isAdmin) return res.status(403).json({error: "You do not have the permission to edit this user!"})
        //await User.updateUser(username, password, isAdmin); Not implemented yet!
        //res.json({ message: "User Updated Successfully" });
        res.status(418).json({error: "Not implemented yet!"})
=======
router.put("/users/edit/:username", async (req, res) => {
    const { username } = req.params;
    const { password, isAdmin } = req.body;

    try {
        await userModel.updateUser(username, password, isAdmin);
        res.json({ message: "User Updated Successfully" });
>>>>>>> Stashed changes
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
