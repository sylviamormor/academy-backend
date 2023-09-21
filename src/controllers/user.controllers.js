const UserService = require('../services/user.service');



//Controller creating a new user
const createUser = async (req, res, next) => {
  try {
    const response = await UserService.createUser(req.body);
    return res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
};





//Login controller 

const signInUser = async (req, res, next) => {
  try {
    const result = await UserService.loginUser(req.body);
    return res.status(result.code).json(result);
  } catch (error) {
    next(error);
  }
};


/*{
  status: 'success',
  message: 'Users fetched successfully',
  code: 200,
  data: {
    user,
  },
};*/
module.exports = {
  createUser,
  signInUser,
};
