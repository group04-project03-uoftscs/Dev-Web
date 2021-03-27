const utils = require('./utils')

const Token = {
  consumeRememberMeToken(tokens, token, fn) {
    let user = tokens[token];
    console.log('This is token ', tokens)
    console.log('user in consume ' + user)
    delete tokens[token];
    return fn(null, user)
  },
  saveRememberMeToken(tokens, token, user, fn) {
    tokens[token] = user;
    console.log('user in save ' + user)
    return fn();
  },
  issueToken(tokens, token, user, done) {
    this.saveRememberMeToken(tokens, token, user, function(err) {
    if (err) { return done(err); }
    return done(null, token);
  });
  }
}

module.exports = Token