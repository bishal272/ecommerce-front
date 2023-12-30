const { Schema, model, models, default: mongoose } = require("mongoose");

const UserSchema = new Schema({
  id: { type: mongoose.Types.ObjectId },
  name: String,
  email: String,
  images: String,
  emailVerified: Boolean,
});

export const User = models.User || model("User", UserSchema);
