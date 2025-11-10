// Mobile nav toggle
(function () {
	const toggle = document.querySelector('.nav-toggle');
	const menu = document.getElementById('nav-menu');
	if (!toggle || !menu) return;

	toggle.addEventListener('click', () => {
		const isOpen = menu.classList.toggle('open');
		toggle.setAttribute('aria-expanded', String(isOpen));
	});

	// Close menu on link click (mobile)
	menu.addEventListener('click', (e) => {
		if (e.target instanceof Element && e.target.matches('a')) {
			menu.classList.remove('open');
			toggle.setAttribute('aria-expanded', 'false');
		}
	});
})();

// Smooth scroll for anchor links
(function () {
	const links = document.querySelectorAll('a[href^="#"]');
	links.forEach((link) => {
		link.addEventListener('click', (e) => {
			const href = link.getAttribute('href');
			if (!href) return;
			const target = document.querySelector(href);
			if (target) {
				e.preventDefault();
				target.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
		});
	});
})();

// Footer year
(function () {
	const year = document.getElementById('year');
	if (year) year.textContent = String(new Date().getFullYear());
})();


