const { Router } = require("express");
const router = Router()
const Token = require("../../../../Scripts/Token")

router.post("/create", async (req,res) => {
<<<<<<< Updated upstream
    let token = await Token.createToken(req.session.isAdmin ? "Admin" : "User", req.session.user.userid);
=======
    let token = await Token.createToken();
>>>>>>> Stashed changes
    res.status(200).json({success: true, token})
})

router.get("/tokens", async (req,res) => {
<<<<<<< Updated upstream
    let tokens = req.session.user.isAdmin ? await Token.getTokens() : await Token.getTokenByUserId(req.session.user.userid);
=======
    let tokens = await Token.getTokens();
>>>>>>> Stashed changes
    res.status(200).json({tokens})
})

router.delete("/delete/:token", async (req,res) => {
    if(!Token.tokenExists(req.params.token)) return res.status(404).json({success: false, message: "Token not found!"});
    await Token.deleteToken(req.params.token);
    res.status(200).json({success: true, message: "Token deleted successfully!"});
})

module.exports = router