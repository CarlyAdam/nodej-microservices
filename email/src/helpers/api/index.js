
const dbConnected = 'Database connected successfully';
const serverRunning = 'Server running on port:';
const successMessage = 'Email sent successfully';
const errorMessage = "'Sorry something broke!, please try again!'";


const status = {
  success: 200,
  error: 500,
  notfound: 404,
  unauthorized: 401,
};

module.exports = {
  dbConnected,
  serverRunning,
  successMessage,
  errorMessage,
  status,

};
