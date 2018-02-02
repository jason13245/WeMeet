module.exports = class ChatroomRouter{
    
        constructor(io, chatroomService){
            this.io = io;
            this.chatroomService = chatroomService;
        }
    
        router(){
            
            this.io.on('connection', (socket) => {
                
                  
                  socket.join("event" + data.eventId);
                  //socket.to("event" + data.eventId)
                  socket.on('disconnect', function () {
                    this.io.in("event" + data.eventId).emit('users-changed', { user: socket.nickname, event: 'left' });
                    socket.leave("event" + data.eventId);
                  });
                
                  socket.on('set-nickname', (nickname) => {
                    socket.nickname = nickname;
                    this.io.in("event" + data.eventId).emit('users-changed', { user: nickname, event: 'joined' });
                
                  });
                  socket.on('get-history', (nickname) => {
                    getMsg(nickname, (result) => {
                
                      console.log('result = ' + result);
                
                      result.forEach(function (element) {
                        var array = element.slice(1, -1).replace(/"/g, "").split(",");
                        this.io.to(socket.id).emit('message', { text: array[1], from: array[0], created: array[2] });
                      }, this);
                
                    })
                  });
                
                  socket.on('add-message', (message) => {
                    storeMsg(socket.nickname, message.text, new Date());
                    this.io.in("event" + data.eventId).emit('message', { text: message.text, from: socket.nickname, created: new Date() });
                  });
                });


        }
    }