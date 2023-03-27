// ...
const userModel = require("./Users");
const { bcrypt } = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config(`${process.env.SECRET_KEY}`);

exports.Login = async (req, res) => {
  try {
    const Login = req.body.Login;
    const password = req.body.Password;
    const UserType = req.body.UserType;

    // Validate user input
    if (!(Login && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await userModel.UserModel.findOne(
      { UserName: Login } || { UserLogin: Login }
    );
    if (
      user &&
      (await (password &&
        user?.UserPassword &&
        bcrypt.compare(password, user?.UserPassword)))
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
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
};

exports.modules;
