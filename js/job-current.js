document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init();

    // Sample job data
    const jobs = [
        {
            title: "Senior Frontend Developer",
            company: "Tech Solutions",
            logo: "images/company-logos/tech-solutions.png",
            location: "Ho Chi Minh City",
            type: "Full-time",
            salary: "$2000-$3000",
            tags: ["React", "Vue.js", "JavaScript"]
        },
        {
            title: "UX Designer",
            company: "Creative Agency",
            logo: "images/company-logos/creative-agency.png",
            location: "Ha Noi",
            type: "Remote",
            salary: "$1500-$2500",
            tags: ["Figma", "Adobe XD", "UI Design"]
        },
        {
            title: "Backend Developer",
            company: "Data Systems",
            logo: "images/company-logos/data-systems.png",
            location: "Da Nang",
            type: "Full-time",
            salary: "$1800-$2800",
            tags: ["Node.js", "Python", "MongoDB"]
        }
    ];

    // Render jobs
    const jobList = document.getElementById('jobList');
    jobs.forEach(job => {
        const jobCard = `
            <div class="job-card" data-aos="fade-up">
                <img src="${job.logo}" alt="${job.company}" class="company-logo">
                <h3 class="job-title">${job.title}</h3>
                <p class="company-name">${job.company}</p>
                <div class="job-details">
                    <span class="job-detail">
                        <i class="fas fa-map-marker-alt"></i>
                        ${job.location}
                    </span>
                    <span class="job-detail">
                        <i class="fas fa-briefcase"></i>
                        ${job.type}
                    </span>
                    <span class="job-detail">
                        <i class="fas fa-dollar-sign"></i>
                        ${job.salary}
                    </span>
                </div>
                <div class="job-tags">
                    ${job.tags.map(tag => `<span class="job-tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;
        jobList.innerHTML += jobCard;
    });
});