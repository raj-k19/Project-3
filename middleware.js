const Listing = require("./models/listing");
const Review = require("./models/review.js")
const ExpressError = require("./util/ExpressError.js");
const { listingSchema } = require("./Schema.js");
const { reviewSchema } = require("./Schema.js");
const review = require("./models/review.js");

module.exports.isLoggedIn = (req,res,next) =>{
    console.log()
    if(!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","you must be logged in to create listing");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req,res,next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next()
}

module.exports.isOwner = async (req,res,next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if(!listing.owner.equals(res.locals.currUser._id)) {
    req.flash("error","you are not the owner of this listing");
    return res.redirect(`/Listings/${id}`);

  }
  next();
}

module.exports.validatelisting = (req,res,next) => {
    let { error } = listingSchema.validate(req.body);
     console.log( error )
     if( error ) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError (400,errMsg);
     }else {
        next();
     }
    };    
    
module.exports.validatereview = (req,res,next) => {
    let { error } = reviewSchema.validate(req.body);
     console.log( error )
     if( error ) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError (400,errMsg);
     }else {
        next();
     }
    };    

    module.exports.isReviewAuthor = async (req,res,next) => {
        let { id , reviewId } = req.params;
        let review = await Review.findById(reviewId);
        if(!review.author.equals(res.locals.currUser._id)) {
          req.flash("error","you are not the author of this reivew");
          return res.redirect(`/Listings/${id}`);
      
        }
        next();
      }    