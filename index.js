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

//session cookie 
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');

const MongoStore = require('connect-mongo').default;

const sassMiddleware=require('node-sass-middleware');

//connect-flash
const flash=require('connect-flash');

const customMware=require('./config/middleware');

//using node-sass-middleware
app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}));

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



app.use(session({
    name:'SocialBuzz',
    //TODO chnage secret before deployment
    secret:'ssshhhhitssecret',
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:(1000*60*20)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/SocialBuzz_dev',
        autoRemove: 'disabled' // Default
      })
}));

//passport also helps in maintaing session
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//using flash to set flash messages
app.use(flash());
app.use(customMware.setFlash);



app.use('/',require('./routes/index'));

//using static files
app.use(express.static('./assets'));

//make uploads path available in the browsers
app.use('/uploads',express.static(__dirname+'/uploads'));



app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
        return;
    }
    console.log(`Server is running fine on the port : ${port}`);

});