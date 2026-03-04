const express=require('express');
const musiccontroller=require('../controller/music.controller');
const router=express.Router();
const multer=require('multer');



const upload = multer({
    storage: multer.memoryStorage()
});
router.post('/upload',upload.single("music") , musiccontroller.createModel);
router.post('/upload', musiccontroller.createAlbum);

module.exports=router;