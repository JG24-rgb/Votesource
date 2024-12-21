
const words = ['Employees!', 'Business Owners!', 'Students!', 'Everyone!'];

const dynamicText = document.getElementById('dynamic-text');

let wordIndex = 0;
let letterIndex = 0;

function animateText() {
    const currentWord = words[wordIndex];
    letterIndex++;

    dynamicText.textContent = currentWord.slice(0, letterIndex);

    if (letterIndex === currentWord.length) {
        letterIndex = 0;
        wordIndex++;

        if (wordIndex === words.length) {
            wordIndex = 0;
        }
    }
}

setInterval(animateText, 4000 / words[0].length);




const navbar = document.querySelector('.navbar');
const menuLink = document.querySelector('.menu-link');
const closeLink = document.querySelector('.close-link');


menuLink.addEventListener('click', (e) => {
    e.preventDefault();
    navbar.classList.add('visible');
    navbar.classList.remove('hidden');
});


closeLink.addEventListener('click', (e) => {
    e.preventDefault();
    navbar.classList.add('hidden');
    navbar.classList.remove('visible');
});





function fadeGraphs(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}

const graphObserver = new IntersectionObserver(fadeGraphs, {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
});

const graphImages = document.querySelectorAll('.graph-container img');

graphImages.forEach(img => {
    graphObserver.observe(img);
});



window.addEventListener('scroll', function() {
    graphImages.forEach(img => {
        if (isElementInViewport(img) && !img.classList.contains('fade-in')) {
            img.classList.add('fade-in');
        }
    });
});

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}


document.querySelectorAll('.accordion a').forEach((button, index) => {
    const accordionContent = button.nextElementSibling;

    // Automatically open the first accordion
    if (index === 0) {
        button.classList.add('active');
        accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
        accordionContent.classList.add('expanded');
    }

    // Add event listener for toggling
    button.addEventListener('click', () => {
        button.classList.toggle('active');

        if (button.classList.contains('active')) {
            accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
            accordionContent.classList.add('expanded');
        } else {
            accordionContent.style.maxHeight = 0;
            accordionContent.classList.remove('expanded');
        }
    });
});




function triggerSvgAnimations(entries, observer) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const svg = entry.target;

            // Add animations to bar graphs or paths
            svg.querySelectorAll('rect, path').forEach((bar) => {
                bar.style.animation = 'barGrow 1s ease-in-out forwards';
                bar.style.transform = 'scaleY(0)'; // Initial state
            });

            observer.unobserve(svg); // Stop observing once the animation is triggered
        }
    });
}

// Intersection Observer to watch SVGs
const svgObserver = new IntersectionObserver(triggerSvgAnimations, {
    root: null,
    rootMargin: '0px',
    threshold: 0.3, // Trigger when 30% of the SVG is visible
});

// Replace <img> tags with inline SVGs and observe them
document.querySelectorAll('.graph-container img').forEach((img) => {
    fetch(img.src)
        .then((response) => response.text())
        .then((svgContent) => {
            const div = document.createElement('div');
            div.innerHTML = svgContent;
            const svg = div.querySelector('svg');

            // Add a class for styling
            svg.classList.add('animated-svg');

            // Ensure proper scaling and responsiveness
            svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
            svg.setAttribute('width', '100%');
            svg.setAttribute('height', 'auto');

            img.replaceWith(svg); // Replace the img with the SVG content

            // Observe the SVG for intersection (scroll into view)
            svgObserver.observe(svg);
        })
        .catch((error) => console.error(`Error loading SVG: ${img.src}`, error));
});











