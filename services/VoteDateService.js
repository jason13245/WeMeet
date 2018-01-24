const UserModel = require('../models').users;
const UserEventModel = require('../models').userEvents;
const DateModel = require('../models').dates;
const VoteDateModel = require('../models').voteDates;

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = class VoteDateService{
    createDate(data) {
        return UserModel.findOne({
            where: {
                facebookId: {
                    [Op.eq]: socket.session.passport.user.profile.id
                }
            },
            attributes: ['id']
        }).then(user => {
            console.log(user.id);
            console.log(data.event_id);
            UserEventModel.findOne({
                where: {
                    userId: {
                        [Op.eq]: user.id
                    },
                    eventId: {
                        [Op.eq]: data.event_id
                    }
                },
                attributes: ['id']
            }).then(userEvent => {
                console.log(userEvent);
                DateModel.findOne({
                    where: {
                        date: data.date,
                    }
                }).then((result) => {
                    if (result === null) {
                        let dateObj = new DateModel();
                        dateObj.date = data.date;
                        dateObj.eventId = data.event_id;

                        dateObj.save().then((date) => {
                            //Update vote date result
                            this.updateVoteDateResult(date.eventId, userEvent.id);
                        }).catch(err => err);

                    } else {
                        throw new Error('This date is already existed!');
                    }
                }).catch(err => err);
            }).catch(err => err);
        })
    }

    dateVoteIncrease(data) {
        return UserModel.findOne({
            where: {
                facebookId: {
                    [Op.eq]: socket.session.passport.user.profile.id
                }
            },
            attributes: ['id']
        }).then((user) => {
            UserEventModel.findOne({
                where: {
                    userId: {
                        [Op.eq]: user.id
                    },
                    eventId: {
                        [Op.eq]: data.event_id
                    },
                },
                attributes: ['id']
            }).then((userEvent) => {

                VoteDateModel.create({
                    dateId: data.checkbox_id,
                    userEventId: userEvent.id
                }).then(voteDate => {
                    this.updateVoteDateResult(data.eventId, userEvent.id);
                }).catch(err => err);
            }).catch(err => err);
        }).catch(err => err);
    }

    dateVoteDecrease(data) {
        return UserModel.findOne({
            where: {
                facebookId: {
                    [Op.eq]: socket.session.passport.user.profile.id
                }
            },
            attributes: ['id']
        }).then((user) => {
            UserEventModel.findOne({
                where: {
                    userId: {
                        [Op.eq]: user.id
                    },
                    eventId: {
                        [Op.eq]: data.eventId
                    },
                },
                attributes: ['id']
            }).then((userEvent) => {
                VoteDateModel.destroy({
                    where:{
                        dateId: data.checkbox_id,
                        userEventId: userEvent.id
                    }
                }).then(voteDate => {
                    this.updateVoteDateResult(data.eventId, userEvent.id);
                }).catch(err => err);
            }).catch(err => err);
        }).catch(err => err);
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
            for(let i =0;i<voteData.length;i++){
                if(voteData[i].userVote != 0){
                    output.push({
                        date:voteData[i].date,
                        num_of_ppl:voteData[i].totalVote,
                        voted:'checked',
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
            return output;
        }).catch(err => err);
    }

    listAllDatesByEvent(data){
        return UserModel.findOne({
            where: {
                facebookId: {
                    [Op.eq]: socket.session.passport.user.profile.id
                }
            },
            attributes: ['id']
        }).then(user => {
            UserEventroomModel.findOne({
                where: {
                    userId: {
                        [Op.eq]: user.id
                    },
                    eventId: {
                        [Op.eq]: data.event_id
                    },
                },
                attributes: ['id']
            }).then((userEventroom) => {
                //Update vote date result
                console.log(userEventroom);
                this.updateVoteDateResult(io, data.event_id, userEventroom.id);
            }).catch(err => err);
        }).catch(err => err);
    }
}