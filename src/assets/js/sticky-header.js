window.addEventListener('scroll', function updateHeaderClass() {
	if (window.pageYOffset > (window.innerHeight / 10)) {
		document.querySelector('.site-header').classList.add('scrolling');
	} else {
		document.querySelector('.site-header').classList.remove('scrolling');
	}
});
