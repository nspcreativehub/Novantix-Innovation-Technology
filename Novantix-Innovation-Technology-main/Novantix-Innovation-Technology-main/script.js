// ==========================================
// TYPING ANIMATION FOR HERO TITLE
// ==========================================
const typingText = document.getElementById('typingText');
if (typingText) {
    const texts = [
        'Empowering Students with Real-World Skills',
        'Building Industry-Grade Projects',
        'Get Job-Ready with Expert Training',
        'Transform Your Career with Novantix'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before next text
        }

        setTimeout(type, typeSpeed);
    }

    // Start typing animation
    type();
}

// ==========================================
// NAVBAR FUNCTIONALITY
// ==========================================
const navbar = document.getElementById('navbar');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Animate hamburger icon
    const spans = mobileMenuToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ==========================================
// SMOOTH SCROLL
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');

            // Add staggered animation for cards
            const cards = entry.target.querySelectorAll('.course-card, .project-feature, .placement-card, .review-card, .cert-feature');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.animation = 'fadeInUp 0.6s ease forwards';
                    card.style.opacity = '0';
                    card.style.animationDelay = `${index * 0.1}s`;
                }, 100);
            });
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// ==========================================
// HERO STATS COUNTER ANIMATION
// ==========================================
function animateHeroStats() {
    const statValues = document.querySelectorAll('.hero-stats .stat-value');

    statValues.forEach(statValue => {
        const target = parseInt(statValue.getAttribute('data-target'));
        const suffix = statValue.getAttribute('data-suffix') || '';
        const duration = 1500; // 1.5 seconds
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(target * easeOutQuart);

            statValue.textContent = current + suffix;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                statValue.textContent = target + suffix;
            }
        }

        requestAnimationFrame(updateCounter);
    });
}

// Run counter animation on page load
document.addEventListener('DOMContentLoaded', () => {
    // Small delay for better visual effect
    setTimeout(animateHeroStats, 500);
});

// ==========================================
// CARD HOVER EFFECTS
// ==========================================
const cards = document.querySelectorAll('.course-card, .review-card, .placement-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});

// ==========================================
// PARALLAX EFFECT FOR HERO
// ==========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ==========================================
// DYNAMIC YEAR IN FOOTER
// ==========================================
const yearElement = document.querySelector('.footer-bottom p');
if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.innerHTML = yearElement.innerHTML.replace('2026', currentYear);
}

