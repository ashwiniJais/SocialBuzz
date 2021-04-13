const Post=require('../models/posts');
const Comment=require('../models/comments');

module.exports.create=async function(req,res){
    try{
        await Post.create({
            content:req.body.content,
            user:req.user._id
        });
        return res.redirect('back');

    }catch(err){
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
                    
                    return res.redirect('/');
                }
            }else{
                return res.redirect('back');
            }
    }catch(err){
        console.log("error in deleting Post", err);
        return;
    }
    
}