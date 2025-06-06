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
                link.classList.remove('text-gray-700'); 
            }
        });
    };

    
    highlightNavLink();
    window.addEventListener('scroll', highlightNavLink);

    
    const learnMoreButtons = document.querySelectorAll('.learn-more-btn');

    learnMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.dataset.target; 
           
            document.querySelectorAll('#dynamic-content > div').forEach(page => {
                
                if (page.id === 'how-it-works-page' || page.id === 'services-page' || page.id === 'deep-dive-page') {
                    page.classList.add('hidden');
                }
            });

            
            document.getElementById(targetId).classList.remove('hidden');

            
            document.querySelectorAll('.interactive-card').forEach(card => {
                card.classList.add('hidden');
            });
        });
    });

    s
    document.querySelectorAll('.back-to-dynamic-content').forEach(button => {
        button.addEventListener('click', function() {
            
            document.querySelectorAll('#dynamic-content > div').forEach(page => {
                if (page.id === 'how-it-works-page' || page.id === 'services-page' || page.id === 'deep-dive-page') {
                    page.classList.add('hidden');
                }
            });
           
            document.querySelectorAll('.interactive-card').forEach(card => {
                card.classList.remove('hidden');
            });
        });
    });

    
    const carousel = document.getElementById('testimonial-carousel');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');

    
    const scrollCarouselByItem = (direction) => {
     
        const item = carousel.querySelector('.carousel-item');
        if (!item) return; 
        const itemWidth = item.offsetWidth +
                          parseInt(getComputedStyle(item).marginLeft) +
                          parseInt(getComputedStyle(item).marginRight);

        
        carousel.scrollBy({
            left: direction * itemWidth,
            behavior: 'smooth' 
        });
    };

    
    prevBtn.addEventListener('click', () => scrollCarouselByItem(-1)); 
    nextBtn.addEventListener('click', () => scrollCarouselByItem(1)); 

    
    const exploreButton = document.getElementById('explore-button');
    const exploreContent = document.getElementById('explore-content');

    exploreButton.addEventListener('click', () => {
        exploreContent.classList.toggle('hidden'); 
        if (!exploreContent.classList.contains('hidden')) {
            exploreButton.textContent = 'Hide Details';
        } else {
            exploreButton.textContent = 'Start Exploring Now!';
        }
    });

    
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const faqItem = button.closest('.faq-item'); 
            const answer = faqItem.querySelector('.faq-answer'); 
            const icon = button.querySelector('i'); 

            
            faqItem.classList.toggle('open');

            if (faqItem.classList.contains('open')) {
                
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.padding = '1rem'; 
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
                button.setAttribute('aria-expanded', 'true'); 
            } else {
               
                answer.style.maxHeight = '0';
                answer.style.padding = '0';
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
                button.setAttribute('aria-expanded', 'false'); 
            }

           
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

    
    document.querySelector('#contact form').addEventListener('submit', function(e) {
        e.preventDefault(); 
        console.log('Contact form submitted!'); 

       
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
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
