// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburgerBtn');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links li').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('active'));
});

// Initialize Slick Carousel
$('#productSlider').slick({
  infinite: true,           // Infinite loop
  slidesToShow: 3,         // Desktop: 3 cards
  slidesToScroll: 1,
  autoplay: true,          // Auto-play every 5 seconds
  autoplaySpeed: 5000,
  pauseOnHover: true,      // Pause on hover
  arrows: false,           // Use custom buttons
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 2 } }, // Tablet: 2 cards
    { breakpoint: 768, settings: { slidesToShow: 1 } }   // Mobile: 1 card
  ]
});

// Update slide counter
function updateCounter() {
  let current = $('#productSlider').slick('slickCurrentSlide') + 1;
  let total = $('#productSlider').slick('getSlick').slideCount;
  $('#counter').text(`Showing ${current} of ${total}`);
}

$('#productSlider').on('init afterChange', updateCounter);

// Custom Prev/Next buttons
$('#prevBtn').click(() => $('#productSlider').slick('slickPrev'));
$('#nextBtn').click(() => $('#productSlider').slick('slickNext'));

// Extra pause/resume on hover (already handled by slick, but ensures)
$('.product-card').on('mouseenter', () => $('#productSlider').slick('slickPause'));
$('.product-card').on('mouseleave', () => $('#productSlider').slick('slickPlay'));