require('dotenv').config();
const server = require('express');

const app = server();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const debug = require('./src/helpers/debug');
const status = require('./src/helpers/api');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// logger with morgan
app.use(morgan('combined'));

// api routes
app.use('/api', require('./src/routes'));

// start server
app.listen(process.env.APP_PORT, async () => {
  debug('entrypoint', status.serverRunning + process.env.APP_PORT);
});


module.exports = app;
