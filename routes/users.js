const express = require("express");
const dbuser = require("../db/Users");
const dbregister = require("../db/register");
const dblogin = require("../db/login");
const dbauth = require("../db/auth");
const dbmail = require("../db/mail");
const dbvideo = require("../db/video");
const router = express.Router();

router.get("/Users", dbuser.findUsers);

router.post("/User", dbuser.usersGroup);

router.put("/update", (req, res) => dbuser.updateUser(req));

router.delete("/deletUser", async (req, res) => {
  await dbuser.deleteUsers(req);
});

router.post("/register", (req, res) => dbregister.register(req, res));

router.post("/login", (req, res) => dblogin.Login(req, res));

const auth = require("../db/auth");

router.post("/welcome", dbauth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

router.post("/mail", (req, res) => dbmail.mailOptions(req, res));
router.post("/createVideo", (req, res) => {
  dbvideo.createVideo(req, res);
});
router.delete("/removeVideo", (req, res) => {
  dbvideo.deleteVideo(req, res);
});

router.get("/findVideo", (req, res) => {
  dbvideo.findVideo(req, res);
});

module.exports = router;
