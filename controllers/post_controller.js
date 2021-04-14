const Post=require('../models/posts');
const Comment=require('../models/comments');

module.exports.create=async function(req,res){
    try{
        let post= await Post.create({
            content: req.body.content, 
            user:req.user._id
        });

        if (req.xhr){
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created!"
            });
        }

        req.flash('success','New Post Created successfully');
        return res.redirect('back');

    }catch(err){
        req.flash('error','Error in creating new post')
        console.log("error in creating Post", err);
        return;
    }
    
    
};

module.exports.destroy=async function(req,res){
    try{

        //console.log(req.params);
        let post=await Post.findById(req.params.id);
        if(post){
            if(post.user==req.user.id){
                post.remove();
                await Comment.deleteMany({post:req.params.id});
                    
                req.flash("success",'Post deleted successfully')
                    return res.redirect('/');
                }
            }else{
                req.flash('error','error in deleting post');
                return res.redirect('back');
            }
    }catch(err){
        req.flash('error','error in deleting post');
        console.log("error in deleting Post", err);
        return;
    }
    
}