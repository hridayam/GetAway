const mongoose  = require ('mongoose');
const bcrypt = require ('bcryptjs');

const AdminSchema = new mongoose.Schema({
    username: String,
    password: String
});

const Admin = module.exports = mongoose.model('Admin', AdminSchema);

module.exports.createAdmin = function(newAdmin, callBack){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newAdmin.password, salt, function(err, hash) {
            if (err) throw err;
            newAdmin.password = hash;
            newAdmin.save(callBack); 
        });
    });
}

module.exports.comparePassword = function(password, hash, callback) {
    bcrypt.compare(password, hash, function(err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
}