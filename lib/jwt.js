
const jwt = require('jsonwebtoken');

const has = Object.prototype.hasOwnProperty;

function verifyJWTToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err || !decodedToken) {
        return reject(err);
      }

      resolve(decodedToken);
    });
  });
}

function createJWToken(data) {
  if (typeof data !== 'object') {
    throw new Error('data must be an object');
  }
  if (
    !has.call(data, 'name')
    || !has.call(data, 'plat')
    || !has.call(data, 'id')
  ) {
    throw new Error('Bad object format');
  }

  const token = jwt.sign({
    data,
  }, process.env.JWT_SECRET, {
    algorithm: 'HS256',
  });

  return token;
}

module.exports = {
  verifyJWTToken,
  createJWToken,
};
