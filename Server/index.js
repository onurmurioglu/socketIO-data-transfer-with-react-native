const express = require('express');
const app = express();
const server =  require('http').Server(app);
const io =  require('socket.io')(server);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    socket.on('send', (data) => {
        console.log(data);
       io.emit('send-client', data)
      
    });

    socket.on('welcome-application', () => {
        io.emit('welcome-html');
        io.emit('welcome-app', { text: 'Merhaba! Uygulamamıza hoşgeldiniz...' });
    });
});

server.listen(3001);