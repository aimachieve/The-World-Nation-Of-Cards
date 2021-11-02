const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')

var request = require('request')
var qs = require('querystring')

const { otplibAuthenticator } = require('../config/otplib')
const { mailgunHelper } = require('../config/mailgun')

const User = require('../models/User')
const Event = require('../models/Event')
const MainTicket = require('../models/MainTicket')
const SatelliteTicket = require('../models/SatelliteTicket')
const Table = require('../models/Table')
const Day = require('../models/Day')
const Room = require('../models/Room')

let otp

exports.getProducts = (req, res) => {
  Event.findOne().then((event) => {
    if (event) {
      res.json({ products: event })
    }
  })
}

/*==================== Mr.New ======================*/
/**
 * Temp controller of createTable
 * @param {object} req
 * @param {object} res
 */
exports.createTable = (req, res) => {
  console.log(req.body)
}

/**
 * Get 12 random tables from DB.
 * @param {object} req
 * @param {object} res
 */
exports.getRandomTables = async (req, res) => {
  const tables = await Table.aggregate([{ $sample: { size: 10 } }])
  await Table.populate(tables, {
    path: 'seat',
    populate: [{ path: 'user_id' }],
  })
    .then((results) => {
      return res.status(200).json(results)
    })
    .catch((err) => {
      return res.status(500).send('Server Error')
    })
}

/**
 * Get random tables by userId
 * @param {object} req
 * @param {object} res
 * @returns
 */
exports.getRandomTablesByUserId = async (req, res) => {
  const resTables = []
  const { userId } = req.params
  const tables = await Table.aggregate([
    { $unwind: '$seat' },
    {
      $lookup: {
        from: 'maintickets',
        localField: 'seat',
        foreignField: '_id',
        as: 'seat',
      },
    },
    {
      $match: {
        'seat.user_id': mongoose.Types.ObjectId(userId),
        'seat.status': true,
      },
    },
    { $sample: { size: 10 } },
  ])

  for (let i = 0; i < tables.length; i += 1) {
    let table = await Table.findById(tables[0]._id).populate({
      path: 'seat',
      populate: [{ path: 'user_id' }],
    })
    await resTables.push(table)
  }
  return res.status(200).json(resTables)
}

/**
 * Search users
 * @param {object} req
 * @param {object} res
 */
exports.searchData = async (req, res) => {
  console.log(req.body)
  const { pageNumber, pageSize, key } = req.body
  console.log(pageNumber, pageSize, key)
  MainTicket.aggregate(
    [
      { $match: { username: new RegExp(key) } },
      {
        $group: {
          _id: '$username',
          ticketAmount: { $sum: 1 },
          winAmount: {
            $sum: {
              $cond: [{ $ne: ['$status', true] }, 1, 0],
            },
          },
          loseAmount: {
            $sum: {
              $cond: [{ $ne: ['$status', true] }, 0, 1],
            },
          },
        },
      },
      {
        $facet: {
          metadata: [
            { $count: 'total' },
            { $addFields: { pageNumber: pageNumber } },
          ],
          data: [{ $skip: (pageNumber - 1) * pageSize }, { $limit: pageSize }], // add projection here wish you re-shape the docs
        },
      },
    ],
    function (err, results) {
      return res.status(200).json(results[0])
    },
  )
}

/**
 * Get all users
 * @param {object} req
 * @param {object} res
 */
exports.getAllUsers = async (req, res) => {
  const { pageNumber, pageSize } = req.body
  MainTicket.aggregate(
    [
      {
        $group: {
          _id: '$username',
          ticketAmount: { $sum: 1 },
          winAmount: {
            $sum: {
              $cond: [{ $ne: ['$status', true] }, 1, 0],
            },
          },
          loseAmount: {
            $sum: {
              $cond: [{ $ne: ['$status', true] }, 0, 1],
            },
          },
        },
      },
      {
        $facet: {
          metadata: [
            { $count: 'total' },
            { $addFields: { pageNumber: pageNumber } },
          ],
          data: [{ $skip: (pageNumber - 1) * pageSize }, { $limit: pageSize }], // add projection here wish you re-shape the docs
        },
      },
    ],
    function (err, results) {
      return res.status(200).json(results[0])
    },
  )
}

/**
 * Get all days
 * @param {object} req
 * @param {object} res
 */
exports.getAllDays = (req, res) => {
  Day.find()
    .populate('rooms')
    .then((results) => {
      if (results.length === 0) {
        return res.status(404).send('No Data')
      } else {
        return res.status(200).json(results)
      }
    })
    .catch((error) => res.status(500).send('Server Error'))
}

exports.getRandomTablesByDayIdAndRoomNumber = async (req, res) => {
  // const { dayId, roomnumber } = req.body
  // const tablesByDayId = 
}
/*========================================================*/

exports.payment = async (req, res) => {
  let xKey = keys.cardknoxKey
  let xSoftwareName = keys.xSoftwareName
  let xSoftwareVersion = keys.xSoftwareVersion
  let transactionUrl = keys.transactionUrl
  let xVersion = keys.xVersion

  let { cart, user } = req.body

  let amount = 0
  for (var i = cart.length - 1; i >= 0; i--) {
    amount += cart[i].quantity * cart[i].price
  }

  request.post(
    {
      url: transactionUrl,
      form: {
        xKey: xKey,
        xVersion: xVersion,
        xSoftwareName: xSoftwareName,
        xSoftwareVersion: xSoftwareVersion,
        xCommand: 'cc:Sale',
        xAmount: 10,
        xCardNum: user.cardname,
        xCVV: user.cvc,
        xExp: user.expire,
        xEmail: user.xEmail,
        xBillFirstName: user.xBillFirstName,
        xBillLastName: user.xBillLastName,
        xBillStreet: user.xBillStreet,
        xBillCity: user.xBillCity,
        xBillState: user.xBillState,
        xBillZip: user.xBillZip,
        xBillCountry: user.xBillCountry,
        xBillCompany: user.xBillCompany,
        xBillPhone: user.xBillPhone,
      },
    },
    function (error, response, body) {
      data = qs.parse(body)
      console.log(data)
      res.json(data)
    },
  )
}

/*========================= Admin page =============================*/
// Create New Evnet
exports.create_Event = (req, res) => {
  const newEvent = new Event({
    name: req.body.eventName,
  })

  newEvent
    .save()
    .then((event) => {
      console.log('successfully register!!!')
      res.json({
        success: true,
        current_event: event,
      })
    })
    .catch((err) => console.log(err))
}

// Create Satellite Event
exports.create_sEvent = async (req, res) => {
  const current_event = await Event.findById(req.body.id)
  const current_satellite = current_event.satellite
  current_satellite.push({
    price: req.body.price,
    entries: req.body.entries,
    winners: req.body.winners,
    date: req.body.date,
  })

  const updated_event = await Event.findOneAndUpdate(
    { _id: req.body.id },
    { $set: { satellite: current_satellite } },
  )

  res.json({
    success: true,
    current_event: updated_event,
  })
}

// Create Main Event
exports.create_mEvent = async (req, res) => {
  const updated_event = await Event.findOneAndUpdate(
    { _id: req.body.id },
    {
      $set: {
        main: {
          price: req.body.price,
          date: req.body.date,
        },
      },
    },
  )

  res.json({
    success: true,
    current_event: updated_event,
  })
}

/**
 * Get random tables by room id
 * @param {object} req
 * @param {object} res
 */
exports.getRandomTablesByRoomId = async (req, res) => {
  const { roomId } = req.params
}

/*========================= Create Mock Data =============================*/
exports.createMockData = async (req, res) => {
  
}
/*========================================================================*/
