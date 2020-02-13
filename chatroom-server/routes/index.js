var express = require('express');
var router = express.Router();

const {User,Chat} = require('../db/models')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//login request router
router.post('/login', function(req, res) {
  const {username, password} = req.body
  User.findOne({username, password}, function (err, user) {
    if (user) {
      res.cookie('userid', user._id, {maxAge:1000*60*60*24})
      res.cookie('username', user.username,{maxAge:1000*60*60*24} )
      res.send({code:0, data: user})
    } else {
      res.send({code:1, msg: 'username or password wrong'})
    }
  })
});

//register request router
router.post('/register', function(req, res) {
  const {username, password} = req.body
  User.findOne({username}, function (err, user) {
    if (user) {
      res.send({code:1, msg: 'username has already exist'})
    } else {
      new User({username, password}).save(function (err, user) {
        if (err) {
          res.send({code:1, msg:err})
        } else {
          res.cookie('userid', user._id, {maxAge:1000*60*60*24})
          res.send({code:0, data:{username:user.username, _id: user._id}})
        }
      })
    }
  })
});

//chatMsg request router
router.get('/main', function(req, res) {
  Chat.find(function(err, chatItems) {
    res.send({code:0, data: chatItems})
  })
});

//update chat messages

router.post('/updateChat', function(req, res) {
  const {username, content} = req.body
  console.log(username,content)
  // const create_time = Data.now()
  new Chat({username, content}).save(function (err, chat) {
    if (err) {
      res.send({code:1, msg: err})
    } else {
      res.send({code:0, data:chat})
    }
  })
})

module.exports = router;
