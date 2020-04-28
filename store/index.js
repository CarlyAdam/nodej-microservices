require('dotenv').config();
const server = require('express');

const app = server();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const debug = require('./src/helpers/debug');
const status = require('./src/helpers/api');
const db = require('./src/db');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// logger with morgan
app.use(morgan('combined'));

// api routes
app.use('/api', require('./src/routes'));

// connect db
db.connect(process.env.DB_URL)
  .then(() => debug('db', status.dbConnected))
  .catch((err) => debug('db', err.message));

// start server
app.listen(process.env.APP_PORT, async () => {
  debug('entrypoint', status.serverRunning + process.env.APP_PORT);
});


module.exports = app;

