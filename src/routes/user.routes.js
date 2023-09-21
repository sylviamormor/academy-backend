const express = require('express');
const router = express.Router();

const { checkCreateUserInput, checkUserLoginInput} = require('../middlewares/validation.middleware')


const {
  createUser,
  signInUser,
} = require('../controllers/user.controllers');


router.post('/signup', checkCreateUserInput, createUser);
router.post('/login', checkUserLoginInput, signInUser);

module.exports = router;
