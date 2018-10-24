const mongoose  = require ('mongoose');
const fs = require('fs');

const Schema = mongoose.Schema;

const hotelSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zipcode: {
        type: Number,
        required: true
    },
    base_price: {
        type: Number,
        required: true
    },
    stars: {
        type: Number,
        required: true
    },
    images: [
        {type: String}
    ],
    rooms: [{
        beds: {
            type: Number,
            default: 1
        },
        bed_type: {
            type: String,
            required: true
        },
        room_number: {
            type: Number,
            required: true
        },
        images: [{
            type: String
        }],
        dates_booked: [{
            type: Date
        }]
    }]
});

const Hotel = module.exports = mongoose.model('Hotel', hotelSchema);

// create a user function
// user will be created if the bcrypt.genSalt and bcrypt.hash functions are successful
module.exports.createHotels = function(newHotel, callBack) {
    let cities = fs.readFile('usaCities.js', 'utf8');

    const maxNum = cities.length;
    const num = Math.floor(Math.random() * 11) * maxNum / 10;
    
}

// get the user with an id
module.exports.getHotelById = function(id, callback) {
    Hotel.findById(id, callback);
}
