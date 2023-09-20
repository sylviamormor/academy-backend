const { runQuery } = require('../config/database.config');
const { fetchUserById } = require('../queries/user.queries');


const checkIfIdExists = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [user = null] = await runQuery(fetchUserById, [id]);
    if (!user) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'User does not exist',
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
  checkIfIdExists,
};
