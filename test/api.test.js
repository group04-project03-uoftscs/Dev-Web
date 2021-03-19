const request = require('supertest');
const app = require('../server');


describe('API calls associated with User database', () => {
  
  describe('GET /api/user/:user', () => {
    it('respond with a json with user information', (done) => {

      request(app)
        .get('/api/user/test')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
      
    });
  })

  describe('POST /api/user/:user', () => {
    it('responds with json', done => {
      request(app)
        .post('/api/user/test')
        .send({
          id: "id123456",
          date: "Mar 18, 2021",
          type: "test"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

});


describe('Third party API calls', () => {
  
  describe('GET /api/thirdparty/codewars', () => {
    it('respond with json containing a codewars challenge', (done) => {

      request(app)
        .get('/api/thirdparty/codewars')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
      
    });
  })

  describe('GET /listennotespodcasts', () => {
    it('respond with json containing a list of podcasts', (done) => {

      request(app)
        .get('/api/thirdparty/listennotespodcasts')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  })

  describe('GET /listennotesepisodes', () => {
    it('respond with json containing a list of episodes', (done) => {

      request(app)
        .get('/api/thirdparty/listennotesepisodes')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
      
    });
  })
  
});

