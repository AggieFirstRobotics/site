
window._readyExec = [];
if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
	window._readyExec = false;
} else {
	document.addEventListener('DOMContentLoaded', function runAllOnloadScripts() {
		'use strict';
		for (var i = 0; i < window._readyExec.length; i++) {
			window._readyExec[i]();
		}
	});
}

window.ready = function queueFunction(fnToRun) {
	'use strict';
	if (window._readyExec) {
		window._readyExec.push(fnToRun);
	} else {
		fnToRun();
	}
};
