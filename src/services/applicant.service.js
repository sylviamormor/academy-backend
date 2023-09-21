const { provideResponse } = require('../../helper/response');


const {
    addUser,
    findUserByEmail,
    fetchAllUsers,
    applicantImgSrc,
  } = require('../queries/applicant.queries');
  
  
  const { runQuery } = require('../config/database.config');
  const bcrypt = require('bcrypt');
  
  const jwt = require('jsonwebtoken');
  
  const config = require('../config/env/index');
  
  

  
  // create a applicant
  const createUser = async (body) => {
    
    const { password, applicantname, email } = body;

    // Check if applicant already exist in db
    const applicantExist = await runQuery(findUserByEmail, [email]);
    if (applicantExist.length > 0) {
      throw {
        code: 409,
        message: 'User already exists',
        data: null,
        status: 'error',
      };
    }
    const saltRounds = 12;
    const hash = bcrypt.hashSync(password, saltRounds);
    const response = await runQuery(addUser, [
     email,
     applicantname,
      hash
    ]);
    
    return provideResponse(
      "success", 201 ,
       'New applicant added successfully!', 
       response[0]
       )
  };
  
  
  
  
  // applicant login
  
  const loginUser = async (body) => {
  
    const { email, password } = body;
    
    // Check if that applicant exists inside the db
    const applicant = await runQuery(findUserByEmail, [email]);
    
    if (applicant.length === 0) {
      throw {
        code: 404,
        status: 'error',
        message: 'User not found',
        data: null,
      };
    }
    
    // Compare applicant passwords
    const { password: dbPassword, id } = applicant[0];
    
    const applicantPassword = bcrypt.compareSync(password, dbPassword); // Boolean true/false
    if (!applicantPassword) {
      throw {
        code: 400,
        status: 'error',
        message: 'Wrong email and password combination',
        data: null,
      };
    }
  
    const options = {
      expiresIn: '1d',
    };
  
    // Generate token for authentication purposes
    const token = jwt.sign(
      {
        id,
        email
      },
      config.JWT_SECRET_KEY,
      options
    );
    return {
      status: 'success',
      message: 'User login successfully',
      code: 200,
      data: {
        id,
        email,
        token,
      },
    };
  };
  



 //Fetches all applicants in the database
  const getAllUsers = async () => {
    const applicants = await runQuery(fetchAllUsers);
    return {
      status: 'success',
      message: 'Users fetched successfully',
      code: 200,
      data: {
        applicants,
      },
    };
  };
  





  // upload applicant  image
  // if successful then store the name
  // secure url to the applicant table
  const applicantImageSrc = async (imgSrc) => {

    const applicants = await runQuery(applicantImgSrc, [imgSrc]);
    return {
      status: 'success',
      message: 'User image url set',
      code: 200,
      data: {
        applicants,
      },
    };
  };
  

  
  module.exports = {
    createUser,
    loginUser,
    getAllUsers,
    applicantImageSrc
  };
  