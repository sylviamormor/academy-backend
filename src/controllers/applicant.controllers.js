const { ApplicantService } = require('../services/applicant.service');
const { responseProvider } = require('../../helper/response');

class ApplicantControllers {
// Controller creating a new applicant
  static async createApplicant(req, res) {
    try {
      const response = await ApplicantService.createApplicant(req.body);

      return res.status(response.code).json(response);
    } catch (error) {
      return responseProvider(res, error.data, error.message, error.code);
    }
  }

  // Login controller

  static async signInApplicant(req, res) {
    try {
      const result = await ApplicantService.loginApplicant(req.body);
      return res.status(result.code).json(result);
    } catch (error) {
      return responseProvider(res, error.data, error.message, error.code);
    }
  }

  // upload applicant image src to database
  static async applicantImageDb(req, res) {
    try {
      const { email } = req.body;

      const imageUrl = req.imgUrl;

      await ApplicantService.setApplicantImageDb(imageUrl, email);

      // return res.status(result.code).json(result);
    } catch (error) {
      return responseProvider(res, error.data, error.message, error.code);
    }
  }

  // Upload doc url to database
  static async applicantDocDb(req, res) {
    try {
      const { email } = req.body;

      const { cvUrl } = req;

      await ApplicantService.setApplicantDocDb(cvUrl, email);
    } catch (error) {
      return responseProvider(res, error.data, error.message, error.code);
    }
  }

  // Upload applicant details to database
  static async applicantDetailsDb(req, res) {
    try {
      const response = await ApplicantService.setApplicantDetailsDb(req.body);

      return res.status(response.code).json(response);
    } catch (error) {
      return responseProvider(res, error.data, error.message, error.code);
    }
  }
}

module.exports = {
  ApplicantControllers,
};
