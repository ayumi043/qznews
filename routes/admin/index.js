'use strict';
var db      = require('../../models');
var express = require('express');
var router  = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log(process.env.NODE_ENV);

  var result = { title: 'Express@@@' };
  Promise.all([
    db.sequelize.query("SELECT * FROM `User`", { type: db.sequelize.QueryTypes.SELECT })
      .then(function (users) {
        console.log(users);
        result.users = users;
      }),

    db.sequelize.query("SELECT * FROM `Article`", { type: db.sequelize.QueryTypes.SELECT })
      .then(function (articles) {
        console.log(articles);
        result.articles = articles;
      })
  ]).catch(function (err) {
    console.log(err);
  }).then(function (arrayOfResults) {
    res.render('admin/index', result);
  }); 
  
  //res.render('index', result);
});

router.get('/users', function (req, res, next) {  
  var result = { title: 'Express@' };
  Promise.all([
    db.sequelize.query("SELECT * FROM `User`", { type: db.sequelize.QueryTypes.SELECT })
      .then(function (users) {
        console.log(users);
        result.users = users;
      }),

    db.sequelize.query("SELECT * FROM `Article`", { type: db.sequelize.QueryTypes.SELECT })
      .then(function (articles) {
        console.log(articles);
        result.articles = articles;
      })
  ]).catch(function (err) {
    console.log(err);
  }).then(function (arrayOfResults) {
    res.render('admin/users', result);
  }); 
  
});

module.exports = router;