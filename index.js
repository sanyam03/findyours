// requiring modules and setting up app and socket.io
require("dotenv").config();
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const {spawn} = require('child_process');

//multer configurations
var multer  = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/unknown')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })

const cors = require("cors");

// Requiring mongoose
const mongoose = require("mongoose");
app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));


app.get('/', (req, res) => {
 
  var dataToSend;
  // spawn new child process to call the python script
  const python = spawn('python3', ['match_faces.py']);
  // collect data from script
  python.stdout.on('data', function (data) {
   console.log('Pipe data from python script ...');
   dataToSend = data.toString();
  });
  // in close event we are sure that stream from child process is closed
  python.on('close', (code) => {
  console.log(`child process close all stdio with code ${code}`);
  // send data to browser
  res.send(dataToSend)
  });
  
 })
app.post('/profile-upload-single', upload.single('profile-file'), function (req, res, next) {
  // req.file is the `profile-file` file
  // req.body will hold the text fields, if there were any
  console.log(JSON.stringify(req.file))
  var response = '<a href="/">Home</a><br>'
  response += "Files uploaded successfully.<br>"
  response += `<img src="${req.file.path}" /><br>`
  return res.send(response)
})
app.use(
  express.urlencoded({
    extended: false,
  })
);

// To recognize the incoming Request Object as a JSON Object
app.use(express.json());

// To overcome cors error due to usage React on PORT 3000
app.use(cors());

// connecting to mongoDB
mongoose
  .connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.log(err));





// Requiring routers from routers folder
const userRouter = require("./router/userRouter");

// using the routers
app.use("/api/user", userRouter);


// For production side
if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Listening
server.listen(process.env.PORT || 5000, () =>
  console.log("server is running on port 5000")
);
