const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = app => {
    const Users = app.libs.db.models.Users;
    const config = app.libs.config;
    let opts = {};
    opts.secretOrKey = config.jwtSecret;
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    let strategy = new JwtStrategy(opts, (payload, done) => {
        Users
            .findById(payload.id)
            .then(user => {
                if(user) {
                    return done(null, {
                        id: user.id,
                        email: user.email
                    });
                }

                return done(null, false);
            })
            .catch(error => done(error, null));
    });

    passport.use(strategy);

    return {
        initialize: () => passport.initialize(),
        authenticate: () => passport.authenticate('jwt', config.jwtSession)
    };
};