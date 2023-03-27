let mongoose = require("mongoose");
let videosSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: false
  },
  Description: {
    type: String,
    required: false
  },
  Url: {
    type: String,
    required: false
  }
});

const videoModel = mongoose.model("videoModel", videosSchema);

exports.videoModel = videoModel;

exports.saveVideos = () => {
  videoModel
    .save()
    .then((doc) => {
      console.log(doc);
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.createVideo = async (req, res) => {
  try {
    const Name = req.body.Name;
    const Description = req.body.Description;
    const Url = req.body.Url;

    if (!(Name && Url && Description)) {
      res.status(400).send("All input is required");
    }
    const oldvideo = await videoModel.findOne({ Url });

    if (oldvideo) {
      return res.status(409).send("video Already Exist. Please Login");
    }

    const video = await videoModel.create({
      Name,
      Description,
      Url
    });
    res.status(201).json(video);
  } catch (err) {
    console.log(err);
  }
};
exports.findVideo = (req, res) => {
  videoModel
    .find()
    .then((resp) => {
      res.send(JSON.stringify(resp));
    })
    .catch((err) => console.log(err));
};

exports.deleteVideo = async (req, res) => {
  await videoModel
    .findOneAndDelete(req.body)
    .then((resp) => {
      console.log();
      return resp;
    })
    .catch((err) => console.log(err));
};
