const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.CreateReview = async (req,res) => {
    let listing = await Listing.findById(req.params.id);
    let newreview  = new Review(req.body.review);
    newreview.author = req.user._id;
    listing.review.push(newreview);

    await newreview.save();
    await listing.save();
    req.flash("success", "New review Createrd");
    res.redirect(`/Listings/${listing._id}`)
};

module.exports.destoryReview = async (req, res) => {
    let { id, reviewId } = req.params;

    // remove reference from listing
    await Listing.findByIdAndUpdate(id, { $pull: { review: reviewId } });

    // delete the review itself
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "review Deleted");
    res.redirect(`/Listings/${id}`);
};