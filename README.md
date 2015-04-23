# EasyRegex
A more simplified version of regex to make it easier to read, more compact, and faster to use.

# Installation
```
npm install easyregex
```

# Usage
```js
var Easy = require('easyregex');

var match = new Easy('From: %from/w%, message: %mes%').match('bla bla From: abc, message: bla bla');
var multimatch = new Easy('%num1/w%:%num2/w%').match('1:2 3:4 5:6', { multi: true});

match = {
	from: 'abc',
	message: 'bla bla'
}

multimatch = [
	{
		num1: 1,
		num2: 2
	}, {
		num1: 3,
		num2: 4
	},
	{
		num1: 5,
		num2: 6
	}
]
```

# Easy
## Usage
```js
var Easy = require('easyregex');
```

### Easy.string
Inputted string into the EasyRegex

### Easy.expression()
Returns an object:
```
{
	expression: The RegExp created,
	variables: Array of variables in the format [name, options]
}
```

### Easy.match(string, options)
Match the string to the easy expression, returns an object.

#### Options
##### Multi
If multi is selected, match() will return an array of match objects rather than just one.