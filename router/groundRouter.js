const {getGrounds,createGround} = require("../controllers/groundController")
const router = require("express").Router();
const isLoggedIn = require("../middleware/isLoggedIn");

// Creating new ground for playbook
router.post("/", createGround);

// Getting all the grounds on basis of city for playbook
router.get("/fetch", getGrounds);
module.exports = router;
