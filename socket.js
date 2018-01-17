const client = require('./redis-database-config');

// Import controllers here

// Flush Redis DB when restart the server
client.once('ready', function () {
    client.flushdb();
});

module.exports = (server) => {
    const io = require('socket.io')(server);

    io.on('connection', (socket) => {
        console.log('Connected!');

        // Put some events in here
    });

    return io;
    
}