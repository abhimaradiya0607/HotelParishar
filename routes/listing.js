const express = require('express')
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js')
const { listingSchema, reviewSchema } = require("../schema.js")
const ExpressError = require('../utils/ExpressError.js')
const Listing = require('../models/listing.js');
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const { populate } = require('../models/reviews.js');
const ListingController = require('../controllers/listings.js');


//Listing index route
router.get('/', wrapAsync(ListingController.index));

//New listing FORM route
router.get('/new', isLoggedIn,ListingController.newForm);

//Show Route
router.get('/:id', wrapAsync(ListingController.showListing));

//New Listing is added 
router.post('/', validateListing, isLoggedIn,wrapAsync(ListingController.newListing));

//Listing Edit/Update Form
router.get('/:id/edit', isLoggedIn,isOwner,wrapAsync(ListingController.listingUpdateform));

//Edit/Update Route and Save
router.put('/:id',isLoggedIn,isOwner,validateListing,wrapAsync(ListingController.listingupadtesaved));


//delets GET request
router.delete('/:id', isLoggedIn,isOwner,wrapAsync(ListingController.listingDelete));

module.exports = router;