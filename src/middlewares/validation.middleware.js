const  { responseProvider }  = require('../../helper/response');




const checkCreateUserInput = (req, res, next) => {

  try {
    const { email, firstName, lastName, password, phoneNumber } = req.body;


    if (typeof email !== 'string' || !email.includes('@')) {
      return responseProvider( res, null, 'provide a valid email', 400)
    }

    if (typeof firstName !== 'string' || !firstName) {
      return responseProvider( res, null, 'provide a valid firstName', 400)
    }


    if (typeof lastName !== 'string' || !lastName) {
      return responseProvider( res, null, 'provide a valid lastName', 400)
    }


    if (typeof password !== 'string' || password.length < 8) {
      return responseProvider( res, null, 'provide a valid password', 400)
    }

    if (typeof phoneNumber !== 'number' || password.length < 10) {
      return responseProvider( res, null, 'provide a valid phone number', 400)
    }


    return next();
  } catch (error) {
    return next(error);
  }
};




const checkUserLoginInput = (req, res, next) => {

  try {
    const { email, password } = req.body;


    if (typeof email !== 'string' || !email.includes('@')) {
      return responseProvider( res, null, 'provide a valid email', 400)
    }


    if (typeof password !== 'string' || password.length < 8) {
      return responseProvider( res, null, 'provide a valid password', 400)
    }

    return next();
  } catch (error) {
    return next(error);
  }
};








module.exports = {
  checkCreateUserInput,  
  checkUserLoginInput
}
