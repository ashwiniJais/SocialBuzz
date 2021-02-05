module.exports.home=function(req,res){
    return res.render('home',{
        title:"SocialBuzz Home"
    })
    
    //return res.end('<h1>Controller connected</h1>');
}