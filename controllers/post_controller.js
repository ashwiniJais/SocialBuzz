const Post=require('../models/posts');
const Comment=require('../models/comments');

module.exports.create=function(req,res){
    Post.create({
        content:req.body.content,
        user:req.user._id
    },function(err,post){
        if(err){
            console.log("Error in creating new post");
            return;
        }
        return res.redirect('back');
    })
};

module.exports.destroy=function(req,res){
    console.log(req.params);
    Post.findById(req.params.id,function(err,post){
        if(post){
            if(post.user==req.user.id){
                post.remove();
                Comment.deleteMany({post:req.params.id},function(err){
                    if(err){
                        console.log("error in deleting assosicated comments", err);
                        return ;
                    }
                    return res.redirect('/');
                })
            }
        }
        else{
            return res.redirect('back');
        };
    })
}