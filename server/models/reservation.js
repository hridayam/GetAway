const mongoose = require('mongoose');

const User = require('./users');
const Hotel = require('./hotels');

const ReservationSchema = new mongoose.Schema({
    user_id: mongoose.SchemaTypes.ObjectId,
    hotel_id: mongoose.SchemaTypes.ObjectId,
    time_created: {type: Number, default: Date.now()},
    start_date: Number,
    end_date: Number,
    charge: Object,
    room_number: Number,
    number_of_guests: Number
});

const Reservation = module.exports = mongoose.model('Reservation', ReservationSchema);

//TODO: protect it to only let users and hotels with valid user id sign up
module.exports.createReservation = function (newReservation, callback) {
    newReservation.save((err, reservation) => {
        if (err) return callback(err);
        const { hotel_id, room_number, start_date, end_date } = reservation;
        Hotel.bookRoom({ id: hotel_id, room_number, start_date, end_date }, (err, res) => {
            if (err) callback(err);
            callback(null, reservation);
        });
    });
}

module.exports.getReservationById = function(id, callback) {
    const data = {
        hotel: null,
        reservation: null
    }

    Reservation.findById(id, (err, res) => {
        if (err) return callback(err);
        data.reservation = res;
        Hotel.getHotelById(res.hotel_id, (err, res) => {
            if (err) return callback(err);
            data.hotel = res;
            callback(null, data);
        });
    });
}

module.exports.getAllReservationsByOneUser = function(user_id, callback) {
    Reservation.find({ user_id }, function(err, res) {
        if(err) return callback(err);
        callback(null, res);
    })
}
