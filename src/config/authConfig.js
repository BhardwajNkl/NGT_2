const { randomBytes } = require('crypto');

const generateSecretKey = (length) => {
  return randomBytes(length).toString('hex');
};

const secretKey = generateSecretKey(32);

const authConfig = {
  secret: secretKey
};

module.exports = authConfig;
