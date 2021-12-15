var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var answerSchema = new Schema(
  {
    title: { type: String, require: true },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    createdBy: { type: mongoose.types.ObjectId, ref: "User" },
    questionId: { type: mongoose.types.ObjectId, ref: "Question" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Answer", answerSchema);
