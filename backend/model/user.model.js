const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

let Users = new Schema({
    name  : {
        type : String
    },
    email : {
        type : Email
    },
    password : {
        type : String
    },
    address : {
        type : Boolean
    },
});

module.exports = mongoose.model('Users', Users);
  