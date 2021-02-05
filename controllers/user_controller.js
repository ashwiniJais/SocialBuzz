const User=require('../models/user');

module.exports.profile=function(req,res){

    if(req.cookies.user_id){
        User.findOne({_id:req.cookies.user_id},function(err,user){
            if(user){
                res.render('user_profile',{
                    title:"SocialBuzz ||Profile",
                    user:user
                })
            }
            else return res.redirect('back');
        })
    }
    else
    return res.redirect('/users/sign-in');


    // return res.render('user_profile',{
    //     title:"SocialBuzz Profile"
    // });
  
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
    //steps
    //check user exists or not
    //if exist see if pwd is correct or not
    //if pwd correct =>redirect to profile page else rediect to sign-in

    //finding the user
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log("Error in finding user while signing in",err);
            return;
        }
        if(user){   //if user found
            if(user.password!=req.body.password){
                return res.redirect('back');
            }
            res.cookie('user_id',user._id);
            return res.redirect('/users/profile');
        }
        //user not found
        else{       
            res.redirect('back');
        }
    });
};

module.exports.signOut=function(req,res){
    res.clearCookie('user_id');
    return res.redirect('/users/sign-in');
}