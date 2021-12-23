// requiring modules and setting up app and socket.io
const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");
require("jquery")(window);

require("dotenv").config();
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server, {
  cors: "*",
});
global.__basedir = __dirname;

const cors = require("cors");

// Requiring mongoose
const mongoose = require("mongoose");
app.use(express.static(__dirname + "/public"));

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

app.get("/", (req, res) => {
  res.send("<h1>Hey Socket.io</h1>");
});
// Requiring routers from routers folder
const userRouter = require("./router/userRouter");
// using the routers
app.use("/api/user", userRouter);
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on('my message', (msg) => {
    console.log('message: ' + msg);
  });
});

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
