// Here I'm importing all the necessary modules for the project
const express=require('express');
const app=express(); // creating an instance of express class
const http=require('http').Server(app); //Here we are going with http and saying that this is the main server module
const io=require('socket.io')(http);// This is done to actually faciliate communications between client and server


app.get('/', function(req, res) { // The default page of the server
    res.render('index.ejs');
});

io.sockets.on('connection', function(socket) { // This is kind of like a tunnel between the client and server
    socket.on('username', function(username) {
        socket.username = username;
        io.emit('is_online', '🟢 <i>' + socket.username + ' has joined the chat..</i>');
    });

    socket.on('disconnect', function(username) {
        io.emit('is_online', '🔴 <i>' + socket.username + ' has left the chat..</i>');
    })

    socket.on('chat_message', function(message) {
        io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
    });

});

const server = http.listen(8080, function() { // If you might have noticed i have used http.listen instead of app.listen because i want to reuse my HTTP server instance for socket.io

    console.log('Port open at 8080');
});
