var express = require('express');
var router = express.Router();

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
router.get('/users', function(req, res, next) {
  res.render('users', {
      title: 'Users',
      users: [{'Name':'Nicole', 'LastName':'Cayouette'}],
      navitems: [
          { link: '/', content: 'Home' },
          { link: '/users', content: 'Users' },
          { link: '/register', content: 'Register' }
      ]
  });
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
