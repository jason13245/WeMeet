const UserModel = require('../models').users;
const UserEventModel = require('../models').userEvents;
const EventModel = require('../models').events;
const VoteDateModel = require('../models').voteDates;
const DateModel = require('../models').dates;

const sequelize = require('../models').sequelize;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = class VoteDateService{
    createDate(user, data) {
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
            DateModel.create({
                date: data.date,
                eventId: data.event_id
            }).then((date) => {
                //Update vote date result
                return this.updateVoteDateResult(date.eventId, userEvent.id);
            }).catch(err => err);
            
        }).catch(err => err);
    }

    dateVoteIncrease(user, data) {
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
            return VoteDateModel.create({
                dateId: data.date_id,
                userEventId: userEvent.id
            }).then(voteDate => {
                return this.updateVoteDateResult(userEvent.eventId, voteDate.userEventId);
            }).catch(err => err);
        }).catch(err => err);
    }

    dateVoteDecrease(user, data) {
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
                    dateId: data.date_id,
                    userEventId: userEvent.id
                }
            }).then(() => {
                return this.updateVoteDateResult(userEvent.eventId, userEvent.id); 
            }).catch(err => err);
        });
    }

    updateVoteDateResult(eventId, userEventId){
        let query = `SELECT d."id", 
        COUNT(vd.id) AS "totalVote", 
        (SELECT COUNT(*) FROM "voteDates" AS vd2 WHERE vd2."userEventId" = :userEventId AND vd2."dateId" = d.id) AS "userVote",
        d.date
        FROM dates AS d
        LEFT JOIN "voteDates" AS vd ON d.id = vd."dateId"
        where d."eventId" = :eventId group by d.id`;

        return sequelize.query(query, {
            replacements: {
                eventId: eventId,
                userEventId: userEventId
            }, type: sequelize.QueryTypes.SELECT
        }).then((voteData) => {
            let output =[];
            console.log('hahaha');
            console.log(voteData);
            for(let i =0;i<voteData.length;i++){
                if(voteData[i].userVote != 0){
                    output.push({
                        date:voteData[i].date,
                        num_of_ppl:voteData[i].totalVote,
                        voted:'checked',
                        id:voteData[i].id
                    })
                }
                else if(voteData[i].userVote == 0){
                    output.push({
                        date:voteData[i].date,
                        num_of_ppl:voteData[i].totalVote,
                        voted:null,
                        id:voteData[i].id
                    })
                }
            }
            console.log(output);
            return output;
        }).catch(err => console.log(err));
    }

    listAllDatesByEvent(user, event){
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
            //Update vote date result
            return this.updateVoteDateResult(userEvent.eventId, userEvent.id);
        }).catch(err => err);
    }
}