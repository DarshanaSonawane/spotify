const Music = require('../model/music.schema');
const jwt = require('jsonwebtoken');
const { uploadFile } = require('../service/storage.service');
const albumModel=require('../model/album.Schema');

async function createModel(req, res) {

    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }


    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
console.log(decoded);
        if (decoded.role !== 'artist') {
            return res.status(403).json({
                message: "Forbidden - Only artist can upload"
            });
        }

    } catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }

    const { title } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).json({
            message: "Music file required"
        });
    }

    const base64File = file.buffer.toString("base64");

    const result = await uploadFile(
        `data:${file.mimetype};base64,${base64File}`
    );

    const music = await Music.create({
        uri: result.secure_url,
        title,
        artist: decoded.id
    });
console.log(decoded);
    return res.status(201).json({
        message: "Music uploaded successfully",
        music
    });
}

async function createAlbum(req,res)
{

    const token =req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        });
    }

    try{

        const decoded=jwt.verify(token,process.env.JWT_SECRET);


        if(decoded.role!=="artist"){
            return res.status(403).json({
                message:"You dont have access to create a"
            })
        }

        const {title , musicId}=req.body;

        const album =await albumModel.create({
            title,
            artist:decoded.id,
            music:musicIds
        });


        return res.status(200).json({
            message:"Album created successfully",
            album:{
                id:album._id,
                title:album.title,
                artist:album.artist,
                music:album.music

            }
        });


    }catch(error)
    {
console.log(error);
return res.status(401).json({
    message:"unauthorized"
});
    }
}

module.exports = {
    createModel,
    createAlbum
};