const streamifier = require("streamifier");
const User = require("../models/User");
const cloudinary = require("../config/cloudinary");

const getProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

const updateProfile = async (req, res) => {
  const { name } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { name },
    { new: true, runValidators: true }
  ).select("-password");

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user,
  });
};

const uploadAvatar = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Avatar image is required",
    });
  }

  const uploadFromBuffer = () => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "intellmeet/avatars",
          resource_type: "image",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
  };

  const result = await uploadFromBuffer();

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { avatar: result.secure_url },
    { new: true }
  ).select("-password");

  res.status(200).json({
    success: true,
    message: "Avatar uploaded successfully",
    avatar: result.secure_url,
    user,
  });
};

module.exports = {
  getProfile,
  updateProfile,
  uploadAvatar,
};