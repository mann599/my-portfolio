// Typing Animation
const typed = new Typed('.multiple-text', {
    strings: ['Full Stack Developer', '.NET Developer', 'Backend Developer', 'API Developer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

// Scroll Reveal
ScrollReveal({
    reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services_container, .portfolio-container, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

// Sticky Header
let header = document.querySelector('.header');
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Remove menu icon and navbar when clicking on a link
document.querySelectorAll('header nav a').forEach(link => {
    link.onclick = () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    };
});

// Sticky header on scroll
window.onscroll = () => {
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('header nav a');

    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    // Add sticky class to header
    header.classList.toggle('sticky', window.scrollY > 100);
};

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission handling
function handleFormSubmit() {
    const form = document.querySelector('.contact form');
    
    // Get form data
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const subject = form.querySelector('input[placeholder="Email Subject"]').value;
    const message = form.querySelector('textarea').value;
    
    // Basic validation
    if (!name || !email || !subject || !message) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Simulate form submission
    alert('Thank you for your message! I will get back to you soon.');
    form.reset();
}

document.querySelector('.contact form').addEventListener('submit', function(e) {
    e.preventDefault();
    handleFormSubmit();
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Add hover effects for portfolio items
document.querySelectorAll('.portfolio-box').forEach(box => {
    box.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    box.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Add skill tags animation
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.1}s`;
    tag.classList.add('fade-in');
});

// Add CSS for fade-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .fade-in {
        animation: fadeIn 0.6s ease-out forwards;
    }
    
    body {
        opacity: 0;
        transition: opacity 0.5s ease-in;
    }
    
    .portfolio-box {
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(style);

// Add scroll to top functionality
const scrollToTopBtn = document.querySelector('.footer-icontop a');
scrollToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.pointerEvents = 'auto';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.pointerEvents = 'none';
    }
});

// Initialize scroll to top button state
scrollToTopBtn.style.opacity = '0';
scrollToTopBtn.style.pointerEvents = 'none';
scrollToTopBtn.style.transition = 'opacity 0.3s ease'; 

// Download CV function
function downloadCV() {
    // Show loading message
    const originalText = event.target.textContent;
    event.target.textContent = 'Downloading...';
    event.target.disabled = true;
    
    // Method 1: Try fetch with blob
    fetch('assets/MannResume.pdf')
        .then(response => {
            if (!response.ok) {
                throw new Error('File not accessible');
            }
            return response.blob();
        })
        .then(blob => {
            // Create blob URL
            const url = window.URL.createObjectURL(blob);
            
            // Create download link
            const link = document.createElement('a');
            link.href = url;
            link.download = 'Prajapati_Mann_Resume.pdf';
            link.style.display = 'none';
            
            // Trigger download
            document.body.appendChild(link);
            link.click();
            
            // Cleanup
            setTimeout(() => {
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            }, 100);
            
            // Reset button
            event.target.textContent = originalText;
            event.target.disabled = false;
            
            alert('✅ Resume downloaded successfully! Check your Downloads folder.');
        })
        .catch(error => {
            console.error('Download failed:', error);
            
            // Method 2: Fallback - direct link
            const link = document.createElement('a');
            link.href = 'assets/MannResume.pdf';
            link.download = 'Prajapati_Mann_Resume.pdf';
            link.style.display = 'none';
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Reset button
            event.target.textContent = originalText;
            event.target.disabled = false;
            
            // Check if we're running locally
            if (window.location.protocol === 'file:') {
                alert('⚠️ Local file detected. Please:\n1. Use a local server (http://localhost:8000)\n2. Or right-click "View Resume" and select "Save as..."');
            } else {
                alert('📄 Download initiated. If it opens in a new tab, please right-click and select "Save as..."');
            }
        });
}

// Add hover effects for portfolio placeholders
document.querySelectorAll('.portfolio-placeholder').forEach(placeholder => {
    placeholder.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.boxShadow = '0 10px 30px rgba(0, 212, 255, 0.3)';
    });
    
    placeholder.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = 'none';
    });
}); 