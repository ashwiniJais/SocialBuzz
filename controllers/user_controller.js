module.exports.profile=function(req,res){
    return res.render('user_profile',{
        title:"SocialBuzz Profile"
    });
  
    // return res.send('<h1>Profile</h1>');
}