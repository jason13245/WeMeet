let redis = require('redis');

let client = redis.createClient({
    host: 'localhost',
    port: 6379
});
client.on('err', (err) => {
    console.log('Error' + err);
});

module.exports = class ChatroomService{
    storeMsg (name,msg,created) {
        client.RPUSH("event" + data.eventId, JSON.stringify([name, msg, created]));
    }

    getMsg (name,cb) {
        client.LRANGE("event" + data.eventId, 0, -1, (err, data) => {
            if (err) {
                console.log(err);
            }
            let result;
            result = data.map((ele) => {
                console.log(`elements = ` + ele);
                return ele;
            })
            console.log(`result = ` + result);
            cb(result);
        })
    }  
}