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

//GET home page
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

//GET users page
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

//GET register page
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

//Add user
router.post('/addUser', function(req, res, next) {
  var name = req.body.name;
  var lastname = req.body.lastname;
  var email = req.body.email;
  var formErr = '';

  if(name=='' || lastname=='' || email==''){
    if(name=='') {
      formErr += 'Name is required.';
    } else if(lastname=='') {
      formErr += 'Last name is required.';
    } else if(email=='') {
      formErr += 'Email is required.';
    } else {
      formErr = '';
    }

    res.render('register', {
      title: 'Register as a New User',
      navitems: [
          { link: '/', content: 'Home' },
          { link: '/users', content: 'Users' },
          { link: '/register', content: 'Register' }
      ],
      name: name,
      lastname: lastname,
      email: email,
      formErr: formErr
    });
  } else {
    var newUser = User.build({
      id: '',
      name: name,
      lastname: lastname,
      email: email
    });
    
    newUser.save();
    
    res.render('registerSuccess', {
      title: 'User Added Successfully',
      navitems: [
          { link: '/', content: 'Home' },
          { link: '/users', content: 'Users' },
          { link: '/register', content: 'Register' }
      ]
    });
  }
});

//GET updateForm page
router.get('/updateForm/:id', function(req, res, next) {
  users = User.findAll({
      where: { id: req.params.id }
    }).then(users=>{
    res.render('updateForm', {
        title: 'Update User',
        users: users,
        navitems: [
            { link: '/', content: 'Home' },
            { link: '/users', content: 'Users' },
            { link: '/register', content: 'Register' }
        ]
    });
  })
});


//Update user
router.post('/updateUser/:id', function(req, res, next) {
  var name = req.body.name;
  var lastname = req.body.lastname;
  var email = req.body.email;
  var formErr = '';

  if(name=='' || lastname=='' || email==''){
    if(name=='') {
      formErr += 'Name is required.';
    } else if(lastname=='') {
      formErr += 'Last name is required.';
    } else if(email=='') {
      formErr += 'Email is required.';
    } else {
      formErr = '';
    }

    res.render('updateForm', {
      title: 'Update User',
      navitems: [
          { link: '/', content: 'Home' },
          { link: '/users', content: 'Users' },
          { link: '/register', content: 'Register' }
      ],
      name: name,
      lastname: lastname,
      email: email,
      formErr: formErr
    });
  } else {
    User.update({
      name: name,
      lastname: lastname,
      email: email
    }, {
      where: {
        id: req.params.id
      }
    });
    
    users = User.findAll().then(users=>{
      res.render('registerSuccess', {
          title: 'User Updated Successfully',
          users: users,
          navitems: [
              { link: '/', content: 'Home' },
              { link: '/users', content: 'Users' },
              { link: '/register', content: 'Register' }
          ]
      });
    })
  }
});

//GET deleteForm page
router.get('/deleteForm/:id', function(req, res, next) {
  users = User.findAll({
      where: { id: req.params.id }
    }).then(users=>{
    res.render('deleteForm', {
        title: 'Remove User',
        users: users,
        navitems: [
            { link: '/', content: 'Home' },
            { link: '/users', content: 'Users' },
            { link: '/register', content: 'Register' }
        ]
    });
  })
});

//Delete user
router.post('/deleteUser/:id', function(req, res, next) {
    User.destroy({
      where: {
        id: req.params.id
      }
    });
    
    users = User.findAll().then(users=>{
      res.render('registerSuccess', {
          title: 'User Deleted Successfully',
          users: users,
          navitems: [
              { link: '/', content: 'Home' },
              { link: '/users', content: 'Users' },
              { link: '/register', content: 'Register' }
          ]
      });
    })
});



module.exports = router;