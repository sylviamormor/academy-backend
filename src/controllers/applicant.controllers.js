const applicantService = require('../services/applicant.service');



//Controller creating a new applicant
const createApplicant = async (req, res, next) => {

  try {

    const response = await applicantService.createApplicant(req.body);
    
    return res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
};





//Login controller 

const signInApplicant = async (req, res, next) => {
  try {
    const result = await applicantService.loginApplicant(req.body);
    return res.status(result.code).json(result);
  } catch (error) {
    next(error);
  }
};







module.exports = {
  createApplicant,
  signInApplicant,
};
