document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('nav ul');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Service Form Handling
    const serviceButtons = document.querySelectorAll('.service-select-btn');
    const formOverlay = document.querySelector('.service-form-overlay');
    const closeFormBtn = document.querySelector('.close-form');
    const serviceForm = document.getElementById('serviceRequestForm');
    const selectedServiceInput = document.getElementById('selectedService');

    console.log('Service elements found:', {
        buttons: serviceButtons.length,
        overlay: formOverlay ? 'yes' : 'no',
        closeBtn: closeFormBtn ? 'yes' : 'no',
        form: serviceForm ? 'yes' : 'no',
        input: selectedServiceInput ? 'yes' : 'no'
    });

    // Add click handlers to service buttons
    if (serviceButtons.length > 0 && formOverlay) {
        serviceButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const serviceName = this.closest('.service-card').getAttribute('data-service');
                if (selectedServiceInput) {
                    selectedServiceInput.value = serviceName;
                }
                formOverlay.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });
    }

    // Close form button handler
    if (closeFormBtn && formOverlay) {
        closeFormBtn.addEventListener('click', () => {
            formOverlay.style.display = 'none';
            document.body.style.overflow = '';
        });
    }

    // Close form when clicking overlay
    if (formOverlay) {
        formOverlay.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }

    // Handle form submission
    if (serviceForm && formOverlay) {
        serviceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                service: selectedServiceInput ? selectedServiceInput.value : '',
                name: document.getElementById('name')?.value || '',
                email: document.getElementById('email')?.value || '',
                phone: document.getElementById('phone')?.value || '',
                country: document.getElementById('country')?.value || '',
                title: document.getElementById('title')?.value || '',
                budget: document.getElementById('budget')?.value || '',
                requirements: document.getElementById('requirements')?.value || ''
            };

            // Create email content
            const subject = `Service Request: ${formData.service}`;
            const body = `
Service Request Details:

Selected Service: ${formData.service}
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Country: ${formData.country}
Job Title: ${formData.title}
Budget: ${formData.budget}

Project Requirements:
${formData.requirements}`;

            // Open email client
            window.location.href = `mailto:mohammadizhan710@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            // Close and reset form
            formOverlay.style.display = 'none';
            document.body.style.overflow = '';
            serviceForm.reset();
        });
    }

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const headerOffset = 70;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});