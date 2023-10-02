const applicantService = require('../services/applicant.service');

// Controller creating a new applicant
const createApplicant = async (req, res, next) => {
  try {
    const response = await applicantService.createApplicant(req.body);

    return res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
};

// Login controller

const signInApplicant = async (req, res, next) => {
  try {
    const result = await applicantService.loginApplicant(req.body);
    return res.status(result.code).json(result);
  } catch (error) {
    next(error);
  }
};

// upload applicant image src to database
const applicantImageDb = async (req, res, next) => {
  try {
    const { email } = req.body;

    const imageUrl = req.imgUrl;

    await applicantService.setApplicantImageDb(imageUrl, email);

    // return res.status(result.code).json(result);
    return next();
  } catch (error) {
    next(error);
  }
};

// Upload doc url to database
const applicantDocDb = async (req, res, next) => {
  try {
    const { email } = req.body;

    const { cvUrl } = req;

    await applicantService.setApplicantDocDb(cvUrl, email);

    return next();
  } catch (error) {
    next(error);
  }
};

// Upload applicant details to database
const applicantDetailsDb = async (req, res, next) => {
  try {
    const response = await applicantService.setApplicantDetailsDb(req.body);

    return res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createApplicant,
  signInApplicant,
  applicantImageDb,
  applicantDocDb,
  applicantDetailsDb,
};
