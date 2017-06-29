const jwt = require('jwt-simple');

module.exports = app => {
    const config = app.libs.config;
    const Users = app.libs.db.models.Users;

    app.post('/token', (req, res) => {
        if(req.body.email && req.body.password) {
            let email = req.body.email;
            let password = req.body.password;

            Users
                .findOne({where: {email: email} })
                .then(user => {
                    if(Users.isPassword(user.password, password)) {
                        let payload = {id: user.id};
                        res.json({token: jwt.encode(payload, config.jwtSecret)});
                    } else {
                        res.sendStatus(401);
                    }
                })
                .catch(error => res.sendStatus(401));
        } else {
            res.sendStatus(401);
        }
    });
};