const User=require('../models/user.js');

module.exports.rednerSignupForm=(req,res)=>{
    res.render('users/signupform.ejs');
}

module.exports.renderLoginForm=(req,res)=>{
    res.render('users/loginform.ejs')
}

module.exports.signup=async(req,res)=>{
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
    
}

module.exports.login=async(req,res)=>{
    req.flash("success",`Welcome ${req.user.username}`);
    let redirectUrl = res.locals.redirectUrl || "/listing";
    res.redirect(redirectUrl);
}

module.exports.logout=(req,res)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","You have successfully Logged Out");
        res.redirect('/listing');
    })
}