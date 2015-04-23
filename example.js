var Easy = require('./');

var exp = Easy('%name/w% is having a %day/w% day today because %reason%.');
var match = exp.match('John is having a bad day today because he doesn\'t know what to write here.');

console.log('Name: ' + match.name);
console.log('Day: ' + match.day);
console.log('Reason: ' + match.reason);