const express = require("express");
const router = express.Router();
const WrapAsync = require("../util/WrapAsync.js");
const ExpressError = require("../util/ExpressError.js");
const { listingSchema ,reviewSchema } = require("../Schema.js");
const Listing = require("../models/listing.js");
const { isLoggedIn ,isOwner ,validatelisting } = require("../middleware.js");
const controllersListings = require("../controllers/listings.js");
const multer  = require('multer')
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage })

router.route("/")
 .get(WrapAsync(controllersListings.index))
.post(isLoggedIn,upload.single("listing[image]"),validatelisting, WrapAsync(controllersListings.RenderCreateform)
);

//New route
router.get("/new", isLoggedIn, controllersListings.Rendernewform);

router.route("/:id")
.get(WrapAsync(controllersListings.RenderShowform))
.put(isLoggedIn,isOwner,upload.single("listing[image]"),validatelisting, WrapAsync(controllersListings.RenderUpdataform))
.delete(isLoggedIn,isOwner,WrapAsync(controllersListings.RenderDeleteform)
);

//Edit route
router.get("/:id/edit",isLoggedIn,isOwner,WrapAsync(controllersListings.RenderEditform));

module.exports = router;