// --- Menu Hamburguer ---
let menuIcon = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');

// Abre/fecha o menu ao clicar no ícone
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navlist.classList.toggle('open');
};

// Fecha o menu ao clicar em um link da navegação (útil para mobile)
document.querySelectorAll('.navlist a').forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navlist.classList.remove('open');
    });
});

// --- Botão Voltar ao Topo ---
const topButton = document.getElementById('top');

// Mostra/oculta o botão baseado na posição de rolagem da página
window.addEventListener('scroll', function () {
    if (window.scrollY > 300) { // Se a rolagem for maior que 300px
        topButton.classList.add('show');
    } else {
        topButton.classList.remove('show');
    }
});

// Rolagem suave ao clicar no botão "Voltar ao Topo"
topButton.addEventListener('click', function (e) {
    e.preventDefault(); // Previne o comportamento padrão do link (salto instantâneo)
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Rolagem suave
    });
});

// --- Header Sticky (Cabeçalho fixo ao rolar) ---
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    // Adiciona a classe 'sticky' ao header quando a rolagem vertical for maior que 0
    header.classList.toggle('sticky', window.scrollY > 0);
});

// --- Efeito Hover da Imagem na Seção de Experiências/Projetos ---

// Obtém referências aos elementos HTML
const userImageContainer = document.getElementById('boxd'); // O div que contém a imagem e o overlay
const userImageElement = document.getElementById('imgtaskp'); // A imagem dentro do contêiner
const userImageOverlay = document.getElementById('taskpOverlay'); // O div de overlay com o texto

// Função para aplicar o efeito de hover: blur na imagem e mostrar texto no overlay
function applyHoverEffect(container, image, overlay) {
    function handleMouseOver() {
        image.classList.add('blurred'); // Adiciona a classe 'blurred' à imagem
        overlay.classList.add('show-text'); // Adiciona a classe 'show-text' ao overlay
    }

    function handleMouseOut() {
        image.classList.remove('blurred'); // Remove a classe 'blurred' da imagem
        overlay.classList.remove('show-text'); // Remove a classe 'show-text' do overlay
    }

    // Adiciona os ouvintes de evento ao contêiner principal (div .boxd)
    if (container) { // Garante que o contêiner existe antes de adicionar ouvintes
        container.addEventListener('mouseover', handleMouseOver);
        container.addEventListener('mouseout', handleMouseOut);
    }
}

// Aplica o efeito à imagem do usuário na seção de experiência, se os elementos existirem
if (userImageContainer && userImageElement && userImageOverlay) {
    applyHoverEffect(userImageContainer, userImageElement, userImageOverlay);
} else {
    // Isso é útil para depuração no console se algum ID estiver incorreto
    console.warn("Elementos para o efeito de hover da imagem não encontrados. Verifique os IDs 'boxd', 'imgtaskp' e 'taskpOverlay'.");
}