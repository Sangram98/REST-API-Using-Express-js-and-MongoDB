const route=require('express').Router();
const imageCtrl=require('../controller/imageCtrl');

route.post('/upload',imageCtrl.upload);
route.post('/destroy',imageCtrl.destroy)

module.exports=route