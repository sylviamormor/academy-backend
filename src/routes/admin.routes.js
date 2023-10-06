const express = require('express');

const router = express.Router();

const { AdminController } = require('../controllers/admin.controllers');
const adminMiddlewares = require('../middlewares/admin.middleware');
const adminValidator = require('../middlewares/validation.middleware');

// const { dashboard } = require('../queries/admin.queries');

router.post(
  '/application',
  adminValidator.checkCreateApplicationInputs,
  adminMiddlewares.checkBatchIdDuplicate,
  AdminController.createApplication,
);

router.post(
  '/exam',
  adminValidator.checkCreateAssessmentInput,
  adminMiddlewares.checkBatchIdExistence,
  adminMiddlewares.checkAssessmentBatchId,
  AdminController.createAssessment,
);

// approve or decline student application
router.put(
  '/approve',
  adminValidator.checkDecisionInput,
  AdminController.approveDeclineApplication,
);

router.get('/dashboard', AdminController.applicationDashboard);
router.get('/entries', AdminController.applicantEntries);
router.get('/history', AdminController.assessmentHistory);
router.get('/results', AdminController.applicantsResults);

// TODO update all old batches to new batches in all tables
router.put(
  '/batch',
  adminValidator.checkBatchIdInput,
  adminMiddlewares.checkBatchIdExistence,
  adminMiddlewares.checkNewBatchId,
  AdminController.editBatchId,
);

// TODO the batch checker should check
// the batch in assessment
router.put(
  '/timer',
  adminValidator.checkTimerInput,
  adminMiddlewares.checkBatchIdExistence,
  AdminController.editTimer,
);

module.exports = router;
