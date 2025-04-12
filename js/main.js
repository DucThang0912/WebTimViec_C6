document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true
    });

    // Initialize Particles.js
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#ffffff'
            },
            opacity: {
                value: 0.5
            },
            size: {
                value: 3
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#ffffff',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 6
            }
        }
    });

    // Initialize Swiper
    const swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        breakpoints: {
            640: {
                slidesPerView: 2
            },
            1024: {
                slidesPerView: 3
            }
        }
    });

    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / 200;

        function updateCounter() {
            const count = +counter.innerText;
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCounter, 1);
            } else {
                counter.innerText = target;
            }
        }

        updateCounter();
    });

    // Load Categories
    fetch('/data/categories.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('categories-container');
            data.categories.forEach(category => {
                // Map material icons to Font Awesome icons
                const iconMap = {
                    'computer': 'fas fa-laptop-code',
                    'campaign': 'fas fa-bullhorn',
                    'account_balance': 'fas fa-landmark',
                    'trending_up': 'fas fa-chart-line',
                    'engineering': 'fas fa-hard-hat',
                    'people': 'fas fa-users',
                    'palette': 'fas fa-palette',
                    'school': 'fas fa-graduation-cap',
                    'local_hospital': 'fas fa-hospital',
                    'factory': 'fas fa-industry'
                };

                const faIcon = iconMap[category.icon] || 'fas fa-briefcase'; // Default icon if not found

                container.innerHTML += `
                    <div class="category-card" data-aos="fade-up">
                        <div class="category-icon">
                            <i class="${faIcon}"></i>
                        </div>
                        <h3>${category.name}</h3>
                        <p>${category.job_count} jobs available</p>
                    </div>
                `;
            });
        });

    // Load Featured Jobs
    fetch('/data/jobs.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load jobs data');
            }
            return response.json();
        })
        .then(data => {
            const container = document.getElementById('featured-jobs-container');
            if (!container) {
                console.error('Featured jobs container not found');
                return;
            }

            // Clear existing content
            container.innerHTML = '';

            // Check if data and jobs array exists
            if (!data || !data.jobs || !Array.isArray(data.jobs)) {
                console.error('Invalid jobs data format');
                return;
            }

            data.jobs.slice(0, 6).forEach(job => {
                // Ensure all required job properties exist
                const jobTitle = job.title || 'Untitled Position';
                const companyName = job.company || 'Company Name';
                const location = job.location || 'Location Not Specified';
                const salary = job.salary || 'Salary Not Specified';
                const jobType = job.type || 'Not Specified';

                container.innerHTML += `
                    <div class="swiper-slide">
                        <div class="job-card">
                            <div class="job-header">
                                <img src="${getValidImageUrl(job.company_logo, 100, 100)}" alt="${companyName}">
                                <div class="job-title-company">
                                    <h3>${jobTitle}</h3>
                                    <p>${companyName}</p>
                                </div>
                            </div>
                            <div class="job-details">
                                <span><i class="fas fa-map-marker-alt"></i> ${location}</span>
                                <span><i class="fas fa-dollar-sign"></i> ${salary}</span>
                                <span><i class="fas fa-clock"></i> ${jobType}</span>
                            </div>
                            <a href="pages/job-detail.html?id=${job.id}" class="apply-btn">Apply Now</a>
                        </div>
                    </div>
                `;
            });

            // Reinitialize Swiper after content is loaded
            if (typeof Swiper !== 'undefined') {
                new Swiper('.swiper-container', {
                    slidesPerView: 1,
                    spaceBetween: 30,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },
                    breakpoints: {
                        640: {
                            slidesPerView: 2
                        },
                        1024: {
                            slidesPerView: 3
                        }
                    }
                });
            }
        })
        .catch(error => {
            console.error('Error loading jobs:', error);
            const container = document.getElementById('featured-jobs-container');
            if (container) {
                container.innerHTML = `
                    <div class="error-message">
                        <i class="fas fa-exclamation-circle"></i>
                        <p>Failed to load jobs. Please try again later.</p>
                    </div>
                `;
            }
        });

    // Load Companies
    fetch('/data/companies.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('companies-container');
            data.companies.slice(0, 8).forEach(company => {
                container.innerHTML += `
                    <div class="company-card" data-aos="fade-up">
                        <div class="company-banner">
                            <span class="company-size"><i class="fas fa-users"></i> ${company.size}</span>
                            <div class="company-logo-wrapper">
                                <img src="${getValidImageUrl(company.logo, 150, 150)}" alt="${company.name}">
                            </div>
                            <span class="company-rating"><i class="fas fa-star"></i> ${company.rating}</span>
                        </div>
                        <div class="company-content">
                            <h3>${company.name}</h3>
                            <div class="company-details">
                                <span><i class="fas fa-building"></i> ${company.industry}</span>
                                <span><i class="fas fa-map-marker-alt"></i> ${company.location}</span>
                            </div>
                            <div class="company-actions">
                                <a href="${company.website}" class="view-profile-btn" target="_blank">View Profile</a>
                            </div>
                        </div>
                    </div>
                `;
            });
        });
});


// Hàm để kiểm tra và trả về URL ảnh hợp lệ
function getValidImageUrl(imageUrl, width = 300, height = 300) {
    // if (!imageUrl || imageUrl.trim() === '') {
        return `https://placehold.co/${width}x${height}/764ba2/FFFFFF?text=No+Image`;
    // }
    // return imageUrl;
}