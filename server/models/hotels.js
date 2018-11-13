const mongoose  = require ('mongoose');
const fs = require('fs');

//const cities = require('./usaCities.json');

const Schema = mongoose.Schema;

const hotelSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        streetName: String,
        city: String,
        state: String,
        zipcode: Number
    },
    price: {
        queen: Number,
        king: Number,
        twin: Number,
        extra_bed:Number
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
        images: {
            type: String
        },
        dates_booked: [{
            type: Number
        }]
    }]
});


const Hotel = module.exports = mongoose.model('Hotel', hotelSchema);

// get the user with an id
module.exports.getHotelById = function(id, callback) {
    Hotel.findById(id, callback);
}

// updates the hotel by saving the date booled in the 
module.exports.bookRoom = function(data, callback) {
    const { id, room_number, start_date, end_date } = data;

    date = getDates(start_date, end_date);
    this.getHotelById(id, (err, hotel) => {
        if (err) return callback(err);
        
        hotel.rooms[room_number - 1].dates_booked = hotel.rooms[room_number - 1].dates_booked.concat(date)
        hotel.save((err, updatedHotel) => {
            if (err) return callback(err);
            return callback(null, updatedHotel);
        })
    });
}

function getDates(startDate, stopDate) {
    startDate = new Date(startDate);
    stopDate = new Date(stopDate);

    var dateArray = new Array();
    var currentDate = startDate;

    while (currentDate <= stopDate) {
        console.log(`${currentDate} ${stopDate}`)
        dateArray.push(currentDate.valueOf());
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
}

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
