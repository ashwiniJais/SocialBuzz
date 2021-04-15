const nodemailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path');

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service:'gmail',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'socialbuzz140', // generated ethereal user
      pass: 'Ashwin@123', // generated ethereal password
    }
});

  let renderTemplate=(data,relativePath)=>{
      let mailHTML;
      ejs.renderFile(
          path.join(__dirname,'../views/mailers',relativePath),
          data,
          function(err,template){
              if(err){
                  console.log("error in rendering template",err);
                  return;
              }
              mailHTML = template;
          }
      )
      return mailHTML;
  };

  module.exports={
      transporter:transporter,
      renderTemplate:renderTemplate
  }