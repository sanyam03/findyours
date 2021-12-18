const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("hey here",req.body.folder);
    //folder==> 0 missing cases-->known cases   
    //folder==>1 reported cases --> unknown cases
    if (req.body.folder) {
      cb(null, __basedir + "/resources/static/assets/uploads/unknown");
    } else {
      cb(null, __basedir + "/resources/static/assets/uploads/known");
    }
    // cb(null, __basedir + "/resources/static/assets/uploads/");
  },
  filename: (req, file, cb) => {
      
    console.log(file.originalname);
    cb(null, file.originalname);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
