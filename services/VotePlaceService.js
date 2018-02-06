const UserModel = require('../models').users;
const UserEventModel = require('../models').userEvents;
const EventModel = require('../models').events;
const VotePlaceModel = require('../models').votePlaces;
const PlaceModel = require('../models').places;

const sequelize = require('../models').sequelize;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = class VotePlaceService{

    createPlace(data) {
        return UserEventModel.findOne({
            where: {
                userId: {
                    [Op.eq]: data.userInfo.id
                },
                eventId: {
                    [Op.eq]: data.eventInfo.id
                }
            }
        }).then(userEvent => {
            return PlaceModel.create({
                placeName: data.place.placeName,
                yelpId: data.place.yelpId,
                eventId: data.eventInfo.id
            }).then((place) => {
                //Upplace vote place result
                return this.updateVotePlaceResult(place.eventId, data.userInfo.id);
            }).catch(err => err);
            
        }).catch(err => err);
    }

    votePlaceIncrease(data) {
        return UserEventModel.findOne({
            where: {
                userId: {
                    [Op.eq]: data.userInfo.id
                },
                eventId: {
                    [Op.eq]: data.eventInfo.id
                }
            }
        }).then((userEvent) => {
            return VotePlaceModel.create({
                placeId: data.place.placeId,
                userEventId: userEvent.id
            }).then(votePlace => {
                return this.updateVotePlaceResult(userEvent.eventId, data.userInfo.id);
            }).catch(err => err);
        }).catch(err => err);
    }

    votePlaceDecrease(data) {
        return UserEventModel.findOne({
            where: {
                userId: {
                    [Op.eq]: data.userInfo.id
                },
                eventId: {
                    [Op.eq]: data.eventInfo.id
                }
            }
        }).then((userEvent) => {
            return VotePlaceModel.destroy({
                where:{
                    placeId: data.place.placeId,
                    userEventId: userEvent.id
                }
            }).then(() => {
                return this.updateVotePlaceResult(userEvent.eventId, data.userInfo.id); 
            }).catch(err => err);
        });
    }

    updateVotePlaceResult(eventId, userId){
        let query = `SELECT p."id",
        COUNT(vp.id) AS "totalVote",
        (SELECT COUNT(1) FROM "votePlaces" AS vp2
        INNER JOIN "userEvents" AS ue ON vp2."userEventId" = ue.id
        INNER JOIN users AS u ON ue."userId" = u.id
        WHERE ue."eventId"= :eventId AND vp2."placeId"=p.id AND u."id"=:userId) AS "userVote",p."placeName",p."yelpId"
        FROM places AS p
        LEFT JOIN "votePlaces" AS vp ON p.id = vp."placeId"
        WHERE p."eventId" = :eventId
        GROUP BY p.id;`

        return sequelize.query(query, {
            replacements: {
                eventId: eventId,
                userId: userId
            }, type: sequelize.QueryTypes.SELECT
        }).then((voteData) => {
            let output =[];
            for(let i =0;i<voteData.length;i++){
                if(voteData[i].userVote != 0){
                    output.push({
                        placeName: voteData[i].placeName,
                        counter: parseInt(voteData[i].totalVote, 10),
                        yelpId: voteData[i].yelpId,
                        voted:true,
                        id:voteData[i].id
                    })
                }
                else if(voteData[i].userVote == 0){
                    output.push({
                        placeName: voteData[i].placeName,
                        counter: parseInt(voteData[i].totalVote, 10),
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

    listAllPlacesByEvent(data){
        return UserEventModel.findOne({
            where: {
                userId: {
                    [Op.eq]: data.userInfo.id
                },
                eventId: {
                    [Op.eq]: data.eventInfo.id
                }
            }
        }).then((userEvent) => {
            //Upplace vote place result
            return this.updateVotePlaceResult(userEvent.eventId, data.userInfo.id);
        }).catch(err => err);
    }
}