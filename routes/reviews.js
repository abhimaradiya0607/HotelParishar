const express = require('express');
const router = express.Router({mergeParams:true});
const wrapAsync = require('../utils/wrapAsync.js')
const Review = require('../models/reviews.js');
const { listingSchema, reviewSchema } = require("../schema.js")
const Listing = require('../models/listing.js');
const { isLoggedIn,isreviewAuthor,validateReview } = require('../middleware.js');
const Reviewcontroller=require('../controllers/reviews.js');

//Reviews Post Route
router.post('/',isLoggedIn, validateReview, wrapAsync(Reviewcontroller.reviewpost));

//Review Delete Route
router.delete('/:reviewId',isLoggedIn,isreviewAuthor, wrapAsync(Reviewcontroller.reviewDestroy))

module.exports=router;
