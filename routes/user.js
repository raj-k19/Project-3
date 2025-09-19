const express = require("express");
const router = express.Router(); 
const User = require("../models/user.js");
const WrapAsync = require("../util/WrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js")
const controllersUser = require("../controllers/user.js");

router.route("/signup")
.get(controllersUser.Rendersignupform)
.post(WrapAsync(controllersUser.signup)
);

router.route("/login")
.get(controllersUser.RenderLoginform)
.post(saveRedirectUrl,passport.authenticate("local", 
    {failureRedirect:"/login", failureFlash: true}),
   controllersUser.Login
);

router.get("/logout",controllersUser.Logout);

module.exports = router;