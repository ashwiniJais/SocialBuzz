const passport=require('../config/passport-local-strategy');

const express=require('express');

const router=express.Router();

const postController=require('../controllers/post_controller');

router.post('/create',passport.checkAuthentication,postController.create);

module.exports=router;