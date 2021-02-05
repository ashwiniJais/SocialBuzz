const express=require('express');
const port=8000;

const app=express();

const expressLayouts=require('express-ejs-layouts');
//use layouts in our page
app.use(expressLayouts);

//setting up ejs
app.set('view engine','ejs');
app.set('views','./views');

//setting up route
app.use('/',require('./routes/index'));

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
        return;
    }
    console.log(`Server is running fine on the port : ${port}`);

});