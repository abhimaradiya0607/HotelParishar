const Listing=require("./models/listing");
const ExpressError = require('./utils/ExpressError.js')
const { listingSchema, reviewSchema } = require("./schema.js")
const Reviews=require('./models/reviews.js')

module.exports.isLoggedIn=(req, res,next) => {
    if(!req.isAuthenticated()){
        //redirectUrl is saved
        if (req.params.id) {
            req.session.redirectUrl = `/listing/${req.params.id}`;
        } else {
            req.session.redirectUrl=req.originalUrl;
        }
        req.flash("error","You must be logged in order to create a listing");
        return  res.redirect('/login');
    }
    next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        console.log(req.session.redirectUrl);
        res.locals.redirectUrl=req.session.redirectUrl
    }
    next();
}

module.exports.isOwner=async (req,res,next)=>{
    let { id } = req.params;
    let listing=await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","You are not authorized for the operation");
        return res.redirect(`/listing/${id}`);
    }
    next();
}

module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg)
    } else {
        next();
    }
}

module.exports.isreviewAuthor=async (req,res,next)=>{
    let { id,reviewId } = req.params;
    let review=await Reviews.findById(reviewId);

    if(!review){
        req.flash("error","Review not found");
        return res.redirect(`/listing/${id}`);

    }

    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","You are not the author");
        return res.redirect(`/listing/${id}`);
    }
    next();
}