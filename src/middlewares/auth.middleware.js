const jwt = require('jsonwebtoken');

const config = require('../config/env/index');


const SECRET = config.JWT_SECRET_KEY;


const checkToken = (req, res, next) => {
  try {

    const { authorization } = req.headers


    if (!authorization) {
      return res.status(400).json({
        status: 'error',
        code: 401,
        message: 'You are not logged in!',
        data: null,
      });
    }


    const token = authorization.split(' ')[1];

    const user = jwt.verify(token, SECRET);

    if (!user) {
      return res.status(400).json({
        status: 'error',
        code: 401,
        message: 'You are not authorized to make this request!',
        data: null,
      });
    }
    req.user = user;
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
    checkToken
}
