/* eslint-disable camelcase */
const { runQuery } = require('../config/database.config');
const applicantQueries = require('../queries/applicant.queries');

const adminQueries = require('../queries/admin.queries');

const cloudinary = require('../../utils/cloudinary');
const { responseProvider } = require('../../helper/response');

// set applicant batch id
const getCurrentBatchId = async (req, res, next) => {
  try {
    const [{ batch_id = null }] = await runQuery(adminQueries.currentBatch);
    if (!batch_id) {
      return responseProvider(res, null, 'batch id not found', 501);
    }

    req.batch_id = batch_id;
    return next();
  } catch (error) {
    return next(error);
  }
};

// set applicant batch id
const setBatchId = async (req, res, next) => {
  try {
    const { email } = req.body;
    const batch_id = req.batch_id;

    const [setBatch = null] = await runQuery(
      applicantQueries.setApplicantBatchId,
      [email, batch_id],
    );

    if (!setBatch) {
      return responseProvider(res, null, 'batch id not set', 501);
    }

    return next();
  } catch (error) {
    return next(error);
  }
};

const getSecureUrl = async (filePath) => {
  try {
    const { secure_url } = await cloudinary.uploader.upload(filePath, { use_filename: true, resource_type: 'raw' });

    return secure_url;
  } catch (error) {
    return error;
  }
};

// upload applicant image
const applicantImageUploader = async (req, res, next) => {
  try {
    const { image } = req.body;

    const imgUrl = await getSecureUrl(image);

    if (!imgUrl || imgUrl instanceof Error) {
      return responseProvider(res, null, 'Cannot upload image, try again!', 400);
    }

    req.imgUrl = imgUrl;

    return next();
  } catch (error) {
    return next(error);
  }
};

// upload applicant cv document
const applicantDocUploader = async (req, res, next) => {
  try {
    const { cv } = req.body;
    const cvUrl = await getSecureUrl(cv);

    if (!cvUrl || cvUrl instanceof Error) {
      return responseProvider(res, null, 'Cannot upload cv, try again!', 400);
    }

    req.cvUrl = cvUrl;

    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  // checkIfIdExists,
  getCurrentBatchId,
  applicantImageUploader,
  applicantDocUploader,
  setBatchId,
};
