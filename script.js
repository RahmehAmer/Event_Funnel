// Countdown timer function
function startCountdown() {
    // Set the date we're counting down to (January 20, 2026)
    const countDownDate = new Date("January 20, 2026 17:00:00").getTime();

    // Update the count down every 1 second
    const countdownFunction = setInterval(function() {
        // Get today's date and time
        const now = new Date().getTime();

        // Find the distance between now and the count down date
        const distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the elements
        const dayElements = document.querySelectorAll('.counter-number');
        const hourElements = document.querySelectorAll('.counter-number');
        const minuteElements = document.querySelectorAll('.counter-number');
        const secondElements = document.querySelectorAll('.counter-number');

        if (dayElements.length >= 1) dayElements[0].innerHTML = days;
        if (hourElements.length >= 2) hourElements[1].innerHTML = hours;
        if (minuteElements.length >= 3) minuteElements[2].innerHTML = minutes;
        if (secondElements.length >= 4) secondElements[3].innerHTML = seconds;

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(countdownFunction);
            document.querySelector('.counter-section').innerHTML = "<p style='text-align: center; font-size: 1.5rem; color: #333;'>Workshop has started!</p>";
        }
    }, 1000);
}

// Page navigation system
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on the details page and start countdown automatically
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    if (currentPath === 'middleFirst.html') {
        startCountdown();
    }

    // Function to navigate between pages
    window.navigateToPage = function(pageId, sectionId = null) {
        // Map page IDs to their respective HTML files
        const pageMap = {
            'awareness': 'index.html',
            'details': 'middleFirst.html',
            'faq': 'middleSecond.html',
            'registration': 'bottom.html',
            'confirmation': 'confirmation.html'
        };

        // Check if we need to navigate to a different HTML file
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';

        if (pageMap[pageId] && pageMap[pageId] !== currentPage) {
            // Navigate to different HTML file
            const url = sectionId ? `${pageMap[pageId]}#${sectionId}` : pageMap[pageId];
            window.location.href = url;
        } else {
            // Navigate within same HTML file (fallback for single-page navigation)
            // Hide all pages
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });

            // Show target page
            const targetPage = document.getElementById(pageId);
            if (targetPage) {
                targetPage.classList.add('active');

                // Start countdown if navigating to details page
                if (pageId === 'details') {
                    startCountdown();
                }

                // Scroll to section if specified
                if (sectionId) {
                    setTimeout(() => {
                        const section = document.getElementById(sectionId);
                        if (section) {
                            section.scrollIntoView({ behavior: 'smooth' });
                        }
                    }, 100);
                }
            }

            // Smooth scroll to top if no section specified
            if (!sectionId) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }

        console.log('Navigate to:', pageId, sectionId ? `section: ${sectionId}` : '');
    };

    // FAQ toggle function
    window.toggleFAQ = function(button) {
        const card = button.closest('.faq-card');
        const isActive = card.classList.contains('active');

        // Close all FAQ cards
        document.querySelectorAll('.faq-card').forEach(c => {
            c.classList.remove('active');
        });

        // Open clicked card if it wasn't already active
        if (!isActive) {
            card.classList.add('active');
        }
    };

    // Registration form handler
    window.handleRegistration = function(event) {
        event.preventDefault();

        const button = document.getElementById('registerBtn');
        const buttonText = button.querySelector('.button-text');
        const spinner = button.querySelector('.loading-spinner');

        // Show loading state
        button.classList.add('loading');
        buttonText.style.opacity = '0';
        spinner.style.display = 'flex';

        // Get form data
        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            status: document.getElementById('status').value
        };

        // Basic validation
        if (!formData.fullName || !formData.email || !formData.status) {
            // Hide loading state
            button.classList.remove('loading');
            buttonText.style.opacity = '1';
            spinner.style.display = 'none';

            alert('Please fill in all required fields.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            // Hide loading state
            button.classList.remove('loading');
            buttonText.style.opacity = '1';
            spinner.style.display = 'none';

            alert('Please enter a valid email address.');
            return;
        }

        // Simulate processing delay
        setTimeout(() => {
            console.log('Registration data:', formData);

            // Navigate to confirmation page
            navigateToPage('confirmation');
        }, 2000); // 2 second delay to show loading effect
    };

    // Confirmation page functions
    window.shareWorkshop = function() {
        const shareUrl = window.location.origin + '/index.html';
        const shareText = 'Check out this amazing Personal Branding Workshop! Build Your Personal Brand from ZERO in 5 Hours. ' + shareUrl;

        if (navigator.share) {
            navigator.share({
                title: 'Personal Branding Workshop',
                text: shareText,
                url: shareUrl
            });
        } else {
            // Fallback for browsers that don't support Web Share API
            navigator.clipboard.writeText(shareText).then(() => {
                alert('Workshop link copied to clipboard! Share it with your friends.');
            }).catch(() => {
                alert('Share this workshop: ' + shareText);
            });
        }
    };

    window.checkEmail = function() {
        alert('Please check your email for the workshop confirmation and Zoom link. If you don\'t see it in your inbox, please check your spam folder.');
    };

    window.keepUpdated = function() {
        alert('Thank you! You\'ll now receive updates about upcoming workshops and personal branding tips.');
    };
});
