var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var articleSchema = new Schema({
  title: String,
  description: String,
  tags: [String],
});

articleSchema.index({ tags: 1 });

articleSchema.index({ title: "text" });

articleSchema.index({ title: "text", description: "text" });

var Article = mongoose.model("Article", articleSchema);
module.exprorts = Article;
