// Menu lateral
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const toggleBtn = document.getElementById('toggleBtn');
    const menu = document.getElementById('menu');

    mobileMenuBtn.addEventListener('click', function(){
        sidebar.classList.toggle('open');
        mobileMenuBtn.classList.toggle('active');
    })

    toggleBtn.addEventListener('click', function() {
        menu.classList.toggle('show');
        chevron.classList.toggle('rotate');
        sidebar.classList.toggle('open');
    });

    // Funcionalidade para submenus
    const submenuBtns = document.querySelectorAll('.submenu-btn');
    submenuBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const submenu = this.nextElementSibling;
            const chevron = this.querySelector('.chevron');
            submenu.classList.toggle('show');
            chevron.classList.toggle('rotate');
            
            if (window.innerWidth <= 768 && !sidebar.contains(e.target) && e.target !== mobileMenuBtn) {
                sidebar.classList.remove('open');
                mobileMenuBtn.classList.remove('active');
            }
        });
    });

    // Adiciona a funcionalidade de marcar o item ativo
    const menuItems = document.querySelectorAll('.menu a, .submenu a');
    const currentPath = window.location.pathname;
    menuItems.forEach(item => {
        if (item.getAttribute('href') === currentPath) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
            
        // Fecha o menu em telas menores após clicar em um item
        if (window.innerWidth <= 768 && !sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
            sidebar.classList.remove('open');
            menu.classList.remove('show');
            chevron.classList.remove('rotate');
            }
        });

    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('open');
            mobileMenuBtn.classList.remove('active');
        }
    });
});

// Gaveteiro expansivo
document.querySelectorAll('.expand-button').forEach(button => {
    button.addEventListener('click', () => {
        const expanded = button.getAttribute('aria-expanded') === 'true' || false;
        button.setAttribute('aria-expanded', !expanded);
        const content = document.getElementById(button.getAttribute('aria-controls'));
        content.classList.toggle('open');
    });
});

// Calculadora penal
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('penaltyForm');
    const resultCard = document.getElementById('resultCard');
    const resetButton = document.getElementById('resetButton');
    const resultItems = document.querySelector('.result-items');

    const minimumPenalties = {
        illegalTools: 10,
        drugTrafficking: 15,
        illegalAmmunition: 15,
        illegalMoney: 10,
        stolenProducts: 10,
        pendingFines: 10
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const values = {
            illegalTools: Number(document.getElementById('illegalTools').value) || 0,
            drugTrafficking: Number(document.getElementById('drugTrafficking').value) || 0,
            illegalAmmunition: Number(document.getElementById('illegalAmmunition').value) || 0,
            illegalMoney: Number(document.getElementById('illegalMoney').value) || 0,
            stolenProducts: Number(document.getElementById('stolenProducts').value) || 0,
            pendingFines: Number(document.getElementById('pendingFines').value) || 0
        };

        const result = calculatePenalties(values, minimumPenalties);

        resultItems.innerHTML = '';

        let totalPenalty = 0;

        Object.entries(result).forEach(([key, value]) => {
            if (value.total > minimumPenalties[key]) {
                const resultItem = document.createElement('div');
                resultItem.className = 'result-item';
                resultItem.innerHTML = `
                    <span>${getPenaltyLabel(key)}:</span>
                    <span>${value.total.toFixed(1)} meses</span>
                `;
                resultItems.appendChild(resultItem);

                totalPenalty += value.total;
            }
        });

        const totalItem = document.createElement('div');
        totalItem.className = 'total-result';
        totalItem.innerHTML = `
            <span>Pena Total:</span>
            <span>${totalPenalty.toFixed(1)} meses</span>
        `;
        resultItems.appendChild(totalItem);

        resultCard.classList.remove('hidden');
    });

    resetButton.addEventListener('click', () => {
        form.reset();
        resultCard.classList.add('hidden');
        resultItems.innerHTML = '';
    });

    const inputs = form.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('input', (e) => {
            if (e.target.value < 0) {
                e.target.value = 0;
            }
        });

        input.addEventListener('focus', (e) => {
            if (e.target.value === '0') {
                e.target.value = '';
            }
        });

        input.addEventListener('blur', (e) => {
            if (e.target.value === '') {
                e.target.value = '0';
            }
        });
    });
});

// Lazy loading de imagens
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img.lazy-image');
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy-image');
                requestAnimationFrame(() => {
                    img.classList.add('loaded');
                });
                observer.unobserve(img);
            }
        });
    }, options);

    images.forEach(img => {
        imageObserver.observe(img);
    });
};

const initTabContent = () => {
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            const tabGroup = tab.getAttribute('tab-group');
            
            tabs.forEach(
                t => {
                    if (t.getAttribute('tab-group') == tabGroup){
                        t.classList.remove('active')
                    }
                }                
            );
            contents.forEach(
                c => {
                    if (c.getAttribute('tab-group') == tabGroup){
                        c.classList.remove('active')
                    }
                }             
            );
            tab.classList.add('active');
            document.getElementById(tabId).classList.add('active');
            
            lazyLoadImages();
        });
    });
};

// Zoom para imagens e GIFs
const initImageZoom = () => {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('zoomedImage');
    const closeButton = document.querySelector('.close-button');
    const zoomableImages = document.querySelectorAll('.zoomable-image img');

    const openModal = (src) => {
        modal.style.display = 'block';
        modalImg.src = src;
        
        const windowRatio = (window.innerWidth * 0.9) / (window.innerHeight * 0.9);
        const img = new Image();
        img.src = src;
        img.onload = () => {
            const imageRatio = img.width / img.height;
            if (imageRatio > windowRatio) {
                modalImg.style.width = '90vw';
                modalImg.style.height = 'auto';
            } else {
                modalImg.style.height = '90vh';
                modalImg.style.width = 'auto';
            }
        };
    };

    const closeModal = () => {
        modal.style.display = 'none';
        document.body.classList.remove('scroll-lock');
    };

    zoomableImages.forEach(img => {
        img.addEventListener('click', function() {
            openModal(this.src);
        });
    });

    closeButton.addEventListener('click', closeModal);

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
};

// Garantir que as funções são chamadas
document.addEventListener('DOMContentLoaded', () => {
    lazyLoadImages();
    initTabContent();
    initImageZoom();
});