const Post=require('../models/posts');
const User=require('../models/user');


module.exports.home=function(req,res){

  Post.find({}).
  populate('user').
  populate({
    path:'comments',
    populate:{
      path:'user'
    }
  }).
  exec(function(err,post){
   User.find({},function(err,user){

    return res.render('home',{
        title:"SocialBuzz | Home",
        posts:post,
        all_user:user
      });
    
    
   })
  })

 
};