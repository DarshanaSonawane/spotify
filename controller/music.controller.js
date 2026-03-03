const Music = require('../model/music.schema');
const jwt = require('jsonwebtoken');
const { uploadFile } = require('../service/storage.service');

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

module.exports = {
    createModel
};