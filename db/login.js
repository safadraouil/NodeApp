// ...
const userModel = require("./Users");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config(`${process.env.SECRET_KEY}`);

exports.Login = async (req, res) => {
  var Login = "";
  var password = "";
  var UserType = "";

  if (req.body.Password === undefined) {
    return false;
  } else
    try {
      Login = req.body.Login;
      password = req.body.Password;
      UserType = req.body.UserType;

      // Validate user input
      if (!(Login && password)) {
        res.status(400).send("All input is required");
      }
      // Validate if user exist in our database
      const user = await userModel.UserModel.findOne(
        { UserName: Login } || { UserLogin: Login }
      );
      if (!user.length) {
        throw createError(401, "That user does not exist");
      }

      if (!user || !password || !user?.password) {
        throw createError(401, "Wrong password");
      } else {
        if (
          password !== undefined &&
          user &&
          user?.UserPassword !== undefined &&
          (await bcrypt.compare(password, user?.UserPassword))
        ) {
          // Create token
          const token = jwt.sign(
            { user_id: user._id, Login: Login, UserType },
            "iamtryingtoaddsome",
            {
              expiresIn: "2h"
            }
          );

          // save user token
          user.token = token;

          // user
          res.status(200).json(user);
        }
      }
      res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.log(err);
    }
};

exports.modules;
