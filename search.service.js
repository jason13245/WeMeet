const axios = require('axios');
require('dotenv').config();

const baseURL = process.env.YELP_API_BASE_URL;
const headersObj = { 'Authorization': 'Bearer ' + process.env.YELP_API_KEY };

export class SearchService{
    constructor(){}

    yelpSearch=(data)=>{
        axios.get(`${baseURL}/businesses/search`,{
            params:{
                term:data.keyword,
                latitude:data.latitude,
                longitude:data.longitude
            },
            headers:headersObj
        }).then((result)=>{
            return result
        }).catch((err)=>{
            return err
        })
    }

    yelpIDSearch=(data) => {
        axios.get(`${baseURL}/businesses/${data.id}`, {
            headers: headersObj
        }).then((result) => {
            return result;
        }).catch((err) => {
            console.log('Error data: ', err.response.data);
            return err;
        })
    }

    yelpAutoComplete=(data) => {
        axios.get(`${baseURL}/autocomplete`,{
            params:{
                text:data.keyword,
                latitude:data.latitude,
                longitude:data.longitude
            },
            headers:headersObj
        }).then((result)=>{
            return result
        }).catch((err)=>{
            console.log('Error data: ', err.response.data);
            return err;
        })
    }

    googleMapSearch=(data)=>{
        axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json`,{
            params:{
                key:process.env.GOOGLE_MAP_API_KEY,
                location:[data.latitude,data.longitude],
                name:data.keyword
            }
        }).then((result)=>{
            return result
        }).catch((err)=>{
            console.log('Error data: ', err.response.data);
            return err;
        })
    }

    googleMapAutocomplete=(data)=>{
        axios.get(`https://maps.googleapis.com/maps/api/place/queryautocomplete/json`,{
            params:{
                key:process.env.GOOGLE_MAP_API_KEY,
                location:[data.latitude,data.longitude],
                input:data.keyword
            }
        }).then((result)=>{
            return result
        }).catch((err)=>{
            console.log('Error data: ', err.response.data);
            return err;
        })
    }
}
//function for yelp search

//function for yelp auto-complete

//function for google map search

//function for google map auto-complete