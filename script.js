document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for all internal navigation links
    document.querySelectorAll('a.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default anchor click behavior
            const targetId = this.getAttribute('href'); // Get the target section ID
            const targetElement = document.querySelector(targetId); // Select the target element
            if (targetElement) {
                // Scroll smoothly to the target element
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Highlight active navigation link based on scroll position
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section');

    const highlightNavLink = () => {
        let currentSection = '';
        // Get the header element to account for its height in scroll calculations
        const header = document.querySelector('header');
        // Calculate offset to activate link slightly before section reaches top
        const headerOffset = header ? header.offsetHeight + 20 : 0;

        // Determine which section is currently in view
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerOffset;
            const sectionHeight = section.clientHeight;
            // If current scroll position is within the section's bounds
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        // Apply/remove highlight classes to navigation links
        navLinks.forEach(link => {
            link.classList.remove('text-blue-600', 'font-bold', 'bg-blue-100'); // Remove active styles
            link.classList.add('text-gray-700'); // Add default styles
            // If the link's data-section matches the current active section
            if (link.dataset.section === currentSection) {
                link.classList.add('text-blue-600', 'font-bold', 'bg-blue-100'); // Add active styles
                link.classList.remove('text-gray-700'); // Remove default styles
            }
        });
    };

    // Call highlight function on initial load and on scroll events
    highlightNavLink();
    window.addEventListener('scroll', highlightNavLink);

    // "How it works", "Services", "Deep Dive" interactive cards and content toggling
    const learnMoreButtons = document.querySelectorAll('.learn-more-btn');

    learnMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.dataset.target; // Get the ID of the content page to show
            // Hide all dynamic content pages
            document.querySelectorAll('#dynamic-content > div').forEach(page => {
                // Ensure only the specific content pages are hidden, not the interactive cards themselves
                if (page.id === 'how-it-works-page' || page.id === 'services-page' || page.id === 'deep-dive-page') {
                    page.classList.add('hidden');
                }
            });

            // Show the target content page
            document.getElementById(targetId).classList.remove('hidden');

            // Hide the initial interactive cards
            document.querySelectorAll('.interactive-card').forEach(card => {
                card.classList.add('hidden');
            });
        });
    });

    // Back button functionality for dynamic content pages
    document.querySelectorAll('.back-to-dynamic-content').forEach(button => {
        button.addEventListener('click', function() {
            // Hide all dynamic content pages again
            document.querySelectorAll('#dynamic-content > div').forEach(page => {
                if (page.id === 'how-it-works-page' || page.id === 'services-page' || page.id === 'deep-dive-page') {
                    page.classList.add('hidden');
                }
            });
            // Show the initial interactive cards again
            document.querySelectorAll('.interactive-card').forEach(card => {
                card.classList.remove('hidden');
            });
        });
    });

    // Testimonial Carousel: Arrow-only navigation
    const carousel = document.getElementById('testimonial-carousel');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');

    // Function to scroll the carousel by one item (responsive to item width)
    const scrollCarouselByItem = (direction) => {
        // Calculate the width of a single testimonial item including its horizontal margins
        // getComputedStyle is used to get the actual rendered margin values
        const item = carousel.querySelector('.carousel-item');
        if (!item) return; // Exit if no items are found
        const itemWidth = item.offsetWidth +
                          parseInt(getComputedStyle(item).marginLeft) +
                          parseInt(getComputedStyle(item).marginRight);

        // Scroll the carousel by the calculated item width in the specified direction
        carousel.scrollBy({
            left: direction * itemWidth,
            behavior: 'smooth' // Smooth scrolling animation
        });
    };

    // Event listeners for previous and next buttons
    prevBtn.addEventListener('click', () => scrollCarouselByItem(-1)); // Scroll left
    nextBtn.addEventListener('click', () => scrollCarouselByItem(1)); // Scroll right

    // Explore button functionality for the "Explore & Learn" section
    const exploreButton = document.getElementById('explore-button');
    const exploreContent = document.getElementById('explore-content');

    exploreButton.addEventListener('click', () => {
        exploreContent.classList.toggle('hidden'); // Toggle visibility of the content
        // Change button text based on content visibility
        if (!exploreContent.classList.contains('hidden')) {
            exploreButton.textContent = 'Hide Details';
        } else {
            exploreButton.textContent = 'Start Exploring Now!';
        }
    });

    // FAQ / Accordion interactivity for "Need Help?" section
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const faqItem = button.closest('.faq-item'); // Get the parent FAQ item
            const answer = faqItem.querySelector('.faq-answer'); // Get the answer content
            const icon = button.querySelector('i'); // Get the plus/minus icon

            // Toggle 'open' class on the parent item to control styling and state
            faqItem.classList.toggle('open');

            if (faqItem.classList.contains('open')) {
                // If opening: set max-height to scrollHeight for smooth animation
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.padding = '1rem'; // Add padding
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
                button.setAttribute('aria-expanded', 'true'); // Update ARIA attribute for accessibility
            } else {
                // If closing: set max-height to 0 and remove padding
                answer.style.maxHeight = '0';
                answer.style.padding = '0';
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
                button.setAttribute('aria-expanded', 'false'); // Update ARIA attribute
            }

            // Optional: Close other open FAQ items to ensure only one is open at a time
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem && item.classList.contains('open')) {
                    const otherAnswer = item.querySelector('.faq-answer');
                    const otherIcon = item.querySelector('i');
                    item.classList.remove('open');
                    otherAnswer.style.maxHeight = '0';
                    otherAnswer.style.padding = '0';
                    otherIcon.classList.remove('fa-minus');
                    otherIcon.classList.add('fa-plus');
                    item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                }
            });
        });
    });

    // Contact form submission handler (placeholder for backend integration)
    document.querySelector('#contact form').addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
        console.log('Contact form submitted!'); // Log to console for debugging

        // Retrieve form data (for demonstration purposes)
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const message = document.getElementById('message').value;

        // Display a simple success message to the user on the page
        const form = this;
        const successMessage = document.createElement('p');
        successMessage.textContent = 'Thank you for your message, ' + name + '! We will get back to you soon.';
        successMessage.classList.add('text-green-600', 'font-semibold', 'mt-4', 'text-center');
        form.parentNode.insertBefore(successMessage, form.nextSibling); // Insert message after the form

        // Clear the form fields
        form.reset();

        // Remove the success message after a few seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    });
});
