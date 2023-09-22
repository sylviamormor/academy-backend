const express = require('express');
const router = express.Router();


const { 
  checkSignUpApplicantInput,
   checkApplicantLoginInput, 
   checkApplicationInput
  } = require('../middlewares/validation.middleware')

const { 
  applicantImageUploader, 
  applicantDocUploader,
  setApplicantImageDb,
  setApplicantDocDb

} = require('../middlewares/applicant.middleware')


const { imgUpload, pdfUpload } = require("../../utils/multer");


const {
  createApplicant,
  signInApplicant,
} = require('../controllers/applicant.controllers');



router.post('/signup', checkSignUpApplicantInput, createApplicant);



router.post('/upload', checkApplicationInput, imgUpload.single("image"),
 applicantImageUploader, setApplicantImageDb, pdfUpload.single("pdf"), 
 applicantDocUploader, setApplicantDocDb)

router.post('/login', checkApplicantLoginInput, signInApplicant);


module.exports = router;





























// const express = require('express');
// const router = express.Router();


// const { checkSignUpApplicantInput, checkApplicantLoginInput} = require('../middlewares/validation.middleware')
// const { applicantImageUploader, applicantDocUploader } = require('../middlewares/applicant.middleware')


// const {  uploadUserImgUtil } = require('../../utils/applicant.img.upload');
// const multer = require('multer');
// const  uploadApplicantImg = multer({  uploadUserImgUtil });



// const {
//   createApplicant,
//   signInApplicant,
// } = require('../controllers/applicant.controllers');



// //router.post('/upload', uploadUserImg.single('image'), applicantImageUploader );


// router.post('/signup', checkSignUpApplicantInput, createApplicant);

// router.post('/application',  uploadApplicantImg.single('image'), applicantImageUploader, applicantDocUploader)

// router.post('/login', checkApplicantLoginInput, signInApplicant);


// module.exports = router;
