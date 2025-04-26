
function randomString() {
  try {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    let result = 'aa';
    for (let i = 0; i < 7; i++) {
        result += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return result;
  } catch (e) {
    return null;
  }
}

module.exports = { randomString };
