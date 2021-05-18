const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const {
  places,
  descriptors
} = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Database connected');
});

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 250; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '60a0b17d42412a62e40e4177',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus architecto quibusdam itaque eius dolor atque amet? Fugit reprehenderit amet omnis quam natus sint incidunt optio',
      price,
      geometry: {
        coordinates: [cities[random1000].longitude,cities[random1000].latitude],
        type: 'Point'
      },
      images: [{
          url: 'https://res.cloudinary.com/dx1ye2bro/image/upload/v1621189908/YelpCamp/cm7onhlepkyiffal9ifm.jpg',
          filename: 'YelpCamp/cm7onhlepkyiffal9ifm'
        },
        {
          url: 'https://res.cloudinary.com/dx1ye2bro/image/upload/v1621189912/YelpCamp/mrocwy97dnsialb1m3d6.jpg',
          filename: 'YelpCamp/mrocwy97dnsialb1m3d6'
        },
        {
          url: 'https://res.cloudinary.com/dx1ye2bro/image/upload/v1621189916/YelpCamp/y5qbhbgzuu1jzwaobng7.jpg',
          filename: 'YelpCamp/y5qbhbgzuu1jzwaobng7'
        }
      ]
    })
    await camp.save();
  }
}

seedDB().then(() => {
  db.close()
})