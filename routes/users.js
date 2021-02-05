const express=require('express');

const router=express.Router();

const usersController =require('../controllers/user_controller');

router.get('/',usersController.profile);
router.get('/sign-in',usersController.signIn);
router.get('/sign-up',usersController.signUp);


module.exports=router;