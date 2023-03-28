// ...
const userModel = require("./Users");
const { bcrypt } = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  // Our register logic starts here

  var UserName = "";
  var UserTel = 0;
  var UserMail = "";
  var UserLogin = "";
  var UserType = "";
  var UserPassword = "";
  var UserCountry = "";

  if (req.body.password === undefined) return false;
  else {
    try {
      // Get user input

      UserName = req.body.UserName;
      UserTel = req.body.Telephone;
      UserMail = req.body.Mail;
      UserLogin = req.body.Login;
      UserType = req.body.Type;
      UserPassword = req.body.password;
      UserCountry = req.body.country;

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

      if (UserPassword === undefined) {
        res.status(400).send("All input is required");
      } else
        encryptedPassword = await bcrypt.hashSync(
          UserPassword,
          null,
          null,
          (err, hash) => {
            if (err) return next(err);
            currentUser.password = hash;
            next();
          }
        );

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
  }
};
