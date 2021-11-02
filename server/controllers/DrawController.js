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

let otp

exports.getProducts = (req, res) => {
  Event.findOne().then((event) => {
    if (event) {
      res.json({ products: event })
    }
  })
}

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
  const tables = await Table.aggregate([{ $sample: { size: 12 } }])
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

exports.getRandomTablesByUserId = async (req, res) => {
  const { userId } = req.params
  console.log(userId)
  const tables = await Table.aggregate([
    { $unwind: '$seat' },
    {
      $lookup: {
        from: 'seat',
        localField: 'seat',
        foreignField: '_id',
        as: 'ticket',
      },
    },
    {
      $match: {
        'ticket.status': true,
      },
    },
  ])
  console.log(tables)
  // const tables = await Table.aggregate([
  //   { $match: { _id: userId } },
  //   { $sample: { size: 12 } },
  // ])
  // await Table.populate(tables, {
  //   path: 'seat',
  //   populate: [{ path: 'user_id' }],
  // })
  //   .then((results) => {
  //     return res.status(200).json(results)
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //     return res.status(500).send('Server Error')
  //   })
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
// Get Current Event
exports.getCurrentEvent = async (req, res) => {
    Event.find({ status: { $lt: 3}}).then(result => {
      console.log(result)
      res.json(result)
    })
};
// Create New Evnet
exports.create_Event = (req, res) => {
  const newEvent = new Event({
    name: req.body.eventName
  });

  newEvent
    .save()
    .then((event) => {
      console.log("successfully register!!!");
      res.json({
        success: true,
        current_event: event
      });
    })
    .catch((err) => console.log(err));
};

// Create Satellite Event
exports.create_sEvent = async (req, res) => {
  const current_event = await Event.findById(req.body.id);
  const current_satellite = current_event.satellite;
  current_satellite.push({
      price: req.body.price,
      entries: req.body.entries,
      winners: req.body.winners,
      date: req.body.date
  })

  const updated_event = await Event.findOneAndUpdate(
    { _id: req.body.id },
    { $set: {'satellite': current_satellite } }
  );

  res.json({
    success: true,
    current_event: updated_event
  });
};

// Create Main Event
exports.create_mEvent = async (req, res) => {
  const updated_event = await Event.findOneAndUpdate(
    { _id: req.body.id },
    { $set: {'main': {
      price: req.body.price,
      date: req.body.date
    } } }
  );

  res.json({
    success: true,
    current_event: updated_event
  });
};


/*========================= Create Mock Data =============================*/
exports.createMockData = async (req, res) => {
  var tables = await Table.find()

  for (var i = tables.length - 1; i >= 0; i--) {
    let temp = tables[i].seat

    for (var j = temp.length - 1; j > 2; j--) {
      let rand = Math.ceil(Math.random() * 100) % temp.length

      await MainTicket.findOneAndUpdate(
        { _id: temp[rand]._id },
        { $set: { status: false } },
      )

      temp.splice(rand, 1)
    }
    console.log('temp-length----->', i)
    // await Table.findOneAndUpdate({ _id: tables[i]._id }, {$set: {'seat': temp} })
  }
}
/*========================================================================*/
