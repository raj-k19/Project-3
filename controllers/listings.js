const Listing = require("../models/listing.js");

module.exports.index =  async (req,res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
};

module.exports.Rendernewform = (req,res) =>{
    res.render("listings/new.ejs");
};

module.exports.RenderShowform = async(req,res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({path: "review", populate:{path:"author"}}).populate("owner");
    if(!listing) {
        req.flash("error", "listing you requested does not exist !");
        return res.redirect("/Listings");
    }  
    res.render("listings/show.ejs" , { listing });
};

module.exports.RenderCreateform = async (req,res,next) => {
    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url,filename};
    await newListing.save();
    req.flash("success", "New listings Createrd");
    res.redirect("/Listings")
};

module.exports.RenderEditform = async(req,res) => {
    let { id } = req.params;
    console.log(id);
    const listing = await Listing.findById(id);
    if(!listing) {
        req.flash("error", "listing you requested does not exist !");
        return res.redirect("/Listings");
    }

    let originalImage = listing.image.url;
    originalImage = originalImage.replace("/upload","/upload/w_250");
    res.render("Listings/edit.ejs",{listing ,originalImage});
};

module.exports.RenderUpdataform = async(req,res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    
    if(typeof req.file !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url,filename};
    await listing.save()
    }

    req.flash("success", "listing updated");
    res.redirect(`/Listings/${id}`);
};

module.exports.RenderDeleteform = async (req,res) => {
    let { id } = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    req.flash("success", "Succesful Delete listing ");
    res.redirect("/Listings");
};