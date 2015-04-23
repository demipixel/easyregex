
function EasyRegex(reg) {
	
	this.string = reg;
	
	this.match = function(str, opt) {
		if (!opt) opt = {};
		
		var exp = createExpression(this.string);
		
		var multi = opt.multi || false;
		
		if (multi) {
			var arrMatch = null;
		
			var matches = Array();
		
			while (arrMatch = exp.expression.exec(str)) {
				var currentMatch = arrMatch.slice(1);
				
				var match = {};
				
				for (var i = 0; i < currentMatch.length; i++) {
					if (exp.variables[i]) match[exp.variables[i][0]] = currentMatch[i];
				}
				matches.push(match);
			}
			
			return matches;
			
		} else {
			var match = exp.expression.exec(str);
			if (match) match = match.slice(1);
			else match = [];
			var obj = {};
			
			
			for (var i = 0; i < match.length; i++) {
				if (exp.variables[i]) obj[exp.variables[i][0]] = match[i];
			}
			
			return obj;
		}
	}
	
	this.expression = function() {
		return createExpression(this.string);
	}
	
	return this;
}

function createExpression(str) {
	
	var reg = '';
	
	var arrMatch = null;
	var pattern = /[^\\]?%(([^ ]*?)(\/(.*?))?)%/g;
	
	var variables = Array();
	var exists = Array();
	
	var lastLength = 0;
	
	var escapes = /([\[\]\{\}\.\*\?\^\$\\\+])/g;
	str = str.replace(escapes, '\\$1');
	
	while(arrMatch = pattern.exec(str)) {
		if (!arrMatch[4]) arrMatch[4] = null;
		variables.push([arrMatch[2], arrMatch[4]]);
		
		var subset = arrMatch[4] && arrMatch[4].match('w') ? '(\\S*)' : '(.*)';
		if (arrMatch[4] && arrMatch[4].match('s')) subset = subset.replace('*', '*?');
		
		var extra = str.slice(lastLength, arrMatch.index + 1);
		reg += (arrMatch.index != 0 ? extra : '') + subset;
		lastLength = arrMatch.index + arrMatch[0].length;
		
	}
	
	reg += str.slice(lastLength, str.length);
	
	return {
		expression: new RegExp(reg, 'g'),
		variables: variables
	}
}

module.exports = EasyRegex;