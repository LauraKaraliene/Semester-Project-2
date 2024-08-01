
export function carouselHandler() {
    console.log('carouselHandler function called');

    // Check if Bootstrap is loaded
    if (typeof bootstrap === 'undefined') {
        console.error('Bootstrap is not loaded.');
        return;
    }

    const carousel = document.querySelector('#carouselExampleIndicators');

    if (!carousel) {
        console.error('Carousel element not found.');
        return;
    }

    // Initialize the carousel
    const carouselInstance = new bootstrap.Carousel(carousel, {
        interval: 4000, // Adjust the interval as needed
        pause: 'hover' // Ensure the carousel pauses on hover
    });

    console.log('Bootstrap version:', bootstrap.version);
    console.log('Carousel initialized:', carouselInstance);

    // Pause the carousel on hover
    carousel.addEventListener('mouseenter', function() {
        carouselInstance.pause();
    });

    // Resume the carousel when the mouse leaves
    carousel.addEventListener('mouseleave', function() {
        carouselInstance.cycle();
    });

    // Manage interactions with offcanvas
    document.addEventListener('click', (event) => {
        const target = event.target;

        // If the click is within the offcanvas or its trigger, stop the event from propagating to the carousel
        if (target.closest('[data-bs-toggle="offcanvas"]') || 
            target.closest('.offcanvas') ||
            target.closest('.offcanvas-body') ||
            target.closest('.offcanvas-header') ||
            target.closest('.btn-close')) {
            event.stopPropagation(); // Prevent carousel slide
        }
    });
}



