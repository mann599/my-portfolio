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

// Learn More modal functionality for Services section
window.addEventListener('DOMContentLoaded', function() {
  console.log('Learn More modal JS loaded');
  // Hide modal on load
  const modal = document.getElementById('service-modal');
  if (!modal) {
    console.warn('Modal element not found!');
    return;
  }
  modal.style.display = 'none';

  // New advanced modal content for each service
  const serviceDetails = [
    {
      icon: "<i class='bx bx-code-alt'></i>",
      subtitle: ".NET Core, Microservices, APIs",
      title: "Backend Development",
      features: [
        ".NET Core microservices architecture",
        "RESTful API design & implementation",
        "Database design: SQL Server, MySQL, PostgreSQL, MongoDB",
        "Scalable, secure, and maintainable codebase"
      ],
      description: "I specialize in building robust, scalable backend systems using modern .NET technologies and best practices. From designing microservices to optimizing database performance, I deliver solutions that power your business.",
      cta: "Let's Build Your Backend"
    },
    {
      icon: "<i class='bx bx-world'></i>",
      subtitle: "Full Stack, Responsive, Modern UI",
      title: "Web Development",
      features: [
        "Full-stack web apps with modern frameworks",
        "Responsive, mobile-first design",
        "Performance & accessibility focused",
        "Secure authentication & user flows"
      ],
      description: "I create seamless, user-friendly web applications that look great on any device. My focus is on clean code, accessibility, and delivering a delightful user experience.",
      cta: "Start Your Web Project"
    },
    {
      icon: "<i class='bx bx-credit-card'></i>",
      subtitle: "Payment Gateways, Secure Transactions",
      title: "Payment Integration",
      features: [
        "Benca Sella & major payment gateways",
        "PCI-compliant, secure payment flows",
        "Custom checkout & transaction logic",
        "Fraud prevention & error handling"
      ],
      description: "I integrate payment solutions that are secure, reliable, and user-friendly. From e-commerce to SaaS, I ensure your transactions are smooth and safe.",
      cta: "Integrate Payments"
    },
    {
      icon: "<i class='bx bx-data'></i>",
      subtitle: "Relational & NoSQL, Optimization",
      title: "Database Management",
      features: [
        "Database design & normalization",
        "Performance tuning & indexing",
        "Data migration & backup strategies",
        "Relational & NoSQL expertise"
      ],
      description: "I provide comprehensive database solutions, from schema design to performance optimization. I work with SQL Server, MySQL, PostgreSQL, and MongoDB for all your data needs.",
      cta: "Optimize Your Data"
    },
    {
      icon: "<i class='bx bx-layer'></i>",
      subtitle: "Architecture, Scalability, Best Practices",
      title: "System Architecture",
      features: [
        "Microservices & distributed systems",
        "Cloud-native & on-premise solutions",
        "Best practices for reliability",
        "Performance & cost optimization"
      ],
      description: "I design scalable, maintainable system architectures tailored to your business goals. My focus is on reliability, performance, and future-proofing your tech stack.",
      cta: "Design Your System"
    },
    {
      icon: "<i class='bx bx-support'></i>",
      subtitle: "Consulting, Code Review, Support",
      title: "Technical Support",
      features: [
        "Technical consultation & mentoring",
        "Code reviews & best practices",
        "Performance troubleshooting",
        "Ongoing support & maintenance"
      ],
      description: "I offer technical support, code reviews, and ongoing maintenance to keep your projects running smoothly. Let me help your team deliver their best work.",
      cta: "Get Expert Support"
    }
  ];

  const learnMoreButtons = document.querySelectorAll('.services_container .services_box .learn-more-btn');
  const modalIcon = document.getElementById('service-modal-icon');
  const modalSubtitle = document.getElementById('service-modal-subtitle');
  const modalTitle = document.getElementById('service-modal-title');
  const modalFeatures = document.getElementById('service-modal-features');
  const modalBody = document.getElementById('service-modal-body');
  const modalCTA = document.getElementById('service-modal-cta-btn');
  const modalClose = document.getElementById('service-modal-close');
  const modalMain = document.getElementById('service-modal-main');

  if (!learnMoreButtons.length) {
    console.warn('No Learn More buttons found!');
  }

  learnMoreButtons.forEach((btn, idx) => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const detail = serviceDetails[idx];
      modalIcon.innerHTML = detail.icon;
      modalSubtitle.textContent = detail.subtitle;
      modalTitle.textContent = detail.title;
      modalFeatures.innerHTML = '';
      detail.features.forEach(f => {
        const li = document.createElement('li');
        li.textContent = f;
        modalFeatures.appendChild(li);
      });
      modalBody.textContent = detail.description;
      modalCTA.textContent = detail.cta;
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });

  modalClose.addEventListener('click', function() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  });

  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  });

  // CTA button closes modal and scrolls to contact
  modalCTA.addEventListener('click', function(e) {
    e.preventDefault();
    modal.style.display = 'none';
    document.body.style.overflow = '';
    // Smooth scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.location.hash = '#contact';
    }
  });
}); 

