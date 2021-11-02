const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const MainTicketSchema = new Schema(
  {
    user_id: {
      type: Schema.ObjectId,
      ref: 'users',
    },
    username: {
      type: String,
      require: true,
    },
    history: [
      {
        room: {
          type: Number,
        },
        seat: {
          type: Number,
        },
        table: {
          type: Number,
        },
      },
    ],
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = MainTicket = mongoose.model('maintickets', MainTicketSchema)
