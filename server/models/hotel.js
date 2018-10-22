const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
    _id: String,
    name: String,
    city: String,
    address: String,
    state: String,
    stars: Number,
    zipcode: Number,
    rooms: [{
            beds: Number,
            bed_type: String,
            room_number: Number,
            images: Array,
            dates_booked: Array,
            dates_blocked: Array
    }],
    price: {
        queen: Number,
        king: Number,
        twin: Number,
        extra_bed: Number
    }
});

const Hotels = mongoose.model('Hotels', HotelSchema);

modules.exports = { Hotels, HotelSchema };