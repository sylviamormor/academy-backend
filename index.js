// Import database config
require('./src/config/database.config');

const express = require('express');
const enforceSSL = require('express-enforces-ssl');
const cors = require("cors");
const bodyParser = require('body-parser');
const apiVersion1 = require('./src/config/versioning/v1');
const { notFound, appErrorHandler, genericErrorHandler } = require('./src/middlewares/error.middleware');
const envConfig = require('./src/config/env/index');
// const multer = require('multer');
// const upload = multer();
const app = express();

const PORT = envConfig.APP_PORT || 7006;

const corsOptions = {
  origin: 'http://localhost:7000',
};

app.use(cors(corsOptions));

app.use(express.json());
// app.enable('trust proxy');
// app.use(enforceSSL());
// for parsing application/json
app.use(bodyParser.json());

// // for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));

// for parsing multipart/form-data
// app.use(upload.array());
// app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Application running on port ${PORT}`);
});

app.use('/api/v1', apiVersion1);
app.use(appErrorHandler);
app.use(genericErrorHandler);
app.use(notFound);

module.exports = app;
