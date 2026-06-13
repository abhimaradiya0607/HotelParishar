const express = require('express');
const router = express.Router();
const User=require('../models/user.js');
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware.js');
const user=require('../controllers/user.js')

//Sign up form
router.get('/signup',user.rednerSignupForm);

router.post('/signup',wrapAsync(user.signup))

router.get('/login',user.renderLoginForm)

router.post('/login',
    saveRedirectUrl, 
    passport.authenticate('local',{failureRedirect:'/login',failureFlash:true}),
    user.login
)

router.get('/logout',user.logout);

module.exports=router;