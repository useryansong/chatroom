
/*import mongoose and connect to db
 */
let mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/chatroom', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connect successfully')
});

//define Schema 

const userSchme = new mongoose.Schema({
    username:{type: String, required: true},
    password:{type: String, required: true}
});

//define Model
const User = mongoose.model('user', userSchme)

exports.User = User