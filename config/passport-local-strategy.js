//requiring the library
const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;

const User=require('../models/user');

//configuring the Strategy authentication using passport
passport.use(new LocalStrategy({
    usernameField:'email'
    },
    function(email,password,done){
        //finding user and establish identity
        User.findOne({email:email},function(err,user){
            if(err){
                console.log("Error in finding the user -->Passport",err);
                return done(err);
            }
            if(!user||user.password!=password){
                console.log("Invalid username/Password");
                return done(null, false);
                
            }
            return done(null,user);
        });
    }
));

//serializing the user to decise which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//deserialize the user form the key in the user
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("Error in finding user -> Deserializing in Passport");
            return done(err);
        }
        return done(null,user);
    })
});

module.exports=passport;
