describe('Routes: Token', () => {
    const Users = app.libs.db.models.Users;

    describe('POST /token', () => {
        beforeEach(done => {
            Users
                .destroy({where: {} })
                .then(() => Users.create({
                    name: 'John',
                    email: 'john@email.net',
                    password: '123456'
                }))
                .then(result => done());
        });

        describe('status 200', () => {
            it('returns authenticated user token', done => {
                request.post('/token')
                    .send({
                        email: 'john@email.net',
                        password: '123456' 
                    })
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body).to.include.keys('token');
                        done(err);
                    });
            });
            it('throws error when password is incorrect', done => {
                request.post('/token')
                    .send({
                        email: 'john@email.net',
                        password: 'AAAAAA' 
                    })
                    .expect(401)
                    .end((err, res) => done(err));
            });
            it('throws error when email not exist', done => {
                request.post('/token')
                    .send({
                        email: 'any@email.net',
                        password: 'AAAAAA' 
                    })
                    .expect(401)
                    .end((err, res) => done(err));
            });
            it('throws error when email and password are blank', done => {
                request.post('/token')
                    .expect(401)
                    .end((err, res) => done(err));
            });
        });
        
    }); 
});