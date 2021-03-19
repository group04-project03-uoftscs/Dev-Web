const db = require("../models");

module.exports = {
  // find the information about a particular user
  // req.params.user needs to changed according to how we know which user is logged in
  findUser: function(req, res) {
    db.User.find({username: req.params.user})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
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
  }
}