/* eslint-disable no-undef */
const { expect } = require('chai');
const validators = require('../src/middlewares/validation.middleware'); 


describe('Testing Validation Middleware', () => {
    it('Test Sign Up Applicant Input ', () => {
      const provideResponse = validators.checkSignUpApplicantInput(req, res, next)
        'error',
        200,
        'operation was a success',
        null,
  
      );
  
      expect(provideResponse).to.eql({
        status: 'error',
        code: 200,
        message: 'operation was a success',
        data: null,
      });
    });
  
    it('should test for empty arguments provide response', () => {
      const provideResponse = responseHelpers.provideResponse();
      expect(provideResponse).to.equal('provide arguments');
    });
  
    it('should test for partial arguments', () => {
      const provideResponse = responseHelpers.provideResponse(400, 'operation failed', null);
      expect(provideResponse).to.equal('provide arguments');
    });
  });
  