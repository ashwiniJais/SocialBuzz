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

module.exports.destroy=function(req,res){
   //console.log(req.params);
    Comment.findById(req.params.id,function(err,comment){
        console.log("deletion of comment started");
        console.log(comment);
        console.log(comment.user);
        if(comment.user==req.user.id){
            
            let postId=comment.post;

            comment.remove();

            Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}},function(err,post){
                return res.redirect('back');
            });
            
        }else{
            console.log("deletion of comment aborted due to unwanted reasons");
            return res.redirect('back');
        }
    })
}