const jwt = require('jwt-simple');

describe('Route: Tasks', () => {
    const Users = app.libs.db.models.Users;
    const jwtSecret = app.libs.config.jwtSecret;
    let token;

    beforeEach(done => {
        Users
            .destroy({where: {}})
            .then(() => Users.create({
                name: 'John',
                email: 'john@email.net',
                password: '123456'
            }))
            .then(user => {
                token = jwt.encode({id: user.id}, jwtSecret);
                done();
            });
    });
    describe('GET /user', () => {
        describe('status 200', () => {
            it('returns an authenticated user', done => {
                request.get('/user')
                    .set('Authorization', `JWT ${token}`)
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body.name).to.eql('John');
                        expect(res.body.email).to.eql('john@email.net');
                        done(err);
                    });
            });
        });
    });
    describe('DELETE /user', () => {
        describe('status 204', () => {
            it('delete an authenticated user', done => {
                request.delete('/user')
                    .set('Authorization', `JWT ${token}`)
                    .expect(204)
                    .end((err, res) => done(err));
            });
        });
    });
    describe('POST /users', () => {
        describe('status 200', () => {
            it('creates a new user', done => {
                request.post('/users')
                    .send({
                        name: 'Mary',
                        email: 'mary@email.net',
                        password: '123456'
                    })
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body.name).to.eql('Mary');
                        expect(res.body.email).to.eql('mary@email.net');
                        done(err);
                    });
            });
        });
    });

});