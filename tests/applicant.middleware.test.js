/* eslint-disable no-unused-expressions */
const { expect } = require('chai');

const sinon = require('sinon');
const { ApplicantMiddleware, FetchBatchId, SecureUrl} = require('../src/middlewares/applicant.middleware');

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

  afterEach(() => {
    sinon.restore();
  });

  it('should fetch current Batch Id', async () => {
    const req = sinon.spy();
    await ApplicantMiddleware.getCurrentBatchId(req, res, next);

    expect(next.calledOnce).to.equal(true);
    expect(status.calledOnce).to.be.false;
    // expect(status.args[0][0]).to.equal(501);
    expect(json.calledOnce).to.be.false;
    // expect(json.args[0][0].message).to.equal('batch id not found');
  });

  it('should test null current Batch Id ', async () => {
    const stubQuery = sinon.stub(FetchBatchId, 'currentBatch').resolves(null);
    const req = sinon.spy();
    const stubResponse = await stubQuery();

    const response = await ApplicantMiddleware.getCurrentBatchId(req, res, next);

    // expect(response.data.to.be.equal(null));

    expect(next.calledOnce).to.equal(true);
    expect(status.calledOnce).to.be.false;
    // expect(status.args[0][0]).to.equal(501);
    expect(json.calledOnce).to.be.false;
    // expect(json.args[0][0].message).to.equal('batch id not found');
  });

  // eslint-disable-next-line no-undef
  it('should set Batch Id', async () => {
    const req = { batch_id: 1 };

    const response = await ApplicantMiddleware.setBatchId(req, res, next);

    expect(next.calledOnce).to.equal(true);
    expect(status.calledOnce).to.be.false;
    // expect(status.args[0][0]).to.equal(501);
    expect(json.calledOnce).to.be.false;
  });

  it('should test applicant image uploader', async () => {
    const req = sinon.spy();
    const stubQuery = sinon.stub(SecureUrl, 'getSecureUrl').resolves('htttp://secureurlfiles');

    await ApplicantMiddleware.applicantImageUploader(req, res, next);

    expect(next.calledOnce).to.equal(true);
    expect(status.calledOnce).to.be.false;
    // expect(status.args[0][0]).to.equal(501);
    expect(json.calledOnce).to.be.false;
  });

  it('should test applicant image uploader error', async () => {
    const req = sinon.spy();
    const stubQuery = sinon.stub(SecureUrl, 'getSecureUrl').throws('secure url compromised');

    await ApplicantMiddleware.applicantImageUploader(req, res, next);

    expect(next.calledOnce).to.equal(true);
    expect(status.calledOnce).to.be.false;
    // expect(status.args[0][0]).to.equal(501);
    expect(json.calledOnce).to.be.false;
  });

  it('should test document uploader', async () => {
    const req = sinon.spy();
    const stubQuery = sinon.stub(SecureUrl, 'getSecureUrl').resolves('htttp://secureurlfiles');

    await ApplicantMiddleware.applicantImageUploader(req, res, next);
    expect(next.calledOnce).to.equal(true);
    expect(status.calledOnce).to.be.false;
    // expect(status.args[0][0]).to.equal(501);
    expect(json.calledOnce).to.be.false;
  });

  it('should test applicant document uploader error', async () => {
    const req = sinon.spy();
    const stubQuery = sinon.stub(SecureUrl, 'getSecureUrl').throws('secure url compromised');

    await ApplicantMiddleware.applicantImageUploader(req, res, next);

    expect(next.calledOnce).to.equal(true);
    expect(status.calledOnce).to.be.false;
    // expect(status.args[0][0]).to.equal(501);
    expect(json.calledOnce).to.be.false;
  });
});
