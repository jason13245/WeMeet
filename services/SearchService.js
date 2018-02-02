const axios = require('axios');
require('dotenv').config();

const baseURL = process.env.YELP_API_BASE_URL;
const headersObj = { 'Authorization': 'Bearer ' + process.env.YELP_API_KEY };

module.exports = class SearchService {
    constructor() { }

    yelpSearch(data) {
        return axios.get(`${baseURL}/businesses/search`, {
            params: {
                term: data.keyword,
                latitude: data.latitude,
                longitude: data.longitude
            },
            headers: headersObj
        }).then((data) => {
            let output = JSON.parse(data);
            return result = {
                url:data.business.url,
               
            }
        }).catch((err) => {
            return err
        })
    }

    yelpIDSearch(data) {
        return axios.get(`${baseURL}/businesses/${data.id}`, {
            headers: headersObj
        }).then((data) => {
            let output = JSON.parse(data);
            return result = {
                
            }
        }).catch((err) => {
            console.log('Error data: ', err.response.data);
            return err;
        })
    }

    yelpAutocomplete(data) {
        return axios.get(`${baseURL}/autocomplete`, {
            params: {
                text: data.keyword,
                latitude: data.latitude,
                longitude: data.longitude
            },
            headers: headersObj
        }).then((data) => {
            let output = JSON.parse(data);
            return result={
                
            }
        }).catch((err) => {
            console.log('Error data: ', err.response.data);
            return err;
        })
    }

    googleMapSearch(data) {
        return axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json`, {
            params: {
                key: process.env.GOOGLE_MAP_API_KEY,
                location: [data.latitude, data.longitude],
                name: data.keyword
            }
        }).then((data) => {
            let output = JSON.parse(data);
            return result={
                
            }
        }).catch((err) => {
            console.log('Error data: ', err.response.data);
            return err;
        })
    }

    googleMapAutocomplete(data) {
        return axios.get(`https://maps.googleapis.com/maps/api/place/queryautocomplete/json`, {
            params: {
                key: process.env.GOOGLE_MAP_API_KEY,
                location: [data.latitude, data.longitude],
                input: data.keyword
            }
        }).then((data) => {
            let output = JSON.parse(data);
            return result = {
                
            }
        }).catch((err) => {
            console.log('Error data: ', err.response.data);
            return err;
        })
    }
}