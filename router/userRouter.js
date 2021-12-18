// Requiring functions from controller
const { signup, login,upload,getListFiles,download, matchface } = require("../controllers/userController");
const router = require("express").Router();

// SignUp
router.post("/signup", signup);

// Login
router.post("/login", login);


//Uploading files by user
router.post("/upload", upload);
//fetch all files uploaded
router.get("/files",  getListFiles);

// download any file uploaded by user
router.get("/files/:name",download);

router.get("/matchface",matchface)

module.exports = router;
