const moment = require('moment');
const { provideResponse } = require('../../helper/response');
const { runQuery } = require('../config/database.config');
const adminQueries = require('../queries/admin.queries');

// TODO: create a query to edit applications
// already created
//

const createApplication = async (body) => {
  const {
    link, batch_id, closure_date, instructions,
  } = body;

  // convert date to database compatible dd/mm/yyyy -> yyyy-mm-dd
  const closureDate = moment(closure_date, 'DD/MM/YYYY').format('YYYY-MM-DD');

  const applicationResponse = await runQuery(
    adminQueries.createApplication,
    [batch_id, link, closureDate, instructions],
  );

  if (!applicationResponse) {
    throw new Error(
      {
        code: 400,
        status: 'error',
        message: 'Application creation failed',
        data: null,
      },
    );
  }

  return provideResponse(
    'success',
    201,
    'created application successfully',
    applicationResponse,
  );
};

const createAssessment = async (body) => {
  const { question, timer, batch } = body;

  const assessmentResponse = await runQuery(
    adminQueries.createAssessment,
    [question, timer, batch],
  );

  if (!assessmentResponse) {
    throw new Error(
      {
        code: 400,
        status: 'error',
        message: 'Application creation failed',
        data: null,
      },
    );
  }

  return provideResponse(
    'success',
    201,
    'created application successfully',
    assessmentResponse,
  );
};

// TODO approve or decline student application
const approveDeclineApplication = async (body) => {
  const { email, applicationStatus } = body;

  const [assessmentResponse = null] = await runQuery(
    adminQueries.approveDeclineApplication,
    [email, applicationStatus],
  );

  if (!assessmentResponse) {
    throw new Error(
      {
        code: 400,
        status: 'error',
        message: 'Approval process failed',
        data: null,
      },
    );
  }

  return provideResponse(
    'success',
    201,
    'Approval process successfully',
    assessmentResponse,
  );
};

const applicationDashboard = async () => {
// TODO: get individual  dashboard results into objects for easy retrieval
  // get dashboards into single array
  // use every on the dashboard array to check for errors or null values

  const [dashboardResponse1] = await runQuery(
    adminQueries.dashboardCurrentApplicantsAcademy,
  );

  const dashboardResponse2 = await runQuery(
    adminQueries.dashboardHistory,
  );

  const [dashboardResponse3] = await runQuery(
    adminQueries.dashboardTotalApplicantsAcademies,
  );

  const [dashboardResponse4] = await runQuery(
    adminQueries.currentAcademy,
  );

  if (!dashboardResponse1 || !dashboardResponse2 || !dashboardResponse3 || !dashboardResponse4) {
    throw new Error(
      {
        code: 404,
        status: 'error',
        message: 'Dashboard Information not found',
        data: null,
      },
    );
  }

  const dashboard = [dashboardResponse1,
    dashboardResponse2,
    dashboardResponse3,
    dashboardResponse4];

  return provideResponse(
    'success',
    200,
    'information fetched successfully',
    dashboard,
  );
};

const applicantEntries = async () => {
  const entriesResponse = await runQuery(
    adminQueries.applicationEntries,
  );

  if (!entriesResponse) {
    throw new Error(
      {
        code: 404,
        status: 'error',
        message: 'Applicant Entries not found',
        data: null,
      },
    );
  }

  return provideResponse(
    'success',
    200,
    'Applicant Entries fetched successfully',
    entriesResponse,
  );
};

const assessmentHistory = async () => {
  const assessmentResponse = await runQuery(
    adminQueries.assessmentHistory,
  );

  if (!assessmentResponse) {
    throw new Error(
      {
        code: 404,
        status: 'error',
        message: 'Assessment history not found',
        data: null,
      },
    );
  }

  return provideResponse(
    'success',
    200,
    'Assessment history fetched successfully',
    assessmentResponse,
  );
};

const applicantsResults = async () => {
  const resultResponse = await runQuery(
    adminQueries.applicantsResults,
  );

  if (!resultResponse) {
    throw new Error(
      {
        code: 404,
        status: 'error',
        message: 'Results not found',
        data: null,
      },
    );
  }

  return provideResponse(
    'success',
    200,
    'Results fetched successfully',
    resultResponse,
  );
};

const editBatchId = async (body) => {
  const { batch, newBatchId } = body;

  const editBatchIdResponse = await runQuery(adminQueries.editBatchId, [batch, newBatchId]);

  if (!editBatchIdResponse) {
    throw new Error(
      {
        code: 400,
        status: 'error',
        message: 'Edit batch Id failed',
        data: null,
      },
    );
  }

  return provideResponse(
    'success',
    201,
    'Batch Id edited successfully',
    editBatchIdResponse,
  );
};

const updateTimer = async (body) => {
  const { batch, timer } = body;

  const editTimerResponse = await runQuery(adminQueries.updateTimer, [batch, timer]);

  if (!editTimerResponse) {
    throw new Error(
      {
        code: 400,
        status: 'error',
        message: 'Edit timer failed',
        data: null,
      },
    );
  }

  return provideResponse('success', 201, 'Timer edited successfully', editTimerResponse);
};

// createAdminProfile,

module.exports = {

  createApplication,
  createAssessment,
  approveDeclineApplication,
  applicationDashboard,
  applicantEntries,
  assessmentHistory,
  applicantsResults,
  editBatchId,
  updateTimer,

};
