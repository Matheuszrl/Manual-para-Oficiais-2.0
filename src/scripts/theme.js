function updateImagesForTheme(theme) {
    const images = document.querySelectorAll('img[data-theme-image]');
    
    images.forEach(img => {
        const lightSrc = img.getAttribute('data-light-src');
        const darkSrc = img.getAttribute('data-dark-src');
        
        img.src = theme === 'dark' ? darkSrc : lightSrc;
    });
}

function initializeTheme() {
    const themeButton = document.getElementById('theme-button');
    const storedTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', storedTheme);
    updateImagesForTheme(storedTheme); // Atualiza imagens no carregamento
    
    themeButton.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateImagesForTheme(newTheme); // Atualiza imagens na troca de tema
    });
}

initializeTheme();