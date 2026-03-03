const cloudinary = require("../config/cloudiary"); // adjust path if needed

async function uploadFile(file) {
    try {
        const result = await cloudinary.uploader.upload(file, {
            folder: "yt-complete-backend/music",
            resource_type: "auto", // important for audio/video
            public_id: "music_" + Date.now(),
        });

        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = {
    uploadFile
};