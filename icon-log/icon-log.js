const logSymbol = require('log-symbols');

var info = function() {
  var fgBlue = '\x1b[34m';
  var icon = logSymbol.info;
  log(icon, fgBlue, arguments);
};

var success = function() {
  var fgGreen = '\x1b[32m';
  var icon = logSymbol.success;
  log(icon, fgGreen, arguments);
};

var warning = function() {
  var fgYellow = '\x1b[33m';
  var icon = logSymbol.warning;
  log(icon, fgYellow, arguments);
};

var error = function() {
  var fgRed = '\x1b[31m';
  var icon = logSymbol.error;
  log(icon, fgRed, arguments);
};

var log = function(icon, style, arguments) {
  var msg = '';
  var resetStyle = '\x1b[0m';
  for (var i = 0; i < arguments.length; i++) {
    if (i === 0) {
      msg = `\b${arguments[i]}`;
    } else {
      msg += `${arguments[i]} `;
    }
  }

  console.log(icon, style, msg, resetStyle);
};

module.exports = {
  info,
  success,
  warning,
  error
};
