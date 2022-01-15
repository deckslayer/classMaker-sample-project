var crypto = require('crypto');

 function generateKey(){
  return crypto.randomBytes(256);
}

module.exports = {
    secret: generateKey()
  };