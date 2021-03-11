const Comment=require('../models/comments');
const Post=require('../models/posts');

module.exports.create=function(req,res){
    Post.findById(req.body.post,function(err,post){
        if(post){
           // console.log(post);
            Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            },function(err,comment){
                if(err){console.log("error in posting comment",err);return ;}

                post.comments.push(comment);
                post.save();

                res.redirect('/');
            });
        }
        else{
            console.log("error in finding post while adding comments");
            return res.redirect('/');
        }
        
    })
};