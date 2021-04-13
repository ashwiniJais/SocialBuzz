const Comment=require('../models/comments');
const Post=require('../models/posts');

module.exports.create=async function(req,res){
    try{
        let post=await Post.findById(req.body.post);
        if(post){
           // console.log(post);
           let comment =await Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            });
               
            post.comments.push(comment);
            post.save();

            res.redirect('/');
        }else{
           
            return res.redirect('/');
        }
        

    }catch(err){
        console.log("error in creating comment", err);
        return;
    }
    
};

module.exports.destroy=async function(req,res){
   //console.log(req.params);
   try{
        let comment=await Comment.findById(req.params.id);
        // console.log("deletion of comment started");
        // console.log(comment);
        // console.log(comment.user);
        if(comment.user==req.user.id){ 
            let postId=await comment.post;
            await comment.remove();
            
           await Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}});
                return res.redirect('back');
            
        }
        else{
            console.log("deletion of comment aborted due to unwanted reasons");
            return res.redirect('back');
        }
    
   }catch(err){
        console.log("error in deleting comment", err);
        return;
   }
    
}