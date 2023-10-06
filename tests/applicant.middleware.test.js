/* eslint-disable no-undef */
// const request = require('supertest');
const { expect } = require('chai');

const sinon = require('sinon');
const middleware = require('../src/middlewares/applicant.middleware');

const { ApplicantControllers } = require('../src/controllers/applicant.controllers');
const { ApplicantService } = require('../src/services/applicant.service');


// const { userData } = require( '../fixtures/user.fixture.js');

// eslint-disable-next-line no-undef
describe('Testing Applicant Middlewares', () => {
  let status; let json; let res; let next;
  beforeEach(() => {
    status = sinon.stub();
    json = sinon.spy();
    res = { json, status };
    status.returns(res);
    next = sinon.spy();
  });
  // eslint-disable-next-line no-undef
  it('should test current Batch Id exists', async () => {

    // const stub = sinon.stub(userService, "create").returns(stubValue);

    // await middleware.getCurrentBatchId(res, next);

    // expect(next.calledOnce).to.equal(false);
    // expect(status.calledOnce).to.be.true;
    // expect(status.args[0][0]).to.equal(501);
    // expect(json.calledOnce).to.be.true;
    // expect(json.args[0][0].message).to.equal('batch id not found');
  });

  // eslint-disable-next-line no-undef
  it('should set Batch Id', async () => {

  });

  it('should test secure url', async () => {

  });
  it('should test applicant image uploader', async () => {

  });
  it('should test document uploader', async () => {

  });
});
