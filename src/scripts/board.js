document.addEventListener('DOMContentLoaded', function() {
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
        });
    });
});

document.querySelectorAll('.expand-button').forEach(button => {
    button.addEventListener('click', () => {
        const expanded = button.getAttribute('aria-expanded') === 'true' || false;
        button.setAttribute('aria-expanded', !expanded);
        const content = document.getElementById(button.getAttribute('aria-controls'));
        content.classList.toggle('open');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todos os elementos necessários
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('zoomedImage');
    const closeButton = document.querySelector('.close-button');
    const zoomableImages = document.querySelectorAll('.zoomable-image img');

    // Adiciona evento de clique para cada imagem
    zoomableImages.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = this.src;
        });
    });

    // Fecha o modal ao clicar no X
    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Fecha o modal ao clicar fora da imagem
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Fecha o modal com a tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modal.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggleBtn');
    const menu = document.getElementById('menu');
    const chevron = toggleBtn.querySelector('.chevron');

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
        });
    });

    // Adiciona a funcionalidade de marcar o item ativo
    const menuItems = document.querySelectorAll('.menu a, .submenu a');
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // Fecha o menu em telas menores após clicar em um item
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('open');
                menu.classList.remove('show');
                chevron.classList.remove('rotate');
            }
        });
    });

    // Fecha o menu ao clicar fora dele em telas menores
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && !sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
            sidebar.classList.remove('open');
            menu.classList.remove('show');
            chevron.classList.remove('rotate');
        }
    });
});