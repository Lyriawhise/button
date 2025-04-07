const playButton = document.getElementById('playButton');
        
playButton.addEventListener('click', function() {
    this.classList.toggle('playing');
    
    // Tambahkan logika untuk memainkan video di sini
    if (this.classList.contains('playing')) {
        console.log('Video mulai diputar');
    } else {
        console.log('Video dihentikan');
        // Reset animasi dengan menghapus dan menambahkan kembali class playing
        setTimeout(() => {
            if (!this.classList.contains('playing')) {
                const waveContainer = this.querySelector('.wave-container');
                const newWaveContainer = waveContainer.cloneNode(true);
                waveContainer.parentNode.replaceChild(newWaveContainer, waveContainer);
            }
        }, 400);
    }
});
