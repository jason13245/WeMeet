const knex = require('../knex-database-config')
const Sequelize = require('sequelize');
const sequelize = require('../models').sequelize;
module.exports = class VotePlaceService {

    constructor() { }

    addPlace(data) {
    }

    votePlace(data) {

    }

    unvotePlace(data) {

    }

    getVotedPlaceList(data) {
        let query = `SELECT p."id",
        COUNT(vp.id) AS "totalVote",
        (SELECT COUNT(1) FROM "votePlaces" AS vp2
        INNER JOIN "userEvents" AS ue ON vp2."userEventsId" = ue.id
        INNER JOIN users AS u ON ue."userId" = u.id
        WHERE ue."eventId"= :eventId AND vp2."placesId"=p.id AND u."facebookId"=:facebookId) AS "userVote",p."placeName",p."yelpId"
        FROM places AS p
        LEFT JOIN "votePlaces" AS vp ON p.id = vp."placesId"
        WHERE p."eventId" = :eventId
        GROUP BY p.id`
        return sequelize.query(query,{
            replacement:{
                eventId:data.eventId,
                facebookId:data.facebookId
            },type: sequelize.QueryTypes.SELECT
        }).then((voteData)=>{
            let output =[];
            for(let i =0;i<voteData.length;i++){
                if(voteData[i].userVote != 0){
                    output.push({
                        date:voteData[i].date,
                        num_of_ppl:voteData[i].totalVote,
                        voted:true,
                        id:voteData[i].id
                    })
                }
                else if(voteData[i].userVote ==0){
                    output.push({
                        date:voteData[i].date,
                        num_of_ppl:voteData[i].totalVote,
                        voted:null,
                        id:voteData[i].id
                    })
                }
            }
            //socket io emit
        }).catch((err)=>{
            console.log(err);
        })
    }
}