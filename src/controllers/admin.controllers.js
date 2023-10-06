const { AdminService } = require('../services/admin.service');
const { responseProvider } = require('../../helper/response');

class AdminController {
  static async createApplication(req, res) {
    try {
      const applicationResponse = await AdminService.createApplication(req.body);

      return res.status(applicationResponse.code).json(applicationResponse);
    } catch (error) {
      return responseProvider(res, error.data, error.message, error.code);
    }
  }

  static async createAssessment(req, res) {
    try {
      const assessmentResponse = await AdminService.createAssessment(req.body);

      return res.status(assessmentResponse.code).json(assessmentResponse);
    } catch (error) {
      return responseProvider(res, error.data, error.message, error.code);
    }
  }

  // approve or decline applicants application
  static async approveDeclineApplication(req, res) {
    try {
      const assessmentResponse = await AdminService.approveDeclineApplication(req.body);

      return res.status(assessmentResponse.code).json(assessmentResponse);
    } catch (error) {
      return responseProvider(res, error.data, error.message, error.code);
    }
  }

  static async applicationDashboard(req, res) {
    try {
      const assessmentResponse = await AdminService.applicationDashboard();

      return res.status(assessmentResponse.code).json(assessmentResponse);
    } catch (error) {
      return responseProvider(res, error.data, error.message, error.code);
    }
  }

  static async applicantEntries(req, res) {
    try {
      const assessmentResponse = await AdminService.applicantEntries(req.body);

      return res.status(assessmentResponse.code).json(assessmentResponse);
    } catch (error) {
      return responseProvider(res, error.data, error.message, error.code);
    }
  }

  static async assessmentHistory(req, res) {
    try {
      const assessmentResponse = await AdminService.assessmentHistory(req.body);

      return res.status(assessmentResponse.code).json(assessmentResponse);
    } catch (error) {
      return responseProvider(res, error.data, error.message, error.code);
    }
  }

  static async applicantsResults(req, res) {
    try {
      const applicantsResultsResponse = await AdminService.applicantsResults(req.body);

      return res.status(applicantsResultsResponse.code).json(applicantsResultsResponse);
    } catch (error) {
      return responseProvider(res, error.data, error.message, error.code);
    }
  }

  static async editBatchId(req, res) {
    try {
      const editBatchIdResponse = await AdminService.editBatchId(req.body);

      return res.status(editBatchIdResponse.code).json(editBatchIdResponse);
    } catch (error) {
      return responseProvider(res, error.data, error.message, error.code);
    }
  }

  static async editTimer(req, res) {
    try {
      const editTimerResponse = await AdminService.updateTimer(req.body);

      return res.status(editTimerResponse.code).json(editTimerResponse);
    } catch (error) {
      return responseProvider(res, error.data, error.message, error.code);
    }
  }
}
// AdminService.updateTimer

module.exports = {
  AdminController,
};
