var express = require('express');
var router = express.Router();

//User = require('../models/users.js');

var Sequelize = require('sequelize');
const sequelize = new Sequelize('users', 'root', 'root', {
  host: 'localhost',
  port: '8889',
  dialect: 'mysql'
})

const User = sequelize.define('user', {
  'id': {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  'name': {
    type: Sequelize.STRING
  },
  'lastname': {
    type: Sequelize.STRING
  },
  'email': {
    type: Sequelize.STRING
  }
},
{
  timestamps: false
})

/* GET home page */
router.get('/', function(req, res, next) {
  res.render('index', {
      title: 'Home',
      navitems: [
          { link: '/', content: 'Home' },
          { link: '/users', content: 'Users' },
          { link: '/register', content: 'Register' }
      ]
  });
});

/* GET users page */
router.get('/staticUsers', function(req, res, next) {
  getUsers = function(){
    var users = [{"name":"sdf", "lastname":"Asdf"}];
    return users;
  }
  res.render('users', {
      title: 'Users',
      users: [{'Name':'Nicole', 'LastName':'Cayouette', 'id':'1'}],
      navitems: [
          { link: '/', content: 'Home' },
          { link: '/users', content: 'Users' },
          { link: '/register', content: 'Register' }
      ]
  });
});

router.get('/users', function(req, res, next) {
  users = User.findAll().then(users=>{
    res.render('users', {
        title: 'Users',
        users: users,
        navitems: [
            { link: '/', content: 'Home' },
            { link: '/users', content: 'Users' },
            { link: '/register', content: 'Register' }
        ]
    });
  })
});

/* GET contact page */
router.get('/register', function(req, res, next) {
  res.render('register', {
      title: 'Register',
      navitems: [
          { link: '/', content: 'Home' },
          { link: '/users', content: 'Users' },
          { link: '/register', content: 'Register' }
      ]
  });
});

//CONTACT FORM
router.post('/contactRegister', function(req, res, next) {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var verifyPassword = req.body.verifyPassword;
  var inputFile = req.body.inputFile;
  var formErr = '';
  
  if(name=='' || email=='' || password=='' || password!=verifyPassword){
    if(name=='') {
      formErr += 'Name is required.';
    } else if(email=='') {
      formErr += 'Email is required.';
    } else if(password=='') {
      formErr += 'Password is required.';
    } else if(password!=verifyPassword) {
      formErr += 'Passwords must match.';
    } else {
      formErr = '';
    }
    
    res.render('register', {
      title: 'Register',
      navitems: [
          { link: '/', content: 'Home' },
          { link: '/users', content: 'Users' },
          { link: '/register', content: 'Register' }
      ],
      name: name,
      email: email,
      inputFile: inputFile,
      formErr: formErr
    });
  } else {
    res.render('registerSuccess', {
      title: 'Registration Complete',
      navitems: [
          { link: '/', content: 'Home' },
          { link: '/users', content: 'Users' },
          { link: '/register', content: 'Register' }
      ],
      name: name,
      email: email,
      inputFile: inputFile
    });
  }

});

module.exports = router;
