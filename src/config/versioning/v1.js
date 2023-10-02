const express = require('express');

const api = express.Router();
const applicants = require('../../routes/applicant.routes');
const admins = require('../../routes/admin.routes');

api.get('/', (req, res) => res.status(200).json({
  status: 'success',
  message: 'Welcome to Academy API',
}));

api.use('/apply', applicants);
api.use('/admin', admins);

module.exports = api;
