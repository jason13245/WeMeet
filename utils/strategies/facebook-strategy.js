const passport = require('passport');
const passportJWT = require('passport-jwt');
const secret = require('../../secret');

const ExtractJwt = passportJWT.ExtractJwt;

module.exports = () => {
    const strategy = new passportJWT.Strategy({
        secretOrKey: secret.jwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },(payload,done)=>{
        const user = users.find((user)=>{
            return user.id == payload.id
        });
        if (user) {
            return done(null, {id: user.id});
        } else {
            return done(new Error("User not found"), null);
        }
    });
    passport.use(strategy);

    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate("jwt", config.jwtSession);
        }
    };
}



