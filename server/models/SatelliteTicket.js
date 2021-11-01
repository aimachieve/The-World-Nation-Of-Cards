const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const SatelliteTicketSchema = new Schema(
  {
    user_id: {
      type: Schema.ObjectId,
      ref: 'users'
    },
    event: {
      type: Schema.ObjectId,
      ref: 'events',
    },
    status: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = SatelliteTicket = mongoose.model("satellitetickets", SatelliteTicketSchema);
