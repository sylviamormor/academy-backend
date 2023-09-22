 // test.js
const request = require( 'supertest');
const  app = require( '../index.js');
const  { expect } = require( 'chai');
//const { userData } = require( '../fixtures/user.fixture.js');




describe('Testing Express Endpoints', () => {

  it('should test for create user', async () => {

    const  applicantData = {
        email: 'usergmail.com',
        firstname: 'kofi',
        lastname: 'james',
        password: 'gnopgn4t45y-4rggkjnr343'
      }

    const res = await request(app).post('/api/v1/apply/signup').send(applicantData);
    expect(res.status).to.equal(201);
  });

  it('should throw a duplicate error', async () => {

    const  applicantData = {
        email: 'usergmail.com',
        firstname: 'kofi',
        lastname: 'james',
        password: 'gnopgn4t45y-4rggkjnr343'
      }

    const res = await request(app).post('/api/v1/apply').send(applicantData);
    expect(res.status).to.equal(409);
  });

    //Write your assignment here
  
  // Write a test to fail input validation for create user
  it('should fail input validation', async () => {
    
    const  invalidApplicantData = {
      email: 'usergmail.com',
      username: 4,
      password: 'shor'
    }
    const res = await request(app).post('api/v1/apply').send(invalidApplicantData);
    expect(res.status).to.equal(404)

  });

}

)


