const axios = require('axios');
require('dotenv').config();

const apiKey = process.env.YELP_API_KEY || 'voQqDPcLEhVEQKOuZVtFIs1bmLkzisFMSVxonwDhhThVXoLUmVLu7qE8Jtxyi4YreuntdLr3m6kRxpiMSezTkv7QA0Hk1cnG8P_iqLXxR__KpnMNA4_1_CxLQ8ldWnYx'

const baseURL = process.env.YELP_API_BASE_URL || 'https://api.yelp.com/v3';
const googleApiKey = "AIzaSyA5mr3gKLjEOBqp1I0-WPquTiBwhj6JW2U";
const headersObj = { 'Authorization': 'Bearer ' + apiKey };

module.exports = class SearchService {
    // constructor() { }

    yelpSearch(data) {
        return axios.get(`${baseURL}/businesses/search`, {
            params: {
                term: data.keyword,
                latitude: data.latitude,
                longitude: data.longitude
            },
            headers: headersObj
        }).then((data) => {
<<<<<<< HEAD
            // let output = JSON.parse(data);
            let output = data.data;
            let result = {
                url: output.businesses[0].url,
                id: output.businesses[0].id,
                name: output.businesses[0].name,
                image: output.businesses[0].image_url,
                phone: output.businesses[0].phone,
                location: output.businesses[0].location,
                price: output.businesses[0].price,
                rating: output.businesses[0].rating,
                region: output.region
            };

            return result;
=======
            let output = JSON.parse(data);
            return result = {
                url:data.business.url,
               
            }
>>>>>>> 0cc66ce5421fcd3818e6c568badcf966e8b73f66
        }).catch((err) => {
            return err
        })
    }

    yelpIDSearch(data) {
        return axios.get(`${baseURL}/businesses/${data.id}`, {
            headers: headersObj
        }).then((data) => {
            // console.log(data.data);
            // let output = JSON.parse(data);
            let output = data.data;
            let result = {
                id: output.id,
                name: output.name,
                image_url: output.image_url,
                url: output.url,
                price: output.price,
                rating: output.rating,
                phone: output.phone,
                photos: output.photos,
                hours: output.hours[0].open,
                categories_alias: output.categories[0].alias,
                categories_title: output.categories[0].title,
                coordinates: output.coordinates,
                location: output.location

            }
            return result;
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
        }).then((output) => {
            return output.data;
        }).catch((err) => {
            console.log('Error data: ', err);
            return err;
        })
    }

    googleMapSearch(data) {

        return axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json`, {
            params: {
                key: googleApiKey,
                location: data.location,
                keyword: data.keyword,
                radius: data.radius,
                type: data.type
            }
        }).then((data) => {
            // let output = JSON.parse(data);
            // console.log(data);
            let output = data.data;
            let result = {
                location: output.results[0].geometry.location,
                id: output.results[0].id,
                name: output.results[0].name,
                opening_hours: output.results[0].opening_hours,
                photos: output.results[0].photos,
                place_id: output.results[0].place_id,
                types: output.results[0].types,
                vicinity: output.results[0].vicinity

            }
            return result;
        }).catch((err) => {
            console.log('Error data: ', err.response.data);
            return err;
        })
    }

    googleMapAutocomplete(data) {
        return axios.get(`https://maps.googleapis.com/maps/api/place/queryautocomplete/json`, {
            params: {
                key: googleApiKey,
                input: data.input
            }
        }).then((data) => {
            // let output = JSON.parse(data);
            let output = data.data;
            let result = {
                description: output.predictions[0].description,
                matched_substrings: output.predictions[0].matched_substrings,
                terms: output.predictions[0].terms
            }
            return result;
        }).catch((err) => {
            console.log('Error data: ', err.response.data);
            return err;
        })
    }
}