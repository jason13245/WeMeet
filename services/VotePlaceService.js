const UserModel = require('../models').users;
const UserEventModel = require('../models').userEvents;
const EventModel = require('../models').events;
const VotePlaceModel = require('../models').votePlaces;
const PlaceModel = require('../models').places;

const sequelize = require('../models').sequelize;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = class VotePlaceService{

    createPlace(user, data) {
        return UserEventModel.findOne({
            where: {
                userId: {
                    [Op.eq]: user.id
                },
                eventId: {
                    [Op.eq]: data.event_id
                }
            }
        }).then(userEvent => {
            console.log(userEvent);
            PlaceModel.create({
                placesName: data.yelp_place_name,
                yelpId: data.yelp_id,
                eventId: data.event_id
            }).then((place) => {
                //Upplace vote place result
                return this.updateVotePlaceResult(place.eventId, userEvent.id);
            }).catch(err => err);
            
        }).catch(err => err);
    }

    placeVoteIncrease(user, data) {
        return UserEventModel.findOne({
            where: {
                userId: {
                    [Op.eq]: user.id
                },
                eventId: {
                    [Op.eq]: data.event_id
                },
            }
        }).then((userEvent) => {
            return VotePlaceModel.create({
                placeId: data.place_id,
                userEventId: userEvent.id
            }).then(voteDate => {
                return this.updateVotePlaceResult(userEvent.eventId, voteDate.userEventId);
            }).catch(err => err);
        }).catch(err => err);
    }

    placeVoteDecrease(user, data) {
        return UserEventModel.findOne({
            where: {
                userId: {
                    [Op.eq]: user.id
                },
                eventId: {
                    [Op.eq]: data.event_id
                },
            }
        }).then((userEvent) => {
            return VoteDateModel.destroy({
                where:{
                    placeId: data.place_id,
                    userEventId: userEvent.id
                }
            }).then(() => {
                return this.updateVotePlaceResult(userEvent.eventId, userEvent.id); 
            }).catch(err => err);
        });
    }

    upplaceVotePlaceResult(eventId, userEventId){
        let query = `SELECT p."id", 
        COUNT(vp.id) AS "totalVote", 
        (SELECT COUNT(1) FROM "votePlaces" AS vp2 
        WHERE vp2."userEventId" = :userEventId 
        AND vp2."placeId" = p.id) AS "userVote",
        p."placeName",
        p."yelpId"
        FROM places AS p
        LEFT JOIN "votePlaces" AS vp ON p.id = vp."placesId"
        WHERE p."eventId" = :eventId
        GROUP BY p.id;`;

        return sequelize.query(query, {
            replacements: {
                eventId: eventId,
                userEventId: userEventId
            }, type: sequelize.QueryTypes.SELECT
        }).then((voteData) => {
            let output =[];
            for(let i =0;i<voteData.length;i++){
                if(voteData[i].userVote != 0){
                    output.push({
                        placename: voteData[i].placeName,
                        counter: parseInt(voteData[i].userVote, 10),
                        yelpId: voteData[i].yelpId,
                        voted:true,
                        id:voteData[i].id
                    })
                }
                else if(voteData[i].userVote == 0){
                    output.push({
                        placename: voteData[i].placeName,
                        counter: parseInt(voteData[i].userVote, 10),
                        yelpId: voteData[i].yelpId,
                        voted:false,
                        id:voteData[i].id
                    })
                }
            }
            console.log(output);
            return output;
        }).catch(err => console.log(err));
    }

    listAllPlacesByEvent(user, event){
        return UserEventModel.findOne({
            where: {
                eventId: {
                    [Op.eq]: event.event_id
                },
                userId: {
                    [Op.eq]: user.id
                },
            }
        }).then((userEvent) => {
            //Upplace vote place result
            return this.updateVotePlaceResult(userEvent.eventId, userEvent.id);
        }).catch(err => err);
    }
}