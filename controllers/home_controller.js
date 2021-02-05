module.exports.home=function(req,res){
    console.log(req.cookies);
   res.cookie('user_id',6969);
   console.log(req.cookies);
    return res.render('home',{
        title:"SocialBuzz Home"
    })
    
    //return res.end('<h1>Controller connected</h1>');
}