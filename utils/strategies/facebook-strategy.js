const passport = require('passport');
const passportJWT = require('passport-jwt');
const secret = require('../../secret');
const UserModel = require('../../models').users;

const ExtractJwt = passportJWT.ExtractJwt;

module.exports = () => {
    const strategy = new passportJWT.Strategy({
        secretOrKey: secret.jwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },(payload,done)=>{
        UserModel.findOne({
            where: {
                id: payload.id
            }
        }).then((user) => {
            if (user) {
                return done(null, {id: user.id});
            } else {
                return done(new Error("User not found"), null);
            }
        }).catch(err => console.log(err));
    });
    passport.use(strategy);

    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate("jwt", secret.jwtSession);
        }
    };
}



