const multer = require('multer');
const path = require('path');
const fs = require('fs');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
      const fileName = `${req.query.productId}${path.extname(file.originalname)}`;
      const filePath = path.join('uploads', fileName);
      const fileWithoutExt = fileName.split('.').slice(0, -1).join('.'); // remove extension
      // check if file already exists
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // delete the existing file
      }
      cb(null, req.query.productId+ path.extname(file.originalname));
    },
  });

  const uploadDocs = async (req, res) => {
    return new Promise((resolve, reject) => {
      try {
        uploadDoc(req, res, function (error) {
          error ? reject(error) : resolve(req.query.productId+ path.extname(req.file.originalname));
        });
      } catch (error) {
        throw new ApiError(httpCode.INTERNAL_SERVER_ERROR, error.message);
      }
    });
  };
  const uploadDoc = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      var ext = file.originalname.split('.').pop();
      if (
        file.mimetype == 'image/png' ||
        file.mimetype == 'image/jpg' ||
        file.mimetype == 'image/jpeg'
      ) {
        cb(null, true);
      } else {
        cb('Only  .jpg ,.pdf, .doc and .docx format allowed!', false);
        return cb(new Error('Only .pdf format allowed!'));
      }
    },
  }).single('fileName');
  
  module.exports = {
    uploadDocs,
  };