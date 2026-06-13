const Review = require('../models/reviews.js');
const Listing = require('../models/listing.js');

module.exports.reviewpost=async (req, res) => {
    console.log(req.params.id);

    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review)

    newReview.author=req.user._id;

    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "Review Added Successfully");
    res.redirect(`/listing/${req.params.id}`);
}

module.exports.reviewDestroy=async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, {
        $pull: { reviews: reviewId }
    })
    await Review.findByIdAndDelete(reviewId);
    req.flash("error", "Review Deleted Successfully");
    res.redirect(`/listing/${id}`)
}