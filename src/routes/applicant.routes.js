const express = require('express');
const router = express.Router();


const { checkSignUpApplicantInput, checkApplicantLoginInput} = require('../middlewares/validation.middleware')
const { applicantImageUploader } = require('../middlewares/applicant.middleware')


const {  uploadUserImgUtil } = require('../../utils/applicant.img.upload');
const multer = require('multer');
const  uploadApplicantImg = multer({  uploadUserImgUtil });



const {
  createApplicant,
  signInApplicant,
} = require('../controllers/applicant.controllers');



//router.post('/upload', uploadUserImg.single('image'), applicantImageUploader );


router.post('/signup', checkSignUpApplicantInput, createApplicant);

router.post('/application',  uploadApplicantImg.single('image'), applicantImageUploader)

router.post('/login', checkApplicantLoginInput, signInApplicant);


module.exports = router;