// 3D tilt effect for services and portfolio cards
function add3DTiltEffect(selector) {
  document.querySelectorAll(selector).forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * 10; // max 10deg
      const rotateY = ((x - centerX) / centerX) * 10;
      card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.06)`;
      card.style.boxShadow = `0 24px 48px rgba(0,212,255,0.25), 0 1.5px 8px rgba(0,0,0,0.18)`;
      card.style.zIndex = 10;
    });
    card.addEventListener('mouseleave', function() {
      card.style.transform = '';
      card.style.boxShadow = '';
      card.style.zIndex = '';
    });
    card.addEventListener('mouseenter', function() {
      card.style.transition = 'transform 0.25s cubic-bezier(.25,.8,.25,1), box-shadow 0.25s cubic-bezier(.25,.8,.25,1)';
    });
  });
}

window.addEventListener('DOMContentLoaded', function() {
  add3DTiltEffect('.services_box');
  add3DTiltEffect('.portfolio-box');

  // About Read More modal logic (moved inside DOMContentLoaded)
  const aboutReadMoreBtn = document.getElementById('about-read-more-btn');
  const aboutModal = document.getElementById('about-modal');
  const aboutModalClose = document.getElementById('about-modal-close');
  const aboutModalIcon = document.getElementById('about-modal-icon');
  const aboutModalSubtitle = document.getElementById('about-modal-subtitle');
  const aboutModalTitle = document.getElementById('about-modal-title');
  const aboutModalFeatures = document.getElementById('about-modal-features');
  const aboutModalBody = document.getElementById('about-modal-body');

  if (aboutReadMoreBtn) {
    aboutReadMoreBtn.addEventListener('click', function(e) {
      e.preventDefault();
      aboutModalIcon.innerHTML = "<i class='bx bx-user'></i>";
      aboutModalSubtitle.textContent = "About Me";
      aboutModalTitle.textContent = "More About Prajapati Mann";
      aboutModalFeatures.innerHTML = '';
      [
        "2.5+ years of IT industry experience",
        "Expert in .NET Core, Microservices, and API Development",
        "Skilled in SQL Server, MySQL, PostgreSQL, MongoDB",
        "Payment gateway & travel domain project expertise",
        "Passionate about scalable, high-quality solutions"
      ].forEach(f => {
        const li = document.createElement('li');
        li.textContent = f;
        aboutModalFeatures.appendChild(li);
      });
      aboutModalBody.innerHTML = `
        <p>I am a dedicated and passionate software developer with a strong background in building robust, scalable applications. My journey in IT has equipped me with hands-on experience in .NET microservices, database management, and payment gateway integration.</p>
        <p>I have successfully delivered complex projects in the travel domain, including train, hotel, and flight booking systems, as well as expense management and secure payment solutions. My focus is on writing clean, maintainable code and delivering high-quality results for clients and teams.</p>
        <p>Beyond coding, I enjoy collaborating with cross-functional teams, mentoring junior developers, and staying up-to-date with the latest technology trends. I am always eager to take on new challenges and help businesses grow through technology.</p>
      `;
      aboutModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  }
  if (aboutModalClose) {
    aboutModalClose.addEventListener('click', function() {
      aboutModal.style.display = 'none';
      document.body.style.overflow = '';
    });
  }
  if (aboutModal) {
    aboutModal.addEventListener('click', function(e) {
      if (e.target === aboutModal) {
        aboutModal.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
  }
}); 