const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    _id: mongoose.SchemaTypes.ObjectId,
    user_id: mongoose.SchemaTypes.ObjectId,
    time_created: Number,
    hotel: Object, 
    city: String , 
    start_date: Number, 
    end_date: Number, 
    num_guests: Number,
    subtotal: Number, 
    tax: Number, 
    total: Number, 
    rewards_points_earned: Number,
    charge: Object
});

const Reservation = mongoose.model('Reservation', ReservationSchema);

module.exports = Reservation;