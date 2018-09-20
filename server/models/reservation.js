const mongoose = require('mongoose');

const Hotel = require('./hotel');

const ReservationSchema = new mongoose.Schema({
    _id: mongoose.SchemaTypes.ObjectId,
    user_id: mongoose.SchemaTypes.ObjectId,
    time_created: Number,
    address: String,
    hotel_code: String, // Airhob unique hotel code
    hotel_name: String,
    hotel_stars: Number, // 1-5 number for hotel stars
    street: String,
    city: String,
    location: {
        lat: String,
        lng: String
    },
    hotel_facilities: String,
    hotel_images: Array,
    price_details: Object,
    guest_services_tax: Array,
    guest_services_tax_included: Boolean
});

const Reservation = mongoose.model('Reservation', ReservationSchema);

module.exports = Reservation;