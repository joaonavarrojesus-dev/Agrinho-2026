/* ==========================================================================
   SCRIPT DE INTERATIVIDADE, ACESSIBILIDADE E COMPONENTES MODERNOS - AGROFUTURO
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. GERENCIAMENTO DAS SEÇÕES EXPANSÍVEIS (ACCORDION)
    const headers = document.querySelectorAll('.accordion-header');
    
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const estaAtivo = item.classList.contains('ativo');
            
            // Fecha todos os outros itens para um efeito limpo
            document.querySelectorAll('.accordion-item').forEach(i => {
                i.classList.remove('ativo');
                i.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
            });
            
            if (!estaAtivo) {
                item.classList.add('ativo');
                header.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // 2. ACESSIBILIDADE: CONTROLE DE TAMANHO DE FONTE
    let tamanhoFonteAtual = 100; // em porcentagem
    const btnAumentar = document.getElementById('btn-aumentar-fonte');
    const btnDiminuir = document.getElementById('btn-diminuir-fonte');
    
    btnAumentar.addEventListener('click', () => {
        if (tamanhoFonteAtual < 140) {
            tamanhoFonteAtual += 10;
            document.documentElement.style.fontSize = `${tamanhoFonteAtual}%`;
        }
    });

    btnDiminuir.addEventListener('click', () => {
        if (tamanhoFonteAtual > 80) {
            tamanhoFonteAtual -= 10;
            document.documentElement.style.fontSize = `${tamanhoFonteAtual}%`;
        }
    });

    // 3. ACESSIBILIDADE: ALTERNAR MODO ESCURO / CLARO
    const btnModoEscuro = document.getElementById('btn-modo-escuro');
    btnModoEscuro.addEventListener('click', () => {
        document.body.classList.toggle('modo-escuro');
        const estaEscuro = document.body.classList.contains('modo-escuro');
        btnModoEscuro.textContent = estaEscuro ? 'Modo Claro' : 'Modo Escuro';
    });

    // 4. ACESSIBILIDADE: LEITURA POR VOZ (SPEECH SYNTHESIS API)
    const btnLerVoz = document.getElementById('btn-ler-voz');
    const btnPararVoz = document.getElementById('btn-parar-voz');
    let synth = window.speechSynthesis;
    let utterance = null;

    btnLerVoz.addEventListener('click', () => {
        // Cancela qualquer leitura em andamento antes de iniciar
        if (synth.speaking) {
            synth.cancel();
        }

        // Seleciona exclusivamente o conteúdo principal do artigo para leitura
        const conteudoParaLer = document.getElementById('conteudo-principal-leitura').innerText;
        
        utterance = new SpeechSynthesisUtterance(conteudoParaLer);
        utterance.lang = 'pt-BR';
        utterance.rate = 1.0; // velocidade normal

        utterance.onstart = () => {
            btnLerVoz.style.background = '#2a9d8f';
            btnLerVoz.textContent = 'Lendo... 🔊';
        };

        utterance.onend = () => {
            btnLerVoz.style.background = '';
            btnLerVoz.textContent = 'Leitura por Voz 🔊';
        };

        synth.speak(utterance);
    });

    btnPararVoz.addEventListener('click', () => {
        if (synth.speaking) {
            synth.cancel();
            btnLerVoz.style.background = '';
            btnLerVoz.textContent = 'Leitura por Voz 🔊';
        }
    });

    // 5. INTERAÇÃO: ENVIO DO FORMULÁRIO DE INSCRIÇÃO
    const formSeminario = document.getElementById('form-seminario');
    formSeminario.addEventListener('submit', (e) => {
        e.preventDefault();
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        
        alert(`Inscrição realizada com sucesso, ${nome}! Enviamos o link de acesso exclusivo do seminário para o e-mail: ${email}.`);
        formSeminario.reset();
    });

    // 6. INTERAÇÃO: ÁREA DE COMENTÁRIOS DO LEITOR
    const formComentario = document.getElementById('form-comentario');
    const listaComentarios = document.getElementById('lista-comentarios');
    const txtComentario = document.getElementById('texto-comentario');

    formComentario.addEventListener('submit', (e) => {
        e.preventDefault();
        const texto = txtComentario.value.trim();

        if (texto) {
            // Cria um novo elemento de comentário moderno
            const novoComentario = document.createElement('div');
            novoComentario.classList.add('comentario-item');
            
            // Define data e hora simples para simular ambiente real
            const dataAtual = new Date().toLocaleDateString('pt-BR');
            novoComentario.innerHTML = `<strong>Leitor AgroTech</strong> <span style="font-size:0.8rem; color:#6c757d;">- em ${dataAtual}</span><p style="margin-top:5px;">${texto}</p>`;
            
            // Insere no topo da lista
            listaComentarios.insertBefore(novoComentario, listaComentarios.firstChild);
            txtComentario.value = '';
        }
    });

    // Rola até o conteúdo principal ao clicar no CTA da Hero
    const heroCta = document.getElementById('hero-cta');
    heroCta.addEventListener('click', () => {
        document.getElementById('conteudo-principal-leitura').scrollIntoView({ behavior: 'smooth' });
    });
});



































