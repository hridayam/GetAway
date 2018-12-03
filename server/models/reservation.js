const mongoose = require('mongoose');
const moment = require('moment');

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
            trim: true,
            lowercase: true,
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
    Reservation.getAllReservationsByOneUser(newReservation.user.email, (err, reservations) => {
        if (err) {
            console.log(err);
            return callback(err);
        }
        let booked = false;
        if (reservations.length === 0) {
            return reserve(newReservation, callback, true);
        } else {
            reservations.forEach((reservation, index) => {
                const { start_date, end_date } = reservation;
                if(
                    moment(newReservation.start_date).isSame(start_date, 'day') ||
                    (moment(newReservation.start_date).isAfter(start_date, 'day') || 
                    moment(newReservation.start_date).isBefore(end_date, 'day')) ||
                    (moment(newReservation.end_date).isAfter(start_date, 'day') || 
                    moment(newReservation.end_date).isBefore(end_date, 'day')) || 
                    (moment(start_date).isAfter(newReservation.start_date, 'day') &&
                    moment(end_date).isBefore(newReservation.end_date, 'day'))
                ) {
                    if(!reservation.cancelled) {
                        booked = true;
                    }
                }
    
                if(index === reservations.length - 1) {
                    console.log('booked:', booked)
                    if (booked) return callback(new Error('already booked for those days'))
    
                    reserve(newReservation, callback);
                }
            })
        }
    })
}

const reserve = function(reservation, callback, firstTime) {
    reservation.save((err, reservation) => {
        if (err) {
            console.log(err);
            return callback(err);
        }
        Hotel.getHotelById(reservation.hotel_id, (err, hotel) => {
            if (err) callback(err);
            let reservationData;
            if (firstTime) {
                reservationData = reservation
            } else {
                reservationData = reservation._doc;
            }
            reservation = {
                ...reservationData,
                hotel
            }
        })
        // if user is registered, add points
        User.getUserByEmail(reservation.user.email, (err, user) => {
            if (err) return callback(null, reservation);
            user.rewardsPoints += reservation.rewardsPoints;
            user.save(() => {
                return callback(null, reservation)
            });
        })
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
            return callback(null, data);
        });
    });
}

module.exports.getAllReservationsByOneUser = function(email, callback) {
    Reservation.find({ 'user.email': email }, function(err, reservations) {
        if(err) {
            console.log(err);
            return callback(err);
        }
        const hotels = [];
        if (reservations.length === 0) {
            return callback(null, []);
        }
        reservations.forEach((reservation) => {
            Hotel.getHotelById(reservation.hotel_id, (err, hotel) => {
                if (err) return callback(err);
                const { name, address } = hotel;
                const data = {
                    ...reservation._doc,
                    hotel_name: name,
                    city: address.city
                }

                hotels.push(data);
                if (hotels.length === reservations.length) {
                    return callback(null, hotels);
                }
            });
        })
    })
}

module.exports.cancelReservation = function(reservation, callback) {
    reservation.cancelled = true;
    return reservation.save(callback);
}
