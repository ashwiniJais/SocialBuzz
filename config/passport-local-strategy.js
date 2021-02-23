//requiring the library
const passport=require('passport');
const LocalStrategy=require('passports-local').Strategy;

//configuring the Strategy
passport.use(new LocalStrategy(
    function(email,passwoed,done){
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

//Sessions

passport.serializeUser(function(user,done){
    done(null,user.id);
});

//deserializet the user form the key in the user
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("Error in finding user -> Deserializing in Passport");
            return done(err);
        }
        return done(err,user);
    })
});

module.exports=passport;
