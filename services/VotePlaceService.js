const knex =require('../knex-database-config')
module.exports = class VotePlaceService{
    
    constructor(){}

    addPlace(data){
        knex.transaction((trx)=>{
            
        })
    }

    votePlace(data){

    }

    unvotePlace(data){

    }

    getVotedPlaceList(data){
        /*should return [{
            placename:string
            number of ppl voted:number
            uservoted:boolean
            yelpID:string
        }]*/

    }

    findNoOfPplVoted(eventID){

    }
    getVotedPlaceList(eventID,userID){

    }
}