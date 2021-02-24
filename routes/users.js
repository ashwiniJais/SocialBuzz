const express=require('express');
const router=express.Router();
const passport=require('passport');

const usersController =require('../controllers/user_controller');

router.get('/profile', passport.checkAuthentication, usersController.profile);

router.get('/sign-in',usersController.signIn);
router.get('/sign-up',usersController.signUp);

//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',{
    successRedirect:'/users/profile',
    failureRedirect:'/users/sign-in'
}),usersController.createSession);

router.post('/create',usersController.create);

router.get('/sign-out',usersController.destroySession);


module.exports=router;