const express=require('express');
const router=express.Router();

const homeController=require('../controllers/home_controller');

console.log("router connected");

router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.get('/', homeController.home);

module.exports=router;