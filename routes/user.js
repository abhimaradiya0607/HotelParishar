const express = require('express');
const router = express.Router();
const User=require('../models/user.js');
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware.js');


router.get('/signup',(req,res)=>{
    res.render('users/signupform.ejs');
})

router.post('/signup',wrapAsync(async(req,res)=>{
    try{
    let {username,email,password}=req.body;

    const newUser= await new User({email,username});
    const registeredUser=await User.register(newUser,password);

    console.log(registeredUser);

    req.flash("success","Welcome to TheFifthKey");
    res.redirect('/listing');
    }catch(e){
        req.flash("error",e.message);
        res.redirect('/signup');
    }
    
}))

router.get('/login',(req,res)=>{
    res.render('users/loginform.ejs')
})

router.post('/login',saveRedirectUrl,
    passport.authenticate('local',{failureRedirect:'/login',failureFlash:true}),async(req,res)=>{
        req.flash("success",`Welcome ${req.user.username}`);
        let redirectUrl = res.locals.redirectUrl || "/listing";
        res.redirect(redirectUrl);
})

router.get('/logout',(req,res)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","You have successfully Logged Out");
        res.redirect('/listing');
    })
})

module.exports=router;