describe('Routes: Index', () => {
    describe('GET /', () => {
        it('returns the API status', done => {
            request.get('/')
                .expect(200)
                .end((err, res) => {
                    expect(res.body).to.eql({status: 'NTask API'});
                    done(err);
                });
        });
    });
});