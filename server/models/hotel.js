const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
    _id: String,
    name: String,
    city: String,
    address: {
        streetName: String,
        city: String,
        state: String,
        zipcode: Number
    },
    descriptions: Array,
    amenities: Object,
    images: Array,
    stars: Number,
    rooms: [{
            beds: Number,
            bed_type: String,
            room_number: Number,
            images: Array,
            dates_booked: Array,
            dates_blocked: Array
    }],
    room_images: Object,
    price: {
        queen: Number,
        king: Number,
        twin: Number,
        extra_bed: Number
    }
});

const Hotels = mongoose.model('Hotels', HotelSchema);

module.exports = { Hotels, HotelSchema };

module.exports.getHotelById = function(id, callback) {
    Hotels.findById(id, callback);
}