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

module.exports.create=function(req,res){
    //TODO later
}

module.exports.createSession=function(req,res){
    //TODO later
}