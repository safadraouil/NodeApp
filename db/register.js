// ...
const userModel = require("./Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  // Our register logic starts here

  try {
    // Get user input

    const UserName = req.body.UserName;
    const UserTel = req.body.Telephone;
    const UserMail = req.body.Mail;
    const UserLogin = req.body.Login;
    const UserType = req.body.Type;
    const UserPassword = req.body.password;
    const UserCountry = req.body.country;

    // Validate user input
    if (
      !(
        UserName &&
        UserTel &&
        UserMail &&
        UserLogin &&
        UserType &&
        UserPassword &&
        UserCountry
      )
    ) {
      res.status(400).send("All input is required");
    }
    const oldUser = await userModel.UserModel.findOne({ UserMail });
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    encryptedPassword = await (UserPassword && bcrypt.hash(UserPassword, 10));
    const user = await userModel.UserModel.create({
      UserName,
      UserTel: parseInt(UserTel),
      UserMail: UserMail.toLowerCase(),
      UserPassword: encryptedPassword,
      UserLogin,
      UserType,
      UserCountry
    });
    const token = jwt.sign(
      { UserID: user._id, UserMail },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h"
      }
    );
    user.token = token;
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
};
