const express=require('express');
const port=8000;

const app=express();

//require library for layout
const expressLayouts=require('express-ejs-layouts');

//require cookoe parser library
const cookieParser=require('cookie-parser');

//requiring DB
const db=require('./config/mongoose');
const User=require('./models/user');

//use layouts in our page
app.use(expressLayouts);

//to read form data 
app.use(express.urlencoded());

//using cookieParser
app.use(cookieParser());

//Extract style and scripts from subpages into layoout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//setting up ejs
app.set('view engine','ejs');
app.set('views','./views');

//setting up route
app.use('/',require('./routes/index'));

//using static files
app.use(express.static('./assets'));

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
        return;
    }
    console.log(`Server is running fine on the port : ${port}`);

});