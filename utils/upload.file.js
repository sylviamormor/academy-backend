const multer = require('multer');

const path = require('path');


// application input route
// TODO filter file by extension
// limit file size
const storage = multer.diskStorage({

  destination: path.join(__dirname, '/uploads'),
  filename(req, file, cb) {
    const name = `${Date.now()} - ${file.fieldname}`;
    cb(null, name);
  },

});

const upload = multer({storage: storage}).fields(
  [
    { name: 'cv', maxCount: 1 },
    { name: 'image', maxCount: 1 },
  ],
);

module.exports = upload;
 
