require('dotenv').config();

const FtpDeploy = require('ftp-deploy');
const ftpDeploy = new FtpDeploy();

const config = {
  user: process.env.FTP_USER,                   // NOTE that this was username in 1.x 
  password: process.env.FTP_PASS,           // optional, prompted if none given
  host: process.env.FTP_HOST,
  port: 21,
  localRoot: __dirname + '/../build/',
  remoteRoot: '/www/',
  include: ['*', '**/*'],      // this would upload everything except dot files
  // include: ['build/*'],
  exclude: [],     // e.g. exclude sourcemaps
  deleteRemote: false              // delete existing files at destination before uploading
}

// use with promises
ftpDeploy.deploy(config)
  .then(res => console.log('finished'))
  .catch(err => console.log(err))
