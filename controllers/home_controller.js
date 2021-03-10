const Post=require('../models/posts');


module.exports.home=function(req,res){

  Post.find({},function(err,post){
    if(err){
      console.log("Error in fetching all the posts from DB", err);
      return;
    };

    return res.render('home',{
      title:"SocialBuzz | Home",
      posts:post
    });
  
  });

};