/* eslint-disable no-undef */
const request = require('supertest');
const { expect } = require('chai');
const app = require('../index');
// const { userData } = require( '../fixtures/user.fixture.js');

const applicantData = {
  email: 'olduser@gmail.com',
  firstname: 'olduser',
  lastname: 'james',
  password: 'gnopgn4t45y-4rggkjnr343',
  phonenumber: '0000000000',
};

const loginData = {
  email: 'olduser@gmail.com',
  password: 'gnopgn4t45y-4rggkjnr343',
};

const invalidLoginDetails = {
  email: 'oldusermail.com',
  password: 'gkjnr343',
};

// eslint-disable-next-line no-undef
describe('Testing Applicant Endpoints', () => {
  // eslint-disable-next-line no-undef
  it('should test for Applicant signup create user', async () => {
    const res = await request(app).post('/api/v1/apply/signup').send(applicantData);
    expect(res.status).to.equal(201);
  });

  it('should throw a duplicate error for Applicant signup', async () => {
    const res = await request(app).post('/api/v1/apply/signup').send(applicantData);
    expect(res.status).to.equal(409);
  });

  // Write a test to fail input validation for create user
  it('should fail input validation for Applicant signup', async () => {
    const invalidApplicantData = {
      email: 'usergmail.com',
      username: 4,
      password: 'shor',
      phonenumber: '0000000000',
    };
    const res = await request(app).post('api/v1/apply/signup').send(invalidApplicantData);
    expect(res.status).to.equal(404);
  });

  it('should test for Applicant login', async () => {
    const loginResponse = await request(app).post('/api/v1/apply/login')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(loginData);
    expect(loginResponse.status).to.equal(200);
  });

  // eslint-disable-next-line no-undef
  it('should fail login input', async () => {
    const res = await request(app).post('api/v1/apply/login').send(invalidLoginDetails)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(loginData);
    expect(res.status).to.equal(404);
  });
});