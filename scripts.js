$(document).ready(function() {
    // Smooth scrolling for internal links
    $('a.nav-link, .btn, a[href^="#"]').on('click', function(event) {
        var hash = this.hash;
        if (hash && $(hash).length > 0) { // Ensure the target exists
            event.preventDefault();
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 56
            }, 800);
        }
    });

    // Navbar color change on scroll
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('navbar-scrolled');
        } else {
            $('.navbar').removeClass('navbar-scrolled');
        }
    });

    // Parallax effect on home section
    $(window).scroll(function() {
        var scrollPosition = $(this).scrollTop();
        $('#home').css('background-position-y', -(scrollPosition * 0.5) + 'px');
    });

    // Typing effect for home section
    const typed = new Typed('#typed-text', {
        strings: ['Software Engineer', 'Electrical Engineering Student', 'Technology Enthusiast'],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true
    });

    // Project filter
    $('.filter-btn').on('click', function() {
        var category = $(this).attr('data-filter');
        if (category === 'all') {
            $('.project-item').show('1000');
        } else {
            $('.project-item').not('.' + category).hide('1000');
            $('.project-item').filter('.' + category).show('1000');
        }
        $(this).addClass('active').siblings().removeClass('active');
    });

    // Lazy loading images
    const images = document.querySelectorAll('[data-src]');
    const config = {
        rootMargin: '0px 0px 50px 0px',
        threshold: 0
    };

    let observer = new IntersectionObserver(function(entries, self) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                preloadImage(entry.target);
                self.unobserve(entry.target);
            }
        });
    }, config);

    images.forEach(image => {
        observer.observe(image);
    });

    function preloadImage(img) {
        const src = img.getAttribute('data-src');
        if (!src) { return; }
        img.src = src;
    });

    // Form validation and submission
    $('#contact-form').submit(function(e) {
        e.preventDefault();
        var name = $('#name').val();
        var email = $('#email').val();
        var message = $('#message').val();
        var errors = [];

        if (name.length < 2) {
            errors.push('Name must be at least 2 characters long');
        }

        if (!validateEmail(email)) {
            errors.push('Please enter a valid email address');
        }

        if (message.length < 10) {
            errors.push('Message must be at least 10 characters long');
        }

        if (errors.length > 0) {
            alert(errors.join('\n'));
        } else {
            alert('Thank you for your message, ' + name + '! I will get back to you soon.');
            this.reset();
        }
    });

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Interactive floating boxes
    $('.box').on('mouseenter', function() {
        $(this).css('transform', 'scale(1.2) rotate(45deg)');
    }).on('mouseleave', function() {
        $(this).css('transform', '');
    });

    // Dynamic content loading for projects
    $('#load-more-projects').on('click', function() {
        $.ajax({
            url: 'more-projects.json', // You'll need to create this JSON file
            dataType: 'json',
            success: function(data) {
                data.projects.forEach(function(project) {
                    var projectHtml = `
                        <div class="col-md-6 mb-4 project-item ${project.category} reveal">
                            <div class="card h-100">
                                <img src="${project.image}" class="card-img-top project-image" alt="${project.title}">
                                <div class="card-body">
                                    <h5 class="card-title">${project.title}</h5>
                                    <p class="card-text">${project.description}</p>
                                </div>
                            </div>
                        </div>
                    `;
                    $('#projects-container').append(projectHtml);
                });
                animateTimelinePanels(); // Trigger animation after new projects are loaded
            },
            error: function() {
                alert('Error loading more projects');
            }
        });
    });

    // Toggle thesis details function
    function toggleThesisDetails() {
        var details = document.getElementById("thesis-details");
        details.style.display = details.style.display === "none" ? "block" : "none";
    }

    // Animate timeline panels on page load and scroll
    function animateTimelinePanels() {
        var timelinePanels = document.querySelectorAll('.timeline-panel');
        timelinePanels.forEach(function(panel) {
            if (isElementInViewport(panel)) {
                panel.classList.add('active');
            }
        });
    }

    // Check if element is in viewport
    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

   
    // Dark mode toggle
    $('#dark-mode-toggle').on('click', function() {
        $('body').toggleClass('dark-mode');
        var isDarkMode = $('body').hasClass('dark-mode');
        $(this).text(isDarkMode ? 'Light Mode' : 'Dark Mode');
    });

    // New code for View More/Less functionality in About Me section
    $('#view-more-btn').on('click', function() {
        $('#quick-info').hide();
        $('#full-info').show();
    });

    $('#view-less-btn').on('click', function() {
        $('#full-info').hide();
        $('#quick-info').show();
    });
});

    // Call functions on page load
    animateTimelinePanels();
    window.addEventListener("scroll", animateTimelinePanels);

    // Smooth scroll back to top button
    var backToTopBtn = $('<button/>', {
        class: 'btn btn-primary back-to-top',
        html: '<i class="fa fa-chevron-up"></i>',
        click: function() {
            $('html, body').animate({ scrollTop: 0 }, 800);
        }
    }).appendTo('body');

    $(window).scroll(function() {
        if ($(window).scrollTop() > 300) {
            backToTopBtn.fadeIn();
        } else {
            backToTopBtn.fadeOut();
        }
    });

    // Initialize tooltips
    $('[data-toggle="tooltip"]').tooltip();

    // Dark mode toggle
    $('#dark-mode-toggle').on('click', function() {
        $('body').toggleClass('dark-mode');
        var isDarkMode = $('body').hasClass('dark-mode');
        $(this).text(isDarkMode ? 'Light Mode' : 'Dark Mode');
    });
});
