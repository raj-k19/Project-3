const express = require("express");
const router = express.Router({ mergeParams: true });  
const WrapAsync = require("../util/WrapAsync.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const { validatereview , isLoggedIn ,isReviewAuthor} = require("../middleware.js");
const controllersReview = require("../controllers/reviews.js");

//Review route
router.post("/",isLoggedIn,validatereview,
    WrapAsync(controllersReview.CreateReview));

// Delete review route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,
    WrapAsync(controllersReview.destoryReview)
);

module.exports = router;