'use strict';

var db           = require('../models');
var _            = require('underscore');
var express      = require('express');
var router       = express.Router();
var path         = require('path');
var fs           = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log(process.env.NODE_ENV);

  var result = { title: 'lzx' };
  Promise.all([
    db.sequelize.query("SELECT * FROM `User`", { type: db.sequelize.QueryTypes.SELECT })
      .then(function (users) {
        console.log(users);
        result.users = users;
      }),

    db.sequelize.query(`
        SELECT t1.ID as ID,t1.TITLE,t2.ID as CommentID,t2.CONTENT
        FROM Article t1
        left join Comment t2 on t2.ArticleID=t1.ID
      `, { type: db.sequelize.QueryTypes.SELECT })
      .then(function (arti_comm) {
        
        console.time("concatenation");
        var _groupby = _.groupBy(arti_comm, function (item) {
          return item.ID;
        });        
        var res = _.map(_groupby, function (value, key) {
          return {
            ID:key,
            TITLE:value[0].TITLE,
            Comment:_.map(value, function(item){
               return {
                 CommentID:item.CommentID,
                 CONTENT: item.CONTENT
                };
            })
          };         
        });        
        // arti_with_comm:[
        //   {
        //     "ID":"1",
        //     "Title":"title",
        //     "Comment":[{},{},{}]
        //   },
        //   ...
        // ]
        
        console.timeEnd("concatenation");

        //console.log(arti_comm);
        result.arti_with_comm = res;
      })
  ]).catch(function (err) {
    console.log(err);
  }).then(function (arrayOfResults) {
    res.render('index', result);
  });  
});

router.post('/task', function (req, res, next) {
    setInterval(function () {
        console.log('task runing ~~~');
    }, 60 * 60 * 1000);    
    res.send("task starting ~~~");
});

router.get('/debug', function (req, res, next) {
    var root = path.resolve(__dirname, '..');
    console.log(root+'\\README.md');   
    // fs.readFile(root+'\\README.md', function (err, data) {
    //     if (err) throw err;
    //     console.log(data);
    // });
    // res.sendfile(root+'\\README.md');
    
   
    var d =new Date();    
    fs.writeFile('update_at.txt',  d.toLocaleString(), function (err) {
        if (err) throw err;
        console.log('It\'s saved!');
    });    
   
    // var stream = fs.createWriteStream("my_file.txt");
    // stream.once('open', function (fd) {
    //     stream.write("My first row\r\n");
    //     stream.write("My second row\r\n");
    //     stream.end();
    // });
    
    res.send('hello');
});


module.exports = router;