var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var questionSchema = new Schema(
  {
    title: { type: String, require: true },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    tags: [{ type: String }],
    viewsByDays: [{ type: Number, default: 0 }],
    answers: [{ type: mongoose.types.ObjectId, ref: "Answer" }],
    createdBy: { type: mongoose.types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

var Question = mongoose.model("Question", questionSchema);

module.exports = Question;
