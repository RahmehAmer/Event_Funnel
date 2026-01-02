// Page navigation system
document.addEventListener('DOMContentLoaded', () => {
    // Function to navigate between pages
    window.navigateToPage = function(pageId) {
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
        }

        // Smooth scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        console.log('Navigate to:', pageId);
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

        // Get form data
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            experience: document.getElementById('experience').value,
            goals: document.getElementById('goals').value,
            terms: document.getElementById('terms').checked
        };

        // Basic validation
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.goals || !formData.terms) {
            alert('Please fill in all required fields and agree to the terms.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Simulate successful registration
        console.log('Registration data:', formData);

        // Navigate to confirmation page
        navigateToPage('confirmation');
    };

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
});
