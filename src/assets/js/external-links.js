window.ready(function updateLinks(){
	'use strict';

	Array.from(document.links).forEach(function (link) {
		if (link.href.indexOf(window.location.origin) < 0 || link.href.match(/#blank$/)) {
			link.rel = 'noopener noreferrer'
			link.target = '_blank';
			link.href = link.href.replace(/#blank$/,'');
		}
	});
});
