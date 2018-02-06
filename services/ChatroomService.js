let redis = require('redis');

let client = redis.createClient({
    host: 'localhost',
    port: 6379
});
client.on('err', (err) => {
    console.log('Error' + err);
});

module.exports = class ChatroomService{
    storeMsg (id,name,msg,created) {
        client.RPUSH("event" + id, JSON.stringify([name, msg, created]));
    }

    getMsg (name,id,cb) {
        client.LRANGE("event" + id, 0, -1, (err, data) => {
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