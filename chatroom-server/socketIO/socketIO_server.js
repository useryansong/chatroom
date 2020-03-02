const {Chat} = require('../db/models')
//create socket.io server
module.exports = function (server) {
    //get IO object
    const io = require('socket.io')(server)
    //subscribe connection
    io.on('connection', function (socket) {
        console.log('socket connected')
        //receive msg fro client
        socket.on('sendMsg', function (data) {
            new Chat(data).save(function (err, chat) {
                if (err) {
                  res.send({code:1, msg: err})
                } else {
                //   res.send({code:0, data:chat});
                  io.emit('receiveMsg', chat)
                }
              })
        })
    })
}