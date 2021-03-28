const db = require("../models");

module.exports = {
  // find the information about a particular user
  // req.params.user needs to changed according to how we know which user is logged in
  getAllGithubUsers: function(req, res) {
    db.User.find({})
      .then(dbModel => {
        const usernames = [];
        for(let i = 0; i < dbModel.length; i++) {
          if(dbModel[i].github !== undefined) {
            usernames.push(dbModel[i].github.username)
          }
          else{
            usernames.push()
          }
        }
        res.json(usernames)
      })
      .catch(err => res.status(422).json(err));
  },

  // find the information about a particular user
  // req.params.user needs to changed according to how we know which user is logged in
  findUser: function(req, res) {
    db.User.find({username: req.params.user})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  // addUser will be used to add a user to the database when they register for the first time
  addUser: function(req,res) {
    db.User.findOne({username: req.body.username}, (err, user) => {
      if(err) throw err;
      if(user) res.send('User already exists');
     if(!user) {
        db.User.create(req.body)
        .then(data => res.json(data));
      }
    })
  },

  // update users info - this can be used for new users pages and account settings
  updateUser: function(req, res) {
    db.User.update(
      { username : req.params.user },
      req.body
  ).then(dbModel => {
      console.log(dbModel);
      res.json(dbModel)
    })
    .catch(err => res.status(422).json(err));
  },

  // Remove user from database
  removeUser: function(req,res) {
    console.log('removing');
    console.log(req.params.user)
    db.User.findOneAndDelete({username: req.params.user})
      .then(dbModel => {
        console.log(dbModel)
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },

  // adds a favourite item (like the news, podcasts)
  // and push it to the favorites array for that user
  saveFavorite: function(req,res) {
    console.log(req.params.user);
    console.log(req.body)
    db.User.update(
      { username : req.params.user },
      {
        $push:
          {
              favorites: {
                $each: [req.body],
                $position: 0
              } 
          }
      }
  ).then(dbModel => {
      console.log(dbModel);
      res.json(dbModel)
    })
    .catch(err => res.status(422).json(err));
  },

  //Used to update new user status
  getLocalUserUpdate: function(req,res) {
    console.log(req.params.user);
    console.log(req.body);
    db.User.findOneAndUpdate({username: req.params.user},
      req.body,
      {new: true}
      )
      .then(dbModel => {
        console.log(dbModel);
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },

  // renives a favourite item (like the news, podcasts)
  // and pulls it fromt the favorites array for that user
  removeFavorite: function(req,res) {
    console.log(req.params.user);
    console.log(req.body)
    db.User.update(
      { username : req.params.user },
      {
        $pull:
          {
              favorites: {id : req.body.id}
          }
      }
  ).then(dbModel => {
      console.log(dbModel);
      res.json(dbModel)
    })
    .catch(err => res.status(422).json(err));
  },

  addNonLocalUser: function(req,res) {
    console.log(req.body);
    db.User.create(req.body)
    .then(dbModel => {
      console.log(dbModel);
      res.json(dbModel)
    })
    .catch(err => res.status(422).json(err));
  },

  findGithubUser: function(req,res) {
    db.User.find({"github.id": (req.params.user)})
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  },

  findGoogleUser: function (req, res) {
    db.User.find({'google.sub': req.params.user})
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  },

  findGoogleUser: function (req, res) {
    db.User.find({'google.sub': req.params.user})
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  }
}