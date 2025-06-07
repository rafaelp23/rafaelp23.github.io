// Menu Hamburguer
let menuIcon = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navlist.classList.toggle('open');
};

// Fechar menu ao clicar em um link
document.querySelectorAll('.navlist a').forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navlist.classList.remove('open');
    });
});



// Botão Voltar ao Topo
const topButton = document.getElementById('top');

window.addEventListener('scroll', function() {
    // Mostrar/ocultar botão baseado na posição de rolagem
    if (window.scrollY > 300) {
        topButton.classList.add('show');
    } else {
        topButton.classList.remove('show');
    }
});

// Rolagem suave ao clicar no botão
topButton.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Header sticky (se ainda não tiver)
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});