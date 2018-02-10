const UserModel = require('../models').users;
const UserEventModel = require('../models').userEvents;
const EventModel = require('../models').events;
const VoteDateModel = require('../models').voteDates;
const DateModel = require('../models').dates;

const sequelize = require('../models').sequelize;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = class VoteDateService {
    createDate(data) {
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
            return DateModel.create({
                date: data.date,
                eventId: data.eventInfo.id
            }).then(() => {
                console.log('successfully added date');
                // //Update vote date result
                // return this.updateDateAndCounter(data.eventInfo.id);
            }).catch(err => err);

        }).catch(err => err);
    }

    dateVoteIncrease(data) {
        console.log('adding vote to db');
        return UserEventModel.findOne({
            where: {
                userId: {
                    [Op.eq]: data.userInfo.id
                },
                eventId: {
                    [Op.eq]: data.eventInfo.id
                },
            }
        }).then((userEvent) => {
            return VoteDateModel.create({
                dateId: data.date.dateId,
                userEventId: userEvent.id
            }).then( ()=> {
                console.log('successfully voted date');
                // return this.updateDateAndCounter(data.eventInfo.id);
            }).catch(err => err);
        }).catch(err => err);
    }

    dateVoteDecrease(data) {
        return UserEventModel.findOne({
            where: {
                userId: {
                    [Op.eq]: data.userInfo.id
                },
                eventId: {
                    [Op.eq]: data.eventInfo.id
                },
            }
        }).then((userEvent) => {
            return VoteDateModel.destroy({
                where: {
                    dateId: data.date.dateId,
                    userEventId: userEvent.id
                }
            }).then(() => {
                console.log('successfully un-voted date');
                // return this.updateDateAndCounter(data.eventInfo.id);
            }).catch(err => err);
        });
    }

    updateVoteDateResult(eventId, userEventId) {
        
        let query =`SELECT d."id", 
        COUNT(vd.id) AS "totalVote", 
        (SELECT COUNT(*) FROM "voteDates" AS vd2 WHERE vd2."userEventId" = :userEventId AND vd2."dateId" = d.id) AS "userVote",
        d.date
        FROM dates AS d
        LEFT JOIN "voteDates" AS vd ON d.id = vd."dateId"
        where d."eventId" = :eventId group by d.id`

        return sequelize.query(query, {
            replacements: {
                eventId: eventId,
                userEventId: userEventId
            }, type: sequelize.QueryTypes.SELECT
        }).then((voteData) => {
            let output = [];
            for (let i = 0; i < voteData.length; i++) {
                if (voteData[i].userVote != 0) {
                    output.push({
                        date: voteData[i].date,
                        counter: voteData[i].totalVote,
                        voted: true,
                        id: voteData[i].id
                    })
                }
                else if (voteData[i].userVote == 0) {
                    output.push({
                        date: voteData[i].date,
                        counter: parseInt(voteData[i].totalVote, 10),
                        voted: false,
                        id: voteData[i].id
                    })
                }
            }
            console.log(output);
            return output;
        }).catch(err => console.log(err));
    }

    listAllDatesByEvent(data) {
        return UserEventModel.findOne({
            where: {
                eventId: {
                    [Op.eq]: data.eventInfo.id
                },
                userId: {
                    [Op.eq]: data.userInfo.id
                },
            }
        }).then((userEvent) => {
            //Update vote date result
            console.log(userEvent);
            return this.updateVoteDateResult(userEvent.eventId, userEvent.id);
        }).catch(err => err);
    }
}