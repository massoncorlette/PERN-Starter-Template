require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the API'
  });
});

app.post('/api/posts', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Post created...',
        authData: authData.user
      });
    }
  })

});

// STARTER ROUTES

const jwt = require('jsonwebtoken');
const {indexRouter} = require('./routes/index');
const {signupRouter} = require('./routes/signup');
const {homeRouter} = require('./routes/home');

app.use('/', indexRouter);
app.use('/sign-up', signupRouter);

//app.use((req, res, next) => {
//  res.locals.currentUser = req.user;
//  next();
//});


app.use('/home', homeRouter);


app.listen(5000, () => console.log('Server started on port 5000'));

// Format of Token
// Authorization: Bearer <access_token>


// Verify Token
// checks Authorization Header
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    //split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();

  } else {
    res.sendStatus(403);
  }

}

app.listen(5000, () => console.log('Server started on port 5000'));