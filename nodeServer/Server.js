// Node server which will handle our socket io connections
const io = require('socket.io')(8000)

// Object for adding users 
const users = {}

io.on('connectio' , socket =>{

    // When new user joins
    socket.on('new-user-joined', name =>{
        if(name!= null){
            console.log(name);
            users[socket.id] = name;
            socket.broadcast.emit('user-joined' , name)
        }
    })

    // When a user sends a message
    socket.on('send', message =>{
        socket.broadcast.emit('recieve', {message: message, name: users[socket.id]})
    })

    socket.on('disconnect', message => {
            socket.broadcast.emit('left', users[socket.id])
            delete users[socket.id];
    })
})