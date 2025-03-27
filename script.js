function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const animate = () => {
            const target = +counter.getAttribute('data-target');
            let count = +counter.innerText;
            const increment = target / 100;

            if(count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animate, 10);
            } else {
                counter.innerText = target; 
                counter.parentElement.classList.add('finished'); 
            }
        };

        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                animate();
                observer.disconnect(); 
            }
        }, { threshold: 0.5 });

        observer.observe(counter);
    });
}

window.addEventListener('load', animateCounters);


document.addEventListener("DOMContentLoaded", () => {
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
        updateButtonAppearance(savedTheme);
    } else {
        body.classList.add('dark-theme');
        updateButtonAppearance('dark-theme');
    }

    themeToggleButton.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light-theme');
            updateButtonAppearance('light-theme');
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark-theme');
            updateButtonAppearance('dark-theme');
        }
    });

    function updateButtonAppearance(theme) {
        if (theme === 'dark-theme') {
            themeToggleButton.textContent = '⬜';
        } else {
            themeToggleButton.textContent = '⬛';
        }
    }
});

