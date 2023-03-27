let mongoose = require("mongoose");
let UserSchema = new mongoose.Schema({
  UserName: {
    type: String,
    required: false
  },
  UserTel: {
    type: Number,
    required: false
  },
  UserMail: {
    type: String,
    required: false
  },

  UserPassword: {
    type: String,
    required: false
  },
  UserLogin: {
    type: String,
    required: false
  },
  UserType: {
    type: String,
    required: false
  },
  UserCountry: {
    type: String,
    required: false
  }
});

const UserModel = mongoose.model("UserModel", UserSchema);

exports.UserModel = UserModel;

exports.saveUsers = () => {
  UserModel.save()
    .then((doc) => {
      console.log(doc);
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.usersGroup = () => {
  UserModel.create(arrayOfUser)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.log(err));
};

exports.findUsers = () => {
  UserModel.find()
    .then((resp) => {
      console.log(resp);
      return resp;
    })
    .catch((err) => console.log(err));
};

exports.updateUser = async (req) => {
  await UserModel.findOneAndUpdate(req.query, req.body)
    .then((resp) => {
      console.log(resp);
      return resp;
    })
    .catch((err) => console.log(err));
};

exports.deleteUsers = async (req) => {
  await UserModel.findOneAndDelete(req.query)
    .then((resp) => {
      console.log(resp);
      return resp;
    })
    .catch((err) => console.log(err));
};
