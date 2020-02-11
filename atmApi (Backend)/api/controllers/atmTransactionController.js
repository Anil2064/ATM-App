'use strict';

var mongoose = require('mongoose'),
  ATM = mongoose.model('ATM');


exports.create_new_user = function(req, res) {
    // res.json('working');
    var user_card = req.params.userCard; 
    var pin = req.params.pin; 
    console.log('params', user_card, pin);
    console.log('body', req.body);

    var user_card_len = user_card.toString().length;
    var pin_len = pin.toString().length;
    if(user_card_len != 8 || pin_len != 4){
        var data = {
            "data": {
                "code": 401,
                "type": "failed",
                "res": "User Card and Pin should be of 8 and 4 digits respectively!"
            }
            
        };
        res.json(data);
    }
    else{
        var data = { 
            "user_card": user_card,
            "pin": pin
        } 
        var new_user = new ATM(data);
        // console.log('body', req);
        new_user.save(function(err, user){
            if(err) res.send(err);
            var data = {
                "data": {
                    "code": 200,
                    "type": "success",
                    "res": "User added successfully",
                    "user_card": user.user_card,
                    "pin": user.pin,
                    // "money": user._doc.money
                }
            }
            res.json(data);
        })
    }
};

exports.login_user = function(req, res){
    var user_card = req.body.user_card;
    var pin = req.body.pin;
    var user_card_len = user_card.toString().length;
    var pin_len = pin.toString().length;
    console.log('data', req.body);
    if(user_card_len != 8 || pin_len != 4){
        var data = {
            "code": 401,
            "res": "User Card and Pin should be of 8 and 4 digits respectively!"
        };
        res.json(data);
    }
    else{
        ATM.findOne({user_card: user_card}, function(err, data){
            if(err) {
                var error = {
                    "err": err,
                    "res": "error"
                }
                res.send(error);
            }
            if(data){
                console.log('found', data);
                var response;
                if(pin == data.pin){
                    response = {
                        "code": 200,
                        "res": "Logged In Successfully",
                        "data": {
                            "user_card": data.user_card,
                            "pin": data.pin,
                            "money": data.money
                        }
                    }
                }
                else{
                    response = {
                        "code": 204,
                        "res": "Usercard and pin do not match",
                    }
                }
                res.json(response);
            }
            else{
                var response = {
                    
                        "code": 401,
                        "res": "Usercard does not exists"
                    
                }
                res.json(response);
            }
        })
    }   
}
/*
exports.read_a_user = function(req, res){
    ATM.findOne({user_card: req.params.userCard}, function(err, user) {
        if(err) {
            var error = {
                "err": err,
                "type": "error"
            }
            res.send(error);
        }
        var data = {
            "type": "got it",
            "data": user
        }
        res.json(data);
    })
};

exports.get_balance = function(req, res){
    ATM.find({}, function(err, user){
        if (err) res.send(err);
        res.json(user);
    })
}*/

exports.deposit_money = function(req, res){
    console.log('dep', req.body);
    var sent_money = parseInt(req.body.money);
    var available_money = 0;
    var total_money = 0;
    ATM.findOne({user_card: req.body.user_card}, function(err, data){
        if(err) {
            var error = {
                "err": err,
                "type": "error"
            }
            res.send(error);
        }
        console.log('data', data);
        console.log('sent money', sent_money);
        available_money = data.money != null ? parseInt(data.money) : 0;
        console.log('ava money', available_money);
        total_money = sent_money + available_money;
        console.log('total money', total_money);
        // res.json(data);
    })

    var sentData = {
        "user_card": req.body.user_card,
        "money": total_money
    } 
    
    ATM.updateOne({user_card: req.body.user_card}, {$set: sentData}, function(err, data){
        if(err){
            var error = {
                "err": err,
                "type": "error"
            }
            res.send(error);
        }
        var response = {
            "code": 200,
            "res": "Transaction Successful!!",
            // "data": sentData
        }
        res.json(response);
    })
    

}

exports.withdraw_money = function(req, res){
    var requested_money = req.body.money;
    var available_money;
    ATM.findOne({user_card: req.body.user_card}, function(err, data){
        if(err) {
            var error = {
                "err": err,
                "type": "error"
            }
            res.send(error);
        }
        // money = money + data.money;;
        available_money = data.money;
        
        if(requested_money > 20000){
            var response = {
                "code": 201,
                "res": "Money more than 20,000"
            };
            res.json(response);
        }
        else if(available_money < requested_money){
            var response = {
                "code": 201,
                "res": "Not enough money"
            };
            res.json(response);
        }
        else{
            var sentData = {
                "user_card": req.body.user_card,
                "money": available_money - requested_money
            } 
            ATM.updateOne({user_card: req.body.user_card}, sentData, function(err, data){
                if(err){
                    var error = {
                        "err": err,
                        "type": "error"
                    }
                    res.send(error);
                }
                var response = {
                    "code": 200,
                    "type": "successfully withdrawn",
                    "data": sentData
                }
                res.json(response);
            })
        }
    })

    
}
