require('dotenv').config();
require('./config/database');

const Hike = require('./models/hike');

const data = require('./data');

const p1 = Hike.deleteMany({})

Promise.all([p1])
  .then(function(results) {
    return Hike.create(data.hikes);
  })
  .then(function(hikes) {
  })
  .then(process.exit);