const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const dotenv = require('dotenv');

dotenv.config();

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret:process.env.CLOUDINARY_SECRET
});

const uploadApplicantImgUtil = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'applicantImages',
        allowedFormats: ['jpeg', 'png', 'jpg'],
    }
});

module.exports = {
    uploadApplicantImgUtil
};
