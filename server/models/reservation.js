const mongoose = require('mongoose');

const User = require('./users');
const Hotel = require('./hotels');

// validate the user's email
// returns a boolean if the user email is in valid format or not
const validateEmail = function(email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const ReservationSchema = new mongoose.Schema({
    user: {
        id: mongoose.SchemaTypes.ObjectId,
        email: {
            type: String,
            unique: true,
            trim: true,
            lowercase: true,
            required: true,
            validate: [validateEmail, 'Please fill a valid email address'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        name: String
    },
    hotel_id: mongoose.SchemaTypes.ObjectId,
    time_created: {type: Number, default: Date.now()},
    start_date: Number,
    end_date: Number,
    charge: Object,
    number_of_guests: Number,
    subtotal: Number,
    total: Number,
    tax: Number,
    rewardsPoints: Number,
    cancelled: { type: Boolean, default: false },
    rooms: Object,
    special_accomodations: String,
    city: String,
    hotel_name: String
});

const Reservation = module.exports = mongoose.model('Reservation', ReservationSchema);

//TODO: protect it to only let users and hotels with valid user id sign up
module.exports.createReservation = function (newReservation, callback) {
    newReservation.save((err, reservation) => {
        if (err) return callback(err);

        // if user is registered, add points
        User.getUserByEmail(reservation.user.email, (err, user) => {
            if (err) return callback(null, reservation);
            user.rewardsPoints += reservation.rewardsPoints;
            user.save(() => {
                return callback(null, reservation)
            });
        })
        //return callback(null, reservation);
        // const { hotel_id, room_number, start_date, end_date } = reservation;
        // Hotel.bookRoom({ id: hotel_id, room_number, start_date, end_date }, (err, res) => {
        //     if (err) callback(err);
        //     return callback(null, reservation);
        // });
    });
}

module.exports.getReservationById = function(id, callback) {
    let data = {}
    Reservation.findById(id, (err, reservation) => {
        if (err) return callback(err);
        data = reservation._doc
        Hotel.getHotelById(reservation.hotel_id, (err, hotel) => {
            if (err) return callback(err);
            data = { 
                ...data, 
                hotel_name: hotel.name,
                address: hotel.address,
                hotel_images: hotel.images
            };
            console.log(data);
            return callback(null, data);
        });
    });
}

module.exports.getAllReservationsByOneUser = function(user_id, callback) {
    Reservation.find({ 'user.id': user_id }, function(err, res) {
        if(err) return callback(err);
        return callback(null, res);
    })
}

module.exports.cancelReservation = function(reservation, callback) {
    reservation.cancelled = true;
    return reservation.save(callback);
}
