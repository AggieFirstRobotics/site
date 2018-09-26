window.addEventListener('scroll', function updateHeaderClass() {
	if (window.pageYOffset > Math.min(window.innerHeight / 10, 200)) {
		document.querySelector('.site-header').classList.add('scrolling');
	} else {
		document.querySelector('.site-header').classList.remove('scrolling');
	}
});
