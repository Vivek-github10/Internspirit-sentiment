const mongoose = require("mongoose");

const sentimentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tweet: {
      type: String,
      required: true,
      trim: true,
    },
    sentiment: {
      score: {
        type: Number,
        required: true,
        // Score range typically -1 to 1
        min: -1,
        max: 1,
      },
      label: {
        type: String,
        required: true,
        enum: ["positive", "negative", "neutral"],
      },
    },
    emotion: {
      type: String,
      required: true,
      enum: ["joy", "sadness", "anger", "fear", "surprise", "love", "neutral"],
    },
    confidence: {
      type: Number,
      required: true,
      min: 0,
      max: 1,
    },
    keywords: [
      {
        type: String,
        trim: true,
      },
    ],
    analyzedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Sentiment = mongoose.model("Sentiment", sentimentSchema);

module.exports = Sentiment;
