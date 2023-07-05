const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    days: {
      type: Number,
      required: false,
      default: 0,
    },
    totalWorkTime: {
      type: Number,
      default: 0,
    },
    totalBreakTime: {
      type: Number,
      default: 0,
    },
    user_id: {
      type: String,
      required: true,
    },
    notes: [
      {
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
    progress: [
      {
        date: {
          type: Date,
          timestamps: true,
        },
        completed: {
          type: Boolean,
          default: false,
        },
        timeWorked: {
          type: String,
          default: "0",
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
