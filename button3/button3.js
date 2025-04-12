document.addEventListener('DOMContentLoaded', function() {
    const submitBtn = document.getElementById('submitBtn');
    const progressBar = document.getElementById('progressBar');
    const particles = document.getElementById('particles');
    const themeToggle = document.getElementById('themeToggle');
    
    // Text elements
    const submitText = document.getElementById('submitText');
    const processingText = document.getElementById('processingText');
    const doneText = document.getElementById('doneText');
    const errorText = document.getElementById('errorText');
    
    let isAnimating = false;
    let successProbability = 0.85; // 85% chance of success
    
    // Theme toggle
    themeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-theme');
    });
    
    // Add ripple effect
    submitBtn.addEventListener('mousedown', function(e) {
      const rect = submitBtn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      
      submitBtn.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 800);
    });
    
    submitBtn.addEventListener('click', function(e) {
      if (isAnimating) return;
      isAnimating = true;
      
      // Start the animation sequence
      animateButton();
    });
    
    function animateButton() {
      // Step 1: Change button to processing state
      submitBtn.classList.add('processing');
      
      // Change text to "Processing..."
      changeText(submitText, processingText);
      
      // Step 2: Start progress bar
      setTimeout(() => {
        progressBar.style.width = '100%';
      }, 50);
      
      // Step 3: Determine success or error
      setTimeout(() => {
        submitBtn.classList.remove('processing');
        
        // Random success/error for demo purposes
        if (Math.random() < successProbability) {
          // Success
          submitBtn.classList.add('completed');
          changeText(processingText, doneText);
          createParticles();
        } else {
          // Error
          submitBtn.classList.add('error');
          changeText(processingText, errorText);
        }
      }, 1500);
      
      // Reset for demo purposes
      setTimeout(() => {
        resetButton();
      }, 3000);
    }
    
    function changeText(currentText, nextText) {
      // Fade out current text
      currentText.classList.add('hidden');
      
      // Prepare next text
      nextText.classList.remove('hidden');
      nextText.classList.add('next');
      
      // Slight delay then fade in next text
      setTimeout(() => {
        nextText.classList.remove('next');
      }, 200);
    }
    
    function resetButton() {
      // Reset progress bar
      progressBar.style.width = '0%';
      
      // Reset text
      doneText.classList.add('hidden');
      processingText.classList.add('hidden');
      errorText.classList.add('hidden');
      submitText.classList.remove('hidden');
      
      // Reset button state
      submitBtn.classList.remove('completed');
      submitBtn.classList.remove('error');
      
      // Allow animation again
      setTimeout(() => {
        isAnimating = false;
      }, 300);
    }
    
    function createParticles() {
      // Clear existing particles
      particles.innerHTML = '';
      
      // Create particles
      for (let i = 0; i < 15; i++) {
        createParticle();
      }
    }
    
    function createParticle() {
      const particle = document.createElement('span');
      particle.className = 'particle';
      
      // Random size
      const size = Math.random() * 8 + 4;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      
      // Random position
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      particle.style.left = left + '%';
      particle.style.top = top + '%';
      
      // Animation
      const duration = Math.random() * 1 + 0.5;
      const delay = Math.random() * 0.2;
      
      // Random direction
      const xDir = Math.random() > 0.5 ? 1 : -1;
      const yDir = Math.random() > 0.5 ? 1 : -1;
      const distance = Math.random() * 80 + 20;
      
      particle.style.animation = `none`;
      particles.appendChild(particle);
      
      // Force reflow
      void particle.offsetWidth;
      
      particle.style.opacity = '1';
      particle.style.transform = 'scale(1)';
      particle.style.transition = `all ${duration}s ease`;
      
      setTimeout(() => {
        particle.style.opacity = '0';
        particle.style.transform = `translate(${xDir * distance}px, ${yDir * distance}px) scale(0)`;
      }, delay * 1000);
      
      // Remove after animation
      setTimeout(() => {
        if (particle.parentNode === particles) {
          particles.removeChild(particle);
        }
      }, (duration + delay) * 1000);
    }
  });
