// Create Users

  var newUser = {}

  for (var i = 0; i < 2000; i++) {
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

// Create Ticket

  let event = await Event.findOne({status: 0});

  var newMainTicket = {}

  User.find().then(async (users) => {
    for (var i = 0; i < users.length; i++) {
      for (var j = 0; j < 5; j++) {
        console.log(i + '-----' + j)
        newMainTicket = new MainTicket({
          user_id: users[i]._id,
          username: users[i].name,
          event: event._id
        })
        await newMainTicket.save()
      }
    }
  })

// Create first Room and Day

  let event = await Event.findOne({status: 0});
  let count = await MainTicket.find({ status: true, event: event._id }).count();

  let newRoom = {}, roomlist=[];

  let newDay = new Day({
    daynumber: 1,
    event_id: event._id,
  })

  for (var i = 1; i <= Math.ceil(count/20000); i++) {
    newRoom = new Room({
      roomnumber: i
    });
    roomlist.push(newRoom._id);
    newRoom.save();
  }

  newDay.room = roomlist;

  await newDay.save();
  console.log("OOO AAA OOO AAA OOO AAA OOO AAA");

// Create Table
async function makeTable() {
  // await Table.deleteMany()

  let event = await Event.findOne({status: 0});
  let day = await Day.findOne({event_id: event._id}).sort('daynumber');

  MainTicket.find({ status: true }).then(async (data) => {
    let maps = data
    let temp = []
    let tempuser_id = []
    let newTable
    var i = 0, j = 0

    while (true) {
      for (i = 0; i < maps.length; i++) {
        let flag = tempuser_id.filter(item => item == maps[i].user_id).length;

        if (flag < 2) {
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

          temp.push(maps[i]._id)
          tempuser_id.push(maps[i].user_id)
          maps.splice(i, 1)
          i--
        } else {
          continue;
        }
        if (temp.length == 10 || maps.length === 0) {
          newTable = new Table({
            table: j,
            seat: temp,
            day: day._id
          })

          await newTable.save()

          j++;
          temp = [];
          tempuser_id = [];
          break;
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
async function play(day) {
  let event = await Event.findOne({status: 0});
  let day = await Day.findOne({event_id: event._id}).sort('daynumber');

  var tables = await Table.find({day: day._id})

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
