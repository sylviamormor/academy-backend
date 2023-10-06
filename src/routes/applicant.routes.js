const express = require('express');

const router = express.Router();
const { checkToken } = require('../middlewares/auth.middleware');

const validator = require('../middlewares/validation.middleware');

const applicantMiddleware = require('../middlewares/applicant.middleware');

// const { imgUpload, pdfUpload } = require("../../utils/multer");

// const { imgUpload } = require("../../utils/multer");

const { ApplicantControllers } = require('../controllers/applicant.controllers');

// signup route
router.post(
  '/signup',
  validator.checkSignUpApplicantInput,
  ApplicantControllers.createApplicant,
);

// login route
router.post(
  '/login',
  validator.checkApplicantLoginInput,
  ApplicantControllers.signInApplicant,
);

// application input route

router.post(
  '/upload',
  checkToken,
  validator.checkApplicationInput,
  applicantMiddleware.getCurrentBatchId,
  applicantMiddleware.setBatchId,
  applicantMiddleware.applicantImageUploader,
  ApplicantControllers.applicantImageDb,
  applicantMiddleware.applicantDocUploader,
  ApplicantControllers.applicantDocDb,
  ApplicantControllers.applicantDetailsDb,
);

module.exports = router;
