window.ready(function addMenuListeners() {
	'use strict';
	function openSideBar() {
		document.querySelector('body').classList.add('menu-open');
		document.querySelector('.nav-links').classList.add('active');
		document.querySelector('#menu-overlay').classList.add('active');
		document.querySelector('#sidebar-toggle').classList.add('active');
		window.sideBarState = 'open';
	}

	function closeSideBar() {
		document.querySelector('body').classList.remove('menu-open');
		document.querySelector('#menu-overlay').classList.remove('active');
		document.querySelector('.nav-links').classList.remove('active');
		document.querySelector('#sidebar-toggle').classList.remove('active');
		window.sideBarState = 'closed';
	}

	function onTab(event) {
		var menuElements = document.querySelector('.nav-links').children;
		if (document.activeElement.parentElement.isEqualNode(menuElements[menuElements.length - 1])) {
			event.preventDefault();
			document.querySelector('#sidebar-toggle').focus();
		}
	}

	function onEscape(event) {
		event.preventDefault();
		closeSideBar();
		window.onkeydown = null;
	}

	function onKeyPress(event) {
		var fnMap = {
			// KeyCode 9 is tab
			9: onTab,
			// KeyCode 27 is escape
			27: onEscape
		};

		if (event.keyCode && (typeof fnMap[event.keyCode] === 'function')) {
			fnMap[event.keyCode](event);
		}
	}

	window.sideBarState = 'closed';
	window.onkeydown = null;
	document.querySelector('#sidebar-toggle').addEventListener('click', function sideBarEvent(event) {
		event.preventDefault();
		if (window.sideBarState === 'closed') {
			window.onkeydown = onKeyPress;
			openSideBar();
		} else {
			window.onkeydown = null;
			closeSideBar();
		}
	});

	document.querySelector('#menu-overlay').addEventListener('click', function menuOverlayEvent(event) {
		document.querySelector('body').classList.remove('menu-open');
		event.preventDefault();
		if (window.sideBarState === 'open') {
			closeSideBar();
		}
	});
});
