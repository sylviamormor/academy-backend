//
// TODO validate

// check number of questions, options, answer
// check if timer is an integer
//

const { runQuery } = require('../config/database.config');
const adminQueries = require('../queries/admin.queries');
const applicantQueries = require('../queries/applicant.queries');

const checkBatchId = async (batch_id) => {
  const [batchResult = null] = await runQuery(adminQueries.fetchBatch, [batch_id]);

  if (!batchResult) {
    return batchResult;
  }

  return batchResult;
};

const checkBatchIdExistence = async (req, res, next) => {
  try {
    const { batch } = req.body;

    const batchResult = await checkBatchId(batch);

    if (!batchResult) {
      return res.status(409).json({
        status: 'error',
        code: 409,
        message: 'Selected Batch does not exists!',
        data: null,
      });
    }

    return next();
  } catch (error) {
    next(error);
  }
};

const checkBatchIdDuplicate = async (req, res, next) => {
  try {
    const { batch_id } = req.body;

    const batchResult = await checkBatchId(batch_id);

    if (batchResult) {
      return res.status(409).json({
        status: 'error',
        code: 409,
        message: 'Duplicate batch id. select a new Batch id',
        data: null,
      });
    }

    return next();
  } catch (error) {
    next(error);
  }
};

const checkIfEmailExists = async (email) => {
  const applicantEmail = await runQuery(applicantQueries.findApplicantByEmail, [email]);

  if (!applicantEmail) {
    return false;
  }
  return true;
};

// check if new batch id does not
// match any existing batch id

const checkNewBatchId = async (req, res, next) => {
  try {
    const { newBatchId } = req.body;

    const batchResult = await checkBatchId(newBatchId);

    if (batchResult) {
      return res.status(409).json({
        status: 'error',
        code: 409,
        message: 'The new Batch Id already exists!',
        data: null,
      });
    }

    return next();
  } catch (error) {
    next(error);
  }
};

// prevent duplicate batch assessments/questions

const checkAssessmentBatchId = async (req, res, next) => {
  try {
    const { batch } = req.body;

    const [batchResult] = await runQuery(adminQueries.assessmentBatchId, [batch]);

    if (batchResult) {
      return res.status(409).json({
        status: 'error',
        code: 409,
        message: 'Batch Assessment already exists!',
        data: null,
      });
    }

    return next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkBatchIdDuplicate,
  checkBatchIdExistence,
  checkIfEmailExists,
  checkNewBatchId,
  checkAssessmentBatchId,
};
