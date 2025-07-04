document.addEventListener('DOMContentLoaded', function() {
    // Hide loader when page is loaded
    window.addEventListener('load', function() {
        document.querySelector('.loader').classList.add('hidden');
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav ul li a');

    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
        this.querySelector('i').classList.toggle('fa-bars');
        
        // Update aria-expanded attribute
        const isExpanded = nav.classList.contains('active');
        this.setAttribute('aria-expanded', isExpanded);
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            menuToggle.querySelector('i').classList.remove('fa-times');
            menuToggle.querySelector('i').classList.add('fa-bars');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Dark mode toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');

    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.setAttribute('aria-pressed', 'true');
    }

    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            this.setAttribute('aria-pressed', 'false');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            this.setAttribute('aria-pressed', 'true');
        }
    });

    // Certificate Modal
    const certificateModal = document.querySelector('.certificate-modal');
    const certificateImages = {
        python: "IOT foundation_page-0001.jpg",
        web: "HTML & CSS_page-0001.jpg",
        iot: "IOT foundation_page-0001.jpg",
        c: ".images/.c.jpg"
    };

    // Open certificate modal when clicking on a certificate image or view button
    document.querySelectorAll('.certificate-img, .view-certificate-btn').forEach(element => {
        element.addEventListener('click', function() {
            const certificateType = this.dataset.certificate;
            const certificateContent = document.getElementById('certificate-full-image');
            const certificatePath = certificateImages[certificateType];
            
            // Check if it's a PDF file
            if (certificatePath.endsWith('.pdf')) {
                certificateContent.innerHTML = `
                    <iframe src="${certificatePath}" 
                            width="100%" 
                            height="100%" 
                            style="border: none;"
                            allowfullscreen></iframe>
                `;
            } else {
                certificateContent.src = certificatePath;
            }
            certificateModal.style.display = 'flex';
        });
    });

    // Close modal
    document.querySelector('.close-certificate-modal').addEventListener('click', function() {
        certificateModal.style.display = 'none';
    });

    // Close when clicking outside
    certificateModal.addEventListener('click', function(e) {
        if (e.target === certificateModal) {
            certificateModal.style.display = 'none';
        }
    });

    // Form submission with validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            const submitBtn = this.querySelector('button[type="submit"]');
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields');
                return;
            }
            
            if (!validateEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            try {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
                
                // Here you would typically send the form data to a server
                console.log('Form submitted:', { name, email, message });
                
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Show success message
                alert('Thank you for your message! I will get back to you soon.');
                this.reset();
            } catch (error) {
                console.error('Error:', error);
                alert('There was a problem sending your message. Please try again later.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            }
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Set last updated date
    const lastUpdated = new Date();
    document.getElementById('last-updated-date').textContent = lastUpdated.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementPosition < windowHeight - elementVisible) {
                element.classList.add('animated');
            }
        });
    };

    // Reading progress indicator
    const updateProgressBar = function() {
        const scrollTop = window.scrollY;
        const docHeight = document.body.offsetHeight;
        const winHeight = window.innerHeight;
        const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
        document.getElementById('reading-progress').style.width = scrollPercent + '%';
    };

    // Back to top button
    const backToTopButton = document.getElementById('back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
        updateProgressBar();
        animateOnScroll();
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Project filtering
    document.querySelectorAll('.projects-filter button').forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            document.querySelectorAll('.projects-filter button').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            const projects = document.querySelectorAll('.project-card, .featured-project');
            
            projects.forEach(project => {
                if (filter === 'all') {
                    project.style.display = 'block';
                } else {
                    const tags = project.querySelectorAll('.project-tag');
                    let hasTag = false;
                    tags.forEach(tag => {
                        if (tag.textContent.toLowerCase().includes(filter)) {
                            hasTag = true;
                        }
                    });
                    project.style.display = hasTag ? 'block' : 'none';
                }
            });
        });
    });

    // Project modal
    const projectCards = document.querySelectorAll('.project-card, .featured-project');
    const modal = document.getElementById('project-modal');
    
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const image = this.querySelector('img').src;
            const title = this.querySelector('h3').textContent;
            const description = this.querySelector('p').textContent;
            const tags = this.querySelector('.project-tags').innerHTML;
            
            document.getElementById('modal-image').src = image;
            document.getElementById('modal-title').textContent = title;
            document.getElementById('modal-description').textContent = description;
            document.getElementById('modal-tags').innerHTML = tags;
            
            modal.style.display = 'flex';
        });
    });
    
    document.querySelector('.close-modal').addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('ServiceWorker registration successful');
                })
                .catch(err => {
                    console.log('ServiceWorker registration failed: ', err);
                });
        });
    }
});