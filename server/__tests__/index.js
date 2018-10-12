const usersModel = require('../models/users.js');

test('check for valid email', () => {
  expect(usersModel.validateEmail('raghavsv19@gmail.com')).toBe(true);
  expect(usersModel.validateEmail('raghavsv19gmail.com')).toBe(false);
  expect(usersModel.validateEmail('raghavsv19@gmailcom')).toBe(false);
  expect(usersModel.validateEmail('raghavsv@hotmail.com')).toBe(true);
  expect(usersModel.validateEmail(null)).toBe(false);

});

/*const newUser = new User({
    name: 'Rooh',
    email: 'raghavsv19@gmail.com',
    password: '1234',
    address: '1 Washington Sq, San Jose, CA 95192',
    phoneNumber: '6694009898'
});

test('Call Back Testing 1', done => {

//  expect(usersModel.createUser('')).toBe(true);
userModel.createUser(newUser, )
});
*/
