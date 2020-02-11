'use strict';

module.exports = function(app) {
    var userList = require('../controllers/atmTransactionController');

    app.route('/create_user/:userCard/:pin')
        .post(userList.create_new_user);

  /*  app.route('/check_user/:userCard')
        .get(userList.read_a_user);

    app.route('/get_balance')
        .get(userList.get_balance);*/

    app.route('/deposit_money')
        .post(userList.deposit_money);

    app.route('/withdraw_money')
        .post(userList.withdraw_money);

    app.route('/login')
        .post(userList.login_user);
};