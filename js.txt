/* ================================================= */
/* 1. IMPORTAÇÃO DIRETA (SEM TAG NO HTML)            */
/* ================================================= */
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

// Seus dados do Supabase
const SUPABASE_URL = 'https://zavidiffwkvhttjfnlmq.supabase.co'; 
const SUPABASE_KEY = 'sb_publishable_h2uqRttVKq87Ba4w6XImHw_p5KhNhJ1'; 

// Cria a conexão
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/* ================================================= */
/* 2. FUNÇÕES DE MODAL (COM FIX PARA O HTML)         */
/* ================================================= */

function fecharTodosModais() {
  document.getElementById("modalSobre").style.display = "none";
  document.getElementById("modalProjetos").style.display = "none";
  document.getElementById("modalContratar").style.display = "none";
  document.getElementById("modalContatos").style.display="none";
}

window.abrirModal = function() {
  fecharTodosModais();
  document.getElementById("modalSobre").style.display = "flex";
}
window.fecharModal = function() {
  document.getElementById("modalSobre").style.display = "none";
}

window.abrirProjetos = function() {
  fecharTodosModais();
  document.getElementById("modalProjetos").style.display = "flex";
}
window.fecharProjetos = function() {
  document.getElementById("modalProjetos").style.display = "none";
}
//TESTANDO PARTE DO EMAIL/CONTATO 



window.abrirContatos= function() {
  fecharTodosModais();
  document.getElementById("modalContatos").style.display = "flex";
}
window.fecharContatos = function() {
  document.getElementById("modalContatos").style.display = "none";
}



window.abrirContratar = function() {
  fecharTodosModais();
  document.getElementById("modalContratar").style.display = "flex";
}
window.fecharContratar = function() {
  document.getElementById("modalContratar").style.display = "none";
}

// Fechar ao clicar fora
window.onclick = function(event) {
  const modalSobre = document.getElementById("modalSobre");
  const modalTeste = document.getElementById("modalProjetos");
  const modalTeste2 = document.getElementById("modalContatos");
  const modalContratar = document.getElementById("modalContratar");

  if (event.target == modalSobre) modalSobre.style.display = "none";
  if (event.target == modalProjetos) modalProjetos.style.display = "none";
  if (event.target == modalTeste2) modalTeste2.style.display = "none";
  if (event.target == modalContratar) modalContratar.style.display = "none";
}

/* ================================================= */
/* 3. CONTADOR DE CARACTERES                         */
/* ================================================= */
const mensagemInput = document.getElementById('mensagem');
const contadorLetras = document.getElementById('contador-letras');

if (mensagemInput && contadorLetras) {
  mensagemInput.addEventListener('input', function() {
    const tamanho = mensagemInput.value.length;
    contadorLetras.textContent = tamanho;

    if (tamanho >= 450) {
      contadorLetras.style.color = 'red';
    } else {
      contadorLetras.style.color = 'var(--cor-destaque)';
    }
  });
}

/* ================================================= */
/* 4. ENVIO DO FORMULÁRIO (SUPABASE + EMAILJS DUPLO) */
/* ================================================= */

const formContratar = document.getElementById('form-contratar');

