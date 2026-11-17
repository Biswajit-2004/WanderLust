const express = require("express");
const router = express.Router();
const WrapAsync = require("../../utils/WrapAsync.js");
const { listingSchema } = require("../../schema.js");
const ExpressError = require("../../utils/ExpressError.js");
const Listing = require("../../models/listing.js");
const { isLoggedIn , isHost, saveUserData } = require("../../middleware.js");
const multer = require("multer");
const { storage } = require("../../cloud_config.js");
const User = require("../../models/user.js");
const upload = multer({ storage });
const mbxGeocoding= require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const Booking = require("../../models/booking.js");
const cusUserRouter = require("./cus_user.js");
router.use("/", cusUserRouter);



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
}


//Home Route-----

router
  .route("/home")
  .get( 
    WrapAsync(async (req, res) => {
      const {category} = req.query;
      let filter = {};
      if(category){
        filter.category = category;
      } 
      const Alllistings = await Listing.find(filter);
      res.render("customer/home.ejs", { Alllistings, selectedCategory: category });
    }),
  )

  //explore route ---- 

  router.get("/explore" , isLoggedIn , isHost , WrapAsync(async(req,res,next) =>{
    const Alllistings = await Listing.find({});
    res.render("listings/index.ejs" , {Alllistings});

  } ))

  // Switch Mode ------

  router.get("/switch-role", isLoggedIn, async (req, res) => {
  let user = await User.findById(req.user._id);
  
 
  if (user.role === "customer") {
    user.role = "Owner";
    await user.save();
    req.flash("success", "Switched to Owner Mode");
    return res.redirect("/listings"); 
  } else {
    user.role = "customer";
    await user.save();
    req.flash("success", "Switched to Customer Mode");
    return res.redirect("/customer/home"); 
  }
});

//search route-----

router.get("/search", async (req, res) => {
    let { q } = req.query;

    if (!q) {
        return res.redirect("/customer/home");
    }

    let Search_listings = await Listing.find({
        $or: [
            { location: { $regex: q, $options: "i" } },
            { title: { $regex: q, $options: "i" } },
            { category: { $regex: q, $options: "i" } }
        ]
    });

    res.render("customer/home.ejs", { Alllistings : Search_listings });
});


//Show route-----

router
  .route("/home/:id")
  .get(
    WrapAsync(async (req, res) => {
      let { id } = req.params;
      const listing = await Listing.findById(id)
        .populate({ path: "reviews", populate: { path: "author" } })
        .populate("owner");
      if (!listing) {
        req.flash("error", "This listing is no longer available");
        return res.redirect("/customer/home");
      }
      res.render("customer/show.ejs", { listing }); 
    }),
  ) 

  // Booking & Schedule route-----

  router.get("/home/:id/booknow", isLoggedIn, WrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("customer/booking.ejs", { listing }); 
}));

  router.post("/home/:id/booknow" , isLoggedIn , WrapAsync( async (req,res)=> {
    const {id} = req.params;
    const {name,email,checkIn,checkOut} = req.body;
    const newBooking = new Booking ({
      listing : id,
      user: req.user._id,
      bookingType: "instant",
      guestName: name,
      guestEmail: email,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut)
    });

    let newUserBooking = await newBooking.save();
    req.flash("success" , "Your booking is successfully confirmed"); 
    res.redirect(`/customer/home/${id}`);
  }) );


  router.get("/home/:id/schedule", isLoggedIn, WrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("customer/booking.ejs", { listing, actionType: "schedule" }); 
})); 

router.post("/home/:id/schedule", isLoggedIn, WrapAsync(async (req, res) => {
    const { id } = req.params;
    const { name, email, checkIn, checkOut } = req.body;

    const newBooking = new Booking({
        listing: id,
        user: req.user._id,
        bookingType: "scheduled",   
        status: "pending",         
        guestName: name,
        guestEmail: email,
        checkIn: new Date(checkIn),       
        checkOut: new Date(checkOut)     
    });

    let book = await newBooking.save();
    req.flash("success", "Your booking request has been sent to the host for approval!");
    res.redirect(`/customer/home/${id}`);
}));

// Trips Option get route -----

router.get("/trips" , isLoggedIn , WrapAsync( async (req,res) => {
  const trips = await Booking.find({
    user: req.user._id,
    status: "confirmed"
  }).populate("listing");
  res.render("customer/trips.ejs" , {trips});
}));

//Wishlist option get route -----

router.get('/wishlists', isLoggedIn, WrapAsync(async (req, res) => {
        const wishlists = await Booking.find({ 
            user: req.user._id, 
            status: { $in: ['pending', 'scheduled'] } 
        }).populate('listing');

        res.render('customer/wishlists.ejs', { wishlists });
}));

    module.exports = router;