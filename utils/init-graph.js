const axios = require('axios');

module.exports = (token) => {
    return axios.get(`https://graph.facebook.com/me?access_token=${token}`)
        .then((data) => {
            return data;
        });
}