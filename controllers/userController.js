const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uploadFile = require("../middleware/upload");
const fs = require('fs');
const baseUrl = "http://localhost:5000/files/";
const {spawn} = require('child_process');

// SIGNING UP USER
const signup = async (req, res) => {
  const { email, password } = req.body;

  // checking for required fields
  if (!email || !password) {
    res
      .status(422)
      .json({ message: "Please fill all the details", status: false });
  }

  // checking if the user exists
  let user;
  try {
    user = await User.findOne({
      email: email,
    });
    if (user) {
      return res.status(422).json({
        success: "false",
        message: "E-mail already exists",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: "false",
      message: "Something went wrong",
    });
  }

  const newUser = new User({
    ...req.body,
  });

  // hashing and salting the password
  bcrypt.genSalt(12, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: "false",
          message: "Something went wrong",
        });
      }
      // generating a jwt token
      const token = jwt.sign(
        {
          data: newUser._id,
        },
        process.env.JWT_SECRET,
        {}
      );

      // adding to the created new user
      newUser.token = token;
      newUser.password = hash;

      // saving the user
      newUser
        .save()
        .then((user) => {
          return res.status(200).json({
            success: "true",
            data: user,
          });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({
            success: "false",
            message: "something went wrong ",
          });
        });
    });
  });
};

// LOGINING USER

const login = async (req, res) => {
  const { email, password } = req.body;

  // Searching for user with the email
  let foundUser;
  try {
    foundUser = await User.findOne({ email: email });
    console.log({ foundUser, email });
    if (!foundUser) {
      return res.status(422).json({
        success: "false",
        message: "Incorrect email or password",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: "false",
      message: "Something went wrong",
    });
  }

  // Comparing the password from the client side and hashed password from the database
  bcrypt
    .compare(password, foundUser.password)
    .then((doesMatched) => {
      if (!doesMatched) {
        return res.status(422).json({
          success: "false",
          message: "Incorrect email or password",
        });
      }
      console.log(foundUser);

      res.status(200).json({
        success: "true",
        data: foundUser,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        success: "false",
        message: "Something went wrong",
      });
    });
};
//Uploading file by user

const upload = async (req, res) => {

  try {
    await uploadFile(req, res);
    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    if(req.fileValidationError){
      return res.status(400).send({message:"Invalid file type"})
    }
    res.status(200).send({
      message: "Uploaded the file successfully: " + req.file.originalname,
    });
  } catch (err) {
    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

//get all files uploaded by user
const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/resources/static/assets/uploads/known";

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }

    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });

    res.status(200).send(fileInfos);
  });
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

const matchface = (req,res)=>{
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
  // JSON.parse(dataToSend)

  console.log(typeof dataToSend)
  res.send(dataToSend)
  });
  
}

module.exports = {
  signup,
  login,
  upload,
  getListFiles,
  download,
  matchface
};
