document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('a.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); 
            const targetId = this.getAttribute('href'); 
            const targetElement = document.querySelector(targetId); 
            if (targetElement) {

                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
 const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section');

    const highlightNavLink = () => {
        let currentSection = '';

        const header = document.querySelector('header');
        
        const headerOffset = header ? header.offsetHeight + 20 : 0;

        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerOffset;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        
        navLinks.forEach(link => {
            link.classList.remove('text-blue-600', 'font-bold', 'bg-blue-100'); 
            link.classList.add('text-gray-700'); 
            if (link.dataset.section === currentSection) {
                link.classList.add('text-blue-600', 'font-bold', 'bg-blue-100'); 
            }
        });
    };

    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink(); 

    
    document.querySelectorAll('.learn-more-btn').forEach(button => {
        button.addEventListener('click', function() {
            const targetPageId = this.dataset.target;
            document.querySelectorAll('#dynamic-content > div').forEach(div => {
                if (div.id !== targetPageId) {
                    div.classList.add('hidden');
                }
            });
            document.getElementById(targetPageId).classList.remove('hidden');
        });
    });

    document.querySelectorAll('.back-to-dynamic-content').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('#dynamic-content > div').forEach(div => {
                if (div.id !== 'services-page' && div.id !== 'deep-dive-page') {
                    div.classList.remove('hidden');
                } else {
                    div.classList.add('hidden');
                }
            });
        });
    });

    
    const carousel = document.getElementById('testimonial-carousel');
    const prevButton = document.getElementById('prev-testimonial');
    const nextButton = document.getElementById('next-testimonial');
    let currentIndex = 0;

    const itemsPerView = window.innerWidth >= 768 ? 2 : 1; 
    const totalItems = carousel.children.length;

    const updateCarousel = () => {
        const itemWidth = carousel.children[0].offsetWidth + (window.innerWidth >= 768 ? 16 : 0); // Include gap
        carousel.scrollTo({
            left: currentIndex * itemWidth,
            behavior: 'smooth'
        });
    };

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalItems - itemsPerView;
        updateCarousel();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex < totalItems - itemsPerView) ? currentIndex + 1 : 0;
        updateCarousel();
    });

    window.addEventListener('resize', () => {
        itemsPerView = window.innerWidth >= 768 ? 2 : 1;
        updateCarousel();
    });

    
    let isDragging = false;
    let startPos = 0;
    let scrollLeft = 0;

    carousel.addEventListener('mousedown', (e) => {
        isDragging = true;
        carousel.classList.add('dragging');
        startPos = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => {
        isDragging = false;
        carousel.classList.remove('dragging');
    });

    carousel.addEventListener('mouseup', () => {
        isDragging = false;
        carousel.classList.remove('dragging');
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startPos) * 2; 
        carousel.scrollLeft = scrollLeft - walk;
    });

    
    document.querySelector('#home-cta').addEventListener('click', function(e) {
        e.preventDefault();
        const howItWorksSection = document.getElementById('how-it-works');
        if (howItWorksSection) {
            howItWorksSection.scrollIntoView({ behavior: 'smooth' });
        }
    });


    
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const faqItem = button.closest('.faq-item');
            const faqAnswer = faqItem.querySelector('.faq-answer');
            const icon = button.querySelector('i');

            if (faqItem.classList.contains('open')) {
                faqItem.classList.remove('open');
                faqAnswer.style.maxHeight = '0';
                faqAnswer.style.padding = '0';
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
                button.setAttribute('aria-expanded', 'false');
            } else {
                // Close all other open FAQs
                document.querySelectorAll('.faq-item.open').forEach(openFaqItem => {
                    const openFaqAnswer = openFaqItem.querySelector('.faq-answer');
                    const openFaqIcon = openFaqItem.querySelector('.faq-question i');
                    openFaqItem.classList.remove('open');
                    openFaqAnswer.style.maxHeight = '0';
                    openFaqAnswer.style.padding = '0';
                    openFaqIcon.classList.remove('fa-minus');
                    openFaqIcon.classList.add('fa-plus');
                    openFaqItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                });

                // Open the clicked FAQ
                faqItem.classList.add('open');
                faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
                faqAnswer.style.padding = '1rem'; 
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
                button.setAttribute('aria-expanded', 'true');
            }
        });
    });

    
    document.querySelector('#contact form').addEventListener('submit', function(e) {
        e.preventDefault(); 
        console.log('Contact form submitted!'); 

       
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value; 
        const message = document.getElementById('message').value;

        
        const form = this;
        const successMessage = document.createElement('p');
        successMessage.textContent = 'Thank you for your message, ' + name + '! We will get back to you soon.';
        successMessage.classList.add('text-green-600', 'font-semibold', 'mt-4', 'text-center');
        form.parentNode.insertBefore(successMessage, form.nextSibling); 

        
        form.reset();

        
        setTimeout(() => {
            successMessage.remove();
        }, 5000); 
    });

});