function emailValido(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

if (formContratar) {
  formContratar.addEventListener('submit', async function(e) {
    e.preventDefault(); 

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('mensagem').value;
    const btn = formContratar.querySelector('button');
    
    // Validação básica
    if (!emailValido(email)) {
        alert("Por favor, digite um e-mail válido!");
        return;
    }

    // Feedback visual (carregando)
    const textoOriginal = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    btn.disabled = true;

    try {
        // --- A. SALVA NO SUPABASE ---
        const agora = new Date();
        agora.setHours(agora.getHours() - 3); // Ajuste GMT-3

        const { error } = await supabase
          .from('contatos') 
          .insert([{ 
                nome: nome, 
                email: email, 
                mensagem: mensagem,
                created_at: agora 
            }]);

        if (error) throw error; // Para se der erro no banco

        // --- B. ENVIA OS EMAILS (EMAILJS) ---
        
        const serviceID = "service_u5entdh"; // Seu serviço atual
        
        // 1. Template para VOCÊ (Admin) - COLOQUE O ID NOVO ABAIXO
        const templateAdminID = "template_3yrddjr"; 
        
        // 2. Template para o CLIENTE (Confirmação) - O antigo que já funcionava
        const templateClienteID = "template_xvxwgvh";

        const emailParams = {
            nome: nome,
            email: email,
            mensagem: mensagem
        };

        // Envia o e-mail para VOCÊ primeiro (Prioridade)
        await emailjs.send(serviceID, templateAdminID, emailParams);

        // Envia confirmação para o CLIENTE (Se falhar, não trava o processo)
        emailjs.send(serviceID, templateClienteID, emailParams)
            .catch(err => console.warn("Aviso: Auto-reply falhou, mas admin recebeu.", err));

        // --- C. SUCESSO ---

        setCookie('rafael_user_name', nome, 365);

        alert('Mensagem enviada com sucesso! Em breve entrarei em contato. 🚀');
        
        // Limpa tudo
        formContratar.reset(); 
        if (contadorLetras) contadorLetras.textContent = "0";
        window.fecharContratar();

    } catch (erro) {
        console.error('Erro:', erro);
        alert('Ops! Erro ao enviar: ' + (erro.message || "Tente novamente mais tarde."));
    } finally {
        // Restaura o botão
        btn.innerHTML = textoOriginal;
        btn.disabled = false;
    }
  });
}

/* ================================================= */
/* 5. SISTEMA DE RASTREAMENTO (COOKIES + SUPABASE)   */
/* ================================================= */

// A. Funções Auxiliares para lidar com Cookies
function setCookie(nome, valor, dias) {
    let expires = "";
    if (dias) {
        const date = new Date();
        date.setTime(date.getTime() + (dias * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = nome + "=" + (valor || "") + expires + "; path=/";
}

function getCookie(nome) {
    const nameEQ = nome + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// B. Função para gerar um ID único simples (UUID v4 fake para navegador)
function gerarIDUnico() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// C. Lógica Principal: Registrar o Acesso com Localização
async function registrarAcesso() {
    // Evita duplicidade: Se já registrou nesta sessão (aba aberta), não registra de novo
    if (sessionStorage.getItem('acesso_registrado')) return;

    let visitorId = getCookie('rafael_visitor_id');
    let userName = getCookie('rafael_user_name'); 

    if (!visitorId) {
        visitorId = gerarIDUnico();
        setCookie('rafael_visitor_id', visitorId, 365);
    }

    try {
        // 1. Pega dados de Localização (API Gratuita)
        const response = await fetch('https://ipapi.co/json/');
        const dataGeo = await response.json();

        // 2. Prepara os dados
        const dadosAcesso = {
            visitor_id: visitorId,
            nome_identificado: userName || 'Anônimo',
            user_agent: navigator.userAgent,
            url_origem: document.referrer,
            // Novos campos de localização
            cidade: dataGeo.city || 'Desconhecida',
            pais: dataGeo.country_name || 'Desconhecido',
            ip: dataGeo.ip || 'Oculto'
        };

        // 3. Salva no Supabase
        const { error } = await supabase
            .from('acessos')
            .insert([dadosAcesso]);
            
        if (error) throw error;

        // Marca que já registrou nesta sessão para não lotar o banco com F5
        sessionStorage.setItem('acesso_registrado', 'true');
        console.log(`Acesso registrado: ${dadosAcesso.cidade}, ${dadosAcesso.pais}`);

    } catch (err) {
        console.warn('Erro silencioso no tracking:', err);
    }
    
    if (userName) console.log(`Bem-vindo de volta, ${userName}!`);
}

// Executa
registrarAcesso();