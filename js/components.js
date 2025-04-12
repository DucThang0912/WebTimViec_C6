document.addEventListener('DOMContentLoaded', function() {
    // Load header
    fetch('components/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            initializeHeader();
        })
        .catch(error => {
            console.error('Error loading header:', error);
        });

    // Load footer
    fetch('components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
            initializeFooter();
        })
        .catch(error => {
            console.error('Error loading footer:', error);
        });
});

function initializeHeader() {
    // Add active class to current page link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        if (link.getAttribute('href').includes(currentPage)) {
            link.classList.add('active');
        }
    });
}

function initializeFooter() {
    // Add any footer-specific initialization here
    const year = new Date().getFullYear();
    const copyright = document.querySelector('.footer-bottom p');
    if (copyright) {
        copyright.innerHTML = `&copy; ${year} WebTimViec. All rights reserved.`;
    }
}