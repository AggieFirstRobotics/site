'use strict';

const beep = require('beepbeep');

module.exports = error => {
	console.log(error);
	beep(1);
	this.emit('end');
};
