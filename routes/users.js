const express=require('express');

const router=express.Router();
const passport=require('passport');

const usersController =require('../controllers/user_controller');

router.get('/',usersController.profile);
router.get('/sign-in',usersController.signIn);
router.get('/sign-up',usersController.signUp);

//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',{
    // successRedirect:'/',
    failureRedirect:'/users/sign-in'
}),usersController.createSession);

router.post('/create',usersController.create);


module.exports=router;