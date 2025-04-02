document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.getElementById('downloadBtn');
    const progressCircle = document.getElementById('progressCircle');
    const btnText = downloadBtn.querySelector('.btn-text');
    
    // Calculate the circle circumference
    const radius = 16;
    const circumference = 2 * Math.PI * radius;
    
    // Set initial state
    progressCircle.style.strokeDasharray = circumference;
    progressCircle.style.strokeDashoffset = circumference;
    
    // Create ripple effect function
    function createRipple(event) {
      const button = event.currentTarget;
      const ripple = document.createElement('span');
      const rect = button.getBoundingClientRect();
      
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;
      
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      button.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 800);
    }
    
    // Create sparkle effect
    function createSparkles(event) {
      const button = event.currentTarget;
      const sparkle = document.createElement('div');
      const rect = button.getBoundingClientRect();
      
      sparkle.className = 'sparkle';
      
      // Create multiple sparkle particles
      for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'sparkle-particle';
        
        // Random position within 50px radius of click point
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 50;
        const x = event.clientX - rect.left + Math.cos(angle) * distance;
        const y = event.clientY - rect.top + Math.sin(angle) * distance;
        
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        // Random delay
        particle.style.animationDelay = `${Math.random() * 300}ms`;
        
        sparkle.appendChild(particle);
      }
      
      button.appendChild(sparkle);
      
      setTimeout(() => {
        sparkle.remove();
      }, 1100);
    }
    
    // Create pulse effect
    function createPulse(button) {
      const pulse = document.createElement('div');
      pulse.className = 'pulse-ring';
      button.appendChild(pulse);
      
      setTimeout(() => {
        pulse.remove();
      }, 1000);
    }
    
    // Create confetti effect
    function createConfetti(button) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      
      const colors = ['#3182ce', '#4299e1', '#38b2ac', '#48bb78', '#ecc94b', '#ed8936'];
      
      // Create multiple confetti pieces
      for (let i = 0; i < 40; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        
        // Random position above the button
        const x = Math.random() * button.offsetWidth;
        const y = -20 - Math.random() * 10;
        
        // Random horizontal movement
        const dirX = (Math.random() - 0.5) * 15;
        
        piece.style.left = `${x}px`;
        piece.style.top = `${y}px`;
        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        piece.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        // Random size
        const size = Math.random() * 0.5 + 0.5;
        piece.style.width = `${8 * size}px`;
        piece.style.height = `${16 * size}px`;
        
        // Random animation
        piece.style.animationDuration = `${Math.random() * 2 + 1}s`;
        piece.style.animationDelay = `${Math.random() * 0.5}s`;
        
        // Random horizontal movement
        piece.style.setProperty('--dirX', dirX + 'px');
        
        confetti.appendChild(piece);
      }
      
      button.appendChild(confetti);
      
      setTimeout(() => {
        confetti.remove();
      }, 3000);
    }
    
    // Button click event
    downloadBtn.addEventListener('click', function(event) {
      // Prevent multiple clicks
      if (this.classList.contains('loading') || this.classList.contains('success')) {
        return;
      }
      
      // Add ripple effect
      createRipple(event);
      
      // Add sparkle effect
      createSparkles(event);
      
      // Add pulse effect
      createPulse(this);
      
      // Start download animation
      this.classList.add('loading');
      btnText.textContent = 'Downloading...';
      
      // Animate progress circle
      progressCircle.style.strokeDashoffset = circumference;
      
      // Start progress animation
      let progress = 0;
      const duration = 2000; // 2 seconds
      const interval = 20; // Update every 20ms
      const steps = duration / interval;
      const increment = 1 / steps;
      
      const progressInterval = setInterval(() => {
        progress += increment;
        const offset = circumference - (progress * circumference);
        progressCircle.style.strokeDashoffset = offset;
        
        if (progress >= 1) {
          clearInterval(progressInterval);
          completeDownload();
        }
      }, interval);
      
      // Complete download animation
      function completeDownload() {
        downloadBtn.classList.remove('loading');
        downloadBtn.classList.add('success');
        btnText.textContent = 'Downloaded';
        
        // Add confetti effect
        createConfetti(downloadBtn);
        
        // Reset button after delay
        setTimeout(() => {
          progressCircle.style.strokeDashoffset = circumference;
          downloadBtn.classList.remove('success');
          btnText.textContent = 'Download';
        }, 3000);
      }
    });
  });
