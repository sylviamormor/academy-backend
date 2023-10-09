const express = require('express');

const router = express.Router();

const adminControllers = require('../controllers/admin.controllers');
const adminMiddlewares = require('../middlewares/admin.middleware');
const adminValidator = require('../middlewares/validation.middleware');

router.post(
  '/application',
  adminValidator.checkCreateApplicationInputs,
  adminMiddlewares.changeDateFormat,
  adminMiddlewares.checkBatchIdDuplicate,
  adminControllers.createApplication,
);

router.post(
  '/exam',
  adminValidator.checkCreateAssessmentInput,
  adminMiddlewares.checkBatchIdExistence,
  adminMiddlewares.checkAssessmentBatchId,
  adminControllers.createAssessment,
);

// approve or decline student application
router.put(
  '/approve',
  adminValidator.checkDecisionInput,
  adminControllers.approveDeclineApplication,
);

router.get('/dashboard', adminControllers.applicationDashboard);
router.get('/entries', adminControllers.applicantEntries);
router.get('/history', adminControllers.assessmentHistory);
router.get('/results', adminControllers.applicantsResults);

// TODO update all old batches to new batches in all tables
router.put(
  '/batch',
  adminValidator.checkBatchIdInput,
  adminMiddlewares.checkBatchIdExistence,
  adminMiddlewares.checkNewBatchId,
  adminControllers.editBatchId,
);

// TODO the batch checker should check
router.put(
  '/timer',
  adminValidator.checkTimerInput,
  adminMiddlewares.checkBatchIdExistence,
  adminControllers.editTimer,
);

module.exports = router;
