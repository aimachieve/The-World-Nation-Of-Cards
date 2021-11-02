// Create Users

var newUser = {}

for (var i = 0; i < 10000; i++) {
  newUser = new User({
    name: 'abc admin' + i,
    email: 'admin' + i + 'gmail.com',
    username: 'abc admin' + i,
    address: 'address' + i,
    town: 'town' + i,
    province: 'province' + i,
    postalcode: 'postalcode' + i,
    phone: 'phone' + i,
  })
  console.log(i)
  await newUser.save()
}

// Create Card

var newMainTicket = {}

User.find().then(async (users) => {
  for (var i = 0; i < users.length; i++) {
    for (var j = 0; j < 10; j++) {
      console.log(i + '-----' + j)
      newMainTicket = new MainTicket({
        user_id: users[i]._id,
        username: users[i].name,
      })
      await newMainTicket.save()
    }
  }
})

// Create Table
async function makeTable() {
  await Table.deleteMany()
  MainTicket.find({ status: true }).then(async (data) => {
    let maps = data
    let temp = []
    let newTable
    var i = 0,
      j = 0

    while (true) {
      for (i = 0; i < maps.length; i++) {
        if (temp.filter((item) => item === maps[i]).length < 2) {
          await MainTicket.findOneAndUpdate(
            { _id: maps[i]._id },
            {
              $set: {
                history: [
                  ...maps[i].history,
                  {
                    room: Math.floor(j / 20000),
                    table: j % 20000,
                    seat: temp.length,
                  },
                ],
              },
            },
          )

          temp.push(maps[i])
          maps.splice(i, 1)
          i--
        } else {
          continue
        }
        if (temp.length == 10 || maps.length === 0) {
          newTable = new Table({
            table: j,
            seat: temp,
          })

          await newTable.save()

          j++
          temp = []
          break
        }
      }

      console.log(maps.length)
      if (maps.length === 0) {
        break
      }
    }
  })
}

// Play
async function play() {
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
