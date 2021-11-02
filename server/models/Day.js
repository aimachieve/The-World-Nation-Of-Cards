const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const DaySchema = new Schema(
  {
    daynumber: {
      type: Number,
      required: 0
    },
    status: {
      type: Boolean,
      default: true // not finished
    },
    event_id: {
      type: Schema.ObjectId,
      ref: 'events',
    },
    room: [
      {
        type: Schema.ObjectId,
        ref: 'rooms'
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = Day = mongoose.model("days", DaySchema);