document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('addToCartBtn');
    const buttonContent = button.querySelector('.button-content');
    const shirtIcon = document.querySelector('.shirt-icon');
    const cartIcon = document.querySelector('.cart-icon');
    const cartCount = document.querySelector('.cart-count');
    const particles = document.getElementById('particles');
    
    function createParticles() {
        // Clear existing particles
        particles.innerHTML = '';
        
        // Create new particles
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position around cart icon
            const x = -60 + Math.random() * 20;
            const y = 0 + Math.random() * 20;
            
            // Set initial position
            particle.style.left = '50%';
            particle.style.top = '50%';
            
            // Random color
            const colors = ['#ffffff', '#e0f7fa', '#b2ebf2', '#80deea'];
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            // Add to DOM
            particles.appendChild(particle);
            
            // Animate with random direction
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 3;
            const size = 3 + Math.random() * 5;
            
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            // Create unique animation
            const keyframes = [
                { 
                    transform: 'translate(0px, 0px)',
                    opacity: 0
                },
                { 
                    transform: `translate(${Math.cos(angle) * 100}px, ${Math.sin(angle) * 100}px)`,
                    opacity: 1,
                    offset: 0.3
                },
                { 
                    transform: `translate(${Math.cos(angle) * 150}px, ${Math.sin(angle) * 150}px)`,
                    opacity: 0
                }
            ];
            
            const timing = {
                duration: 1000 + Math.random() * 500,
                easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
                delay: 600 + Math.random() * 200,
                fill: 'forwards'
            };
            
            particle.animate(keyframes, timing);
        }
    }
    
    button.addEventListener('click', function() {
        if (!this.classList.contains('processing') && !this.classList.contains('added')) {
            // Add clicked state
            this.classList.add('clicked');
            
            // Show shirt and animate
            shirtIcon.style.opacity = '1';
            shirtIcon.style.animation = 'floatToCart 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
            
            // Start processing state
            setTimeout(() => {
                this.classList.add('processing');
                
                // Finish processing and show success state
                setTimeout(() => {
                    this.classList.remove('processing');
                    this.classList.add('added');
                    
                    // Animate cart icon
                    cartIcon.style.animation = 'cartBounce 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                    
                    // Show cart count
                    cartCount.classList.add('show');
                    
                    // Create particle explosion
                    createParticles();
                    
                    // Reset after animation complete
                    setTimeout(() => {
                        // Reset all states
                        this.classList.remove('clicked', 'added');
                        shirtIcon.style.opacity = '0';
                        shirtIcon.style.animation = 'none';
                        cartIcon.style.animation = 'none';
                        
                        setTimeout(() => {
                            cartCount.classList.remove('show');
                        }, 300);
                    }, 3000);
                }, 1500);
            }, 400);
        }
    });
});
