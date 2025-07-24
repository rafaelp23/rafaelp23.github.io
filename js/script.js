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

        window.addEventListener('scroll', function () {
            // Mostrar/ocultar botão baseado na posição de rolagem
            if (window.scrollY > 300) {
                topButton.classList.add('show');
            } else {
                topButton.classList.remove('show');
            }
        });

        // Rolagem suave ao clicar no botão
        topButton.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Header sticky
        window.addEventListener('scroll', function () {
            const header = document.querySelector('header');
            header.classList.toggle('sticky', window.scrollY > 0);
        });

        // --- INÍCIO DO CÓDIGO DO EFEITO HOVER DA IMAGEM ---

        // Obtém referências aos elementos HTML para a imagem do usuário
        const userImageContainer = document.getElementById('boxd'); // O div .boxd
        const userImageElement = document.getElementById('imgtaskp'); // A imagem dentro do .boxd
        const userImageOverlay = document.getElementById('taskpOverlay'); // O novo div de overlay

        // Função genérica para aplicar o efeito hover
        function applyHoverEffect(container, image, overlay) {
            function handleMouseOver() {
                image.classList.add('blurred'); // Adiciona a classe 'blurred' à imagem
                overlay.classList.add('show-text'); // Adiciona a classe 'show-text' ao overlay
            }

            function handleMouseOut() {
                image.classList.remove('blurred'); // Remove a classe 'blurred' da imagem
                overlay.classList.remove('show-text'); // Remove a classe 'show-text' do overlay
            }

            // Adiciona os ouvintes de evento ao contêiner
            container.addEventListener('mouseover', handleMouseOver);
            container.addEventListener('mouseout', handleMouseOut);
        }

        // Aplica o efeito à imagem do usuário na seção de experiência
        if (userImageContainer && userImageElement && userImageOverlay) {
            applyHoverEffect(userImageContainer, userImageElement, userImageOverlay);
        } else {
            console.warn("Elementos para o efeito de hover da imagem não encontrados. Verifique os IDs 'boxd', 'imgtaskp' e 'taskpOverlay'.");
        }
