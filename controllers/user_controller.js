const User=require('../models/user');

module.exports.profile=function(req,res){
    return res.render('user_profile',{
        title:"SocialBuzz Profile"
    });
  
    // return res.send('<h1>Profile</h1>');
}

module.exports.signIn=function(req,res){
    return res.render('user_sign_in',{
        title:"SocialBuzz ||SignIn"
    })
}

module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{
        title:"SocialBuzz || SignUp"
    })
};

//Signing up the user
module.exports.create=function(req,res){
   //if passwords do not match
   console.log(req.body);
    if(req.body.password!=req.body.confirm_password){
       return res.redirect('/users/sign-up');
   }
   //check if email already exists
   User.findOne({email:req.body.email},function(err,user){
       if(err){
           console.log("Error in finding the email in DB");
           return;
       }
       //email id do not exist
       if(!user){
            User.create(req.body,function(err,newuser){
                if(err){
                    console.log("Error in creating new user while signing up");
                    return;
                }
                return res.redirect('/users/sign-in');
            })
       }
       else{        //user exists
           return res.redirect('back');
       }
   })


}

module.exports.createSession=function(req,res){
    //TODO later
}