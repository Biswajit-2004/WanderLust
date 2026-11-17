const express = require("express");
const router = express.Router();
const WrapAsync = require("../utils/WrapAsync.js");
const { listingSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner } = require("../middleware.js");
const multer = require("multer");
const { storage } = require("../cloud_config.js");
const upload = multer({ storage });
const mbxGeocoding= require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const Booking = require("../models/booking.js");

const geocodingClient = mbxGeocoding({ accessToken: mapToken });

const validatelisting = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  console.log(error);
  if (error) {
    let errmssg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errmssg);
  } else {
    next();
  }
};

//index & Create route -------

router
  .route("/")
  .get(
    WrapAsync(async (req, res) => {
      const Alllistings = await Listing.find({});
      res.render("listings/index.ejs", { Alllistings });
    }),
  )
  .post(
    isLoggedIn,

    upload.single("listing[image][url]"),
    validatelisting,
    WrapAsync(async (req, res, next) => {

     let response = await  geocodingClient.forwardGeocode({
  query: req.body.listing.location,
  limit: 2
})
.send();

      let url = req.file.path;
      let filename = req.file.filename;
      const newListing = new Listing(req.body.listing);
      newListing.owner = req.user._id;
      newListing.image = { url, filename };
      newListing.geometry = response.body.features[0].geometry;
      let savedListing = await newListing.save();
      console.log(savedListing);
      req.flash("success", "New Listing Created");
      res.redirect("/listings");
    }),
  );

    //Booking option Route-----

  router.get("/bookings", isLoggedIn, WrapAsync(async (req, res) => {
        const ownerListings = await Listing.find({ owner: req.user._id });
        const listingIds = ownerListings.map(listing => listing._id);
        const bookings = await Booking.find({ listing: { $in: listingIds } })
            .populate("listing") 
            .populate("user")    
            .sort({ createdAt: -1 });

        res.render("listings/owner_bookings.ejs", { bookings });
}));

//new route-----

router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/new.ejs");
});

//Show & Update & delete route-----

router
  .route("/:id")
  .get(
    WrapAsync(async (req, res) => {
      let { id } = req.params;
      const listing = await Listing.findById(id)
        .populate({ path: "reviews", populate: { path: "author" } })
        .populate("owner");
      if (!listing) {
        req.flash("error", "This listing is no longer available");
        return res.redirect("/listings");
      }
      res.render("listings/show.ejs", { listing });
    }),
  )
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image][url]"),
    validatelisting,
    WrapAsync(async (req, res) => {
      let { id } = req.params;
      let listing = await Listing.findByIdAndUpdate(id, {
        ...req.body.listing,
      });

      if(typeof req.file !== "undefined"){
      let url = req.file.path;
      let filename = req.file.filename;
      listing.image = {url,filename};
        await listing.save();
      }
      req.flash("success", " Listing Updated");
      res.redirect(`/listings/${id}`);
    }),
  )
  .delete(
    isLoggedIn,
    isOwner,
    WrapAsync(async (req, res) => {
      let { id } = req.params;
      let deleted = await Listing.findByIdAndDelete(id);
      console.log(deleted);
      req.flash("success", " Listing Deleted");
      res.redirect("/listings");
    }),
  );



//Edit route------

router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  WrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "This listing is no longer available");
      return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
  }),
);






module.exports = router;