// ==========================================
// PRELOADER (OPTIONAL)
// ==========================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ==========================================
// ACTIVE NAV LINK HIGHLIGHTING
// ==========================================
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==========================================
// SCROLL TO TOP BUTTON (OPTIONAL)
// ==========================================
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.3s ease;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 999;
    `;

    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
        } else {
            button.style.opacity = '0';
        }
    });

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
    });
}

createScrollToTopButton();

// ==========================================
// ENROLLMENT FORM FUNCTIONALITY
// ==========================================
const ENROLLMENT_API_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE'; // Replace with your Google Apps Script URL

const enrollBtn = document.getElementById('enrollBtn');
const enrollModal = document.getElementById('enrollModal');
const closeModal = document.getElementById('closeModal');
const enrollmentForm = document.getElementById('enrollmentForm');
const formMessage = document.getElementById('formMessage');
const submitBtn = document.getElementById('submitBtn');

// Open modal
if (enrollBtn) {
    enrollBtn.addEventListener('click', () => {
        enrollModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

// CTA Enroll button (footer) - also opens modal
const enrollBtnCta = document.getElementById('enrollBtnCta');
if (enrollBtnCta && enrollModal) {
    enrollBtnCta.addEventListener('click', () => {
        enrollModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

// Close modal
if (closeModal) {
    closeModal.addEventListener('click', closeEnrollModal);
}

// Close on outside click
if (enrollModal) {
    enrollModal.addEventListener('click', (e) => {
        if (e.target === enrollModal) {
            closeEnrollModal();
        }
    });
}

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && enrollModal && enrollModal.classList.contains('active')) {
        closeEnrollModal();
    }
});

function closeEnrollModal() {
    if (enrollModal) {
        enrollModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Handle form submission
if (enrollmentForm) {
    enrollmentForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('studentName').value.trim(),
            email: document.getElementById('studentEmail').value.trim(),
            mobile: document.getElementById('studentMobile').value.trim(),
            course: document.getElementById('studentCourse').value
        };

        // Validate
        if (!formData.name || !formData.email || !formData.mobile || !formData.course) {
            showMessage('Please fill in all fields', 'error');
            return;
        }

        // Check if API URL is configured
        if (ENROLLMENT_API_URL === 'YOUR_GOOGLE_SCRIPT_URL_HERE') {
            showMessage('⚠️ Enrollment system not configured yet. Please contact admin.', 'error');
            console.error('Please update ENROLLMENT_API_URL in script.js with your Google Apps Script URL');
            return;
        }

        // Show loading state
        setLoading(true);
        hideMessage();

        try {
            // Submit to Google Apps Script
            const response = await fetch(ENROLLMENT_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain',
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (result.success) {
                showMessage('✅ Enrollment submitted successfully! We will contact you soon.', 'success');
                enrollmentForm.reset();

                // Close modal after 2 seconds
                setTimeout(() => {
                    closeEnrollModal();
                    hideMessage();
                }, 2000);
            } else {
                showMessage('❌ ' + (result.message || 'Submission failed. Please try again.'), 'error');
            }
        } catch (error) {
            console.error('Enrollment error:', error);
            showMessage('❌ Network error. Please check your connection and try again.', 'error');
        } finally {
            setLoading(false);
        }
    });
}

function showMessage(message, type) {
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
    }
}

function hideMessage() {
    if (formMessage) {
        formMessage.className = 'form-message';
    }
}

function setLoading(loading) {
    if (!submitBtn) return;

    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');

    if (loading) {
        if (btnText) btnText.style.display = 'none';
        if (btnLoader) btnLoader.style.display = 'inline';
        submitBtn.disabled = true;
    } else {
        if (btnText) btnText.style.display = 'inline';
        if (btnLoader) btnLoader.style.display = 'none';
        submitBtn.disabled = false;
    }
}

// ==========================================
// FEEDBACK FLIP CARD FUNCTIONALITY
// ==========================================
const feedbackFlipCard = document.getElementById('feedbackFlipCard');
const flipToFormBtn = document.getElementById('flipToFormBtn');
const flipBackBtn = document.getElementById('flipBackBtn');

// Flip to form
if (flipToFormBtn && feedbackFlipCard) {
    flipToFormBtn.addEventListener('click', () => {
        feedbackFlipCard.classList.add('flipped');
    });
}

// Flip back to front
if (flipBackBtn && feedbackFlipCard) {
    flipBackBtn.addEventListener('click', () => {
        feedbackFlipCard.classList.remove('flipped');
    });
}

// Handle feedback form submission
const feedbackForm = document.getElementById('feedbackForm');
const feedbackMessage = document.getElementById('feedbackMessage');

if (feedbackForm) {
    feedbackForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('feedbackName').value.trim(),
            certificateId: document.getElementById('feedbackCertId').value.trim(),
            college: document.getElementById('feedbackCollege').value.trim(),
            course: document.getElementById('feedbackCourse').value,
            feedback: document.getElementById('feedbackText').value.trim()
        };

        // Validate
        if (!formData.name || !formData.certificateId || !formData.college || !formData.course || !formData.feedback) {
            showFeedbackMessage('Please fill in all fields', 'error');
            return;
        }

        // Show success (you can replace with actual API call)
        showFeedbackMessage('✅ Thank you for your feedback! We appreciate your review.', 'success');
        feedbackForm.reset();

        // Flip back after 2 seconds
        setTimeout(() => {
            feedbackFlipCard.classList.remove('flipped');
            hideFeedbackMessage();
        }, 2500);
    });
}

function showFeedbackMessage(message, type) {
    if (feedbackMessage) {
        feedbackMessage.textContent = message;
        feedbackMessage.className = `form-message ${type}`;
        feedbackMessage.style.display = 'block';
    }
}

function hideFeedbackMessage() {
    if (feedbackMessage) {
        feedbackMessage.style.display = 'none';
    }
}

console.log('Novantix Innovation Technology - Landing Page Loaded Successfully! 🚀');
