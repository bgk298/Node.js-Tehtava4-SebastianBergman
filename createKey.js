const crypto = require('crypto');

// create a 512-bit random key and show it as a base64 encoded string
const buf = crypto.randomBytes(64);
console.log(buf.toString('base64'));
