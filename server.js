const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const log = require('./icon-log/icon-log');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// body parse middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// db config
const db = require('./config/keys').mongoURI;

// connect to mongodb
mongoose
  .connect(db)
  .then(() => log.success('MongoDB Connected'))
  .catch(err => log.error(err));

// passport middleware
app.use(passport.initialize());

// // passport config
require('./config/passport')(passport);

// routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => log.success(`Server running on port ${port}`));
