// Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Sticky navbar on scroll
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Close mobile menu when clicking a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Here you would typically send the data to a server
            // For this prototype, we'll just show an alert
            alert(`Thank you for your message, ${name}! We'll get back to you soon.`);
            contactForm.reset();
        });
    }

    // Scroll animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.slide-up');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('show');
            }
        });
    };
    
    // Run on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // Events page functionality
    if (document.querySelector('.book-ticket')) {
        // Ticket booking modal
        const modal = document.getElementById('bookingModal');
        const bookButtons = document.querySelectorAll('.book-ticket');
        const closeModal = document.querySelector('.close-modal');
        const eventTitle = document.getElementById('eventTitle');
        const bookingForm = document.getElementById('bookingForm');
        
        // Open modal
        bookButtons.forEach(button => {
            button.addEventListener('click', function() {
                const eventName = this.getAttribute('data-event');
                eventTitle.textContent = eventName;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Close modal
        closeModal.addEventListener('click', function() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close modal with ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Booking form submission
        if (bookingForm) {
            bookingForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form values
                const fullName = document.getElementById('fullName').value;
                const email = document.getElementById('email').value;
                const phone = document.getElementById('phone').value;
                const location = document.getElementById('location').value;
                const attendees = document.getElementById('attendees').value;
                
                // Simple validation
                if (!fullName || !email || !phone || !location) {
                    alert('Please fill in all required fields');
                    return;
                }
                
                // Show success message
                const originalButtonText = bookingForm.querySelector('button[type="submit"]').textContent;
                bookingForm.querySelector('button[type="submit"]').textContent = 'Booking Confirmed!';
                
                // Reset form after delay
                setTimeout(function() {
                    bookingForm.reset();
                    bookingForm.querySelector('button[type="submit"]').textContent = originalButtonText;
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                    
                    // Show thank you alert
                    alert(`Thank you, ${fullName}! Your booking for ${attendees} attendee(s) to "${eventTitle.textContent}" has been confirmed. We'll send details to ${email}.`);
                }, 2000);
            });
        }
    }
});