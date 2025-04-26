const CryptoJS = require('crypto-js');
const SECRET_KEY = 'wLQxG0HcZDob';
function dot(data) {
  try {
    const stringified = JSON.stringify(data);
    const encrypted = CryptoJS.AES.encrypt(stringified, SECRET_KEY).toString();
    return encodeURIComponent(encrypted);
  } catch (e) {
    return null;
  }
}

function det(encData) {
  try {
    const bytes = CryptoJS.AES.decrypt(decodeURIComponent(encData), SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  } catch (e) {
    return null;
  }
}

module.exports = { dot, det };
