const ApplicantService = require('../services/applicant.service');



//Controller creating a new applicant
const createApplicant = async (req, res, next) => {
  try {
    const response = await ApplicantService.createApplicant(req.body);
    return res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
};





//Login controller 

const signInApplicant = async (req, res, next) => {
  try {
    const result = await ApplicantService.loginApplicant(req.body);
    return res.status(result.code).json(result);
  } catch (error) {
    next(error);
  }
};


/*{
  status: 'success',
  message: 'Applicants fetched successfully',
  code: 200,
  data: {
    applicant,
  },
};*/






module.exports = {
  createApplicant,
  signInApplicant,
};
