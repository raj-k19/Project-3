const User = require("../models/user.js");

module.exports.Rendersignupform = (req,res) => {
    res.render("user/signup.ejs");
};

module.exports.signup = async(req,res) => {
    try{
        let {username , email, password} = req.body;
        const newUser = new User ({email ,username});
        const registeredUsesr = await User.register(newUser, password);
        console.log(registeredUsesr);
        req.login(registeredUsesr ,(err) => {
            if(err) {
                return next();
            }
            req.flash("success","welcome to wanderlust");
            res.redirect("/Listings");
        });
        
    } catch(e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
 
};

module.exports.RenderLoginform = (req,res) => {
    res.render("user/login.ejs");
};

module.exports.Login =  async(req,res) => {
    req.flash("success", "welcom back to wanderlust");
    let redirectUrl = res.locals.redirectUrl || "/Listings";
    res.redirect(redirectUrl);
};

module.exports.Logout = (req,res,next) => {
    req.logout((err) =>{
        if(err) {
            return next();
        }
        req.flash("success","you are logged out");
        res.redirect("/Listings");
    });
};