const emailAuth = (function() {
  var user = 'alfalfatechnologies@gmail.com';
  var pass = 'PinBack3*0';
  return function() {
    return {
      user,
      pass
    }
  }
})();

module.exports = emailAuth;
