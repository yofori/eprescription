require("dotenv").config();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const express = require("express");
const MongoDBStore = require("connect-mongodb-session")(session);
const connectDB = require("./db");
const bodyParser = require("body-parser");
const cors = require("cors");
//Connecting the Database
connectDB();
const logger = require("morgan");

const store = new MongoDBStore({
  uri: "mongodb://localhost:27017/role_auth",
  collection: "sessions",
});

const app = express();
app.use(cookieParser());

app.use(
  session({
    secret: "secret token",
    resave: true,
    saveUninitialized: true,
    store: store,
    cookie: {
      expires : 3 * 60 * 60 * 1000
    }
  })
);

app.use(logger("dev"));
var corsOptions = {
  origin: "http://localhost:8081",
};
const { adminAuth, userAuth } = require("./middleware/auth.js");
const router = require("./routes/index");
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", router);
app.get("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: "1" });
  res.json({ message: "logout successfully" });
  req.session.destroy;
});
app.get("/admin", adminAuth, (req, res) => res.send("Admin Route"));
app.get("/basic", userAuth, (req, res) => res.send("User Route"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Connected to port ${PORT}`));
