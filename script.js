// CONFIGURAÇÃO DO TIMER (5 minutos)
const TEMPO_TOTAL = 5 * 60; // 5 minutos em segundos
let tempoRestante = TEMPO_TOTAL;
let timerAtivo = true; // Controla se o usuário ainda pode usar

// BANCO DE DADOS DE PROMPTS
const prompts = {
    youtube: {
        roteiro: "Escreva um roteiro de 10 minutos para YouTube sobre [TEMA]. Inclua um hook impactante nos primeiros 15 segundos, pelo menos 3 tópicos principais com exemplos práticos e uma call-to-action clara para inscrições e likes.",
        ideia: "Gere 5 ideias virais para vídeos do YouTube no nicho de [NICHO]. As ideias devem ser polêmicas, úteis ou emocionais para maximizar o engajamento."
    },
    tiktok: {
        roteiro: "Crie um roteiro para um vídeo de TikTok de 45 segundos sobre [TEMA]. Use um tom energético, inclua pelo menos 2 transições criativas e uma legenda engajadora com hashtags relevantes.",
        ideia: "Liste 3 tendências atuais do TikTok que podem ser aplicadas ao nicho de [NICHO]. Explique como adaptar cada uma."
    },
    terror: {
        roteiro: "Escreva um roteiro de 5 minutos para um vídeo de terror sobre [TEMA]. Use suspense crescente, elementos sombrios e um final chocante. Inclua descrições de sons ambientes e efeitos visuais.",
        ideia: "Gere 3 ideias de histórias de terror baseadas em lendas urbanas modernas envolvendo tecnologia ou vida urbana."
    },
    marketing: {
        email: "Escreva um email de vendas para promover [PRODUTO/SERVIÇO]. Use o método AIDA (Atenção, Interesse, Desejo, Ação) e inclua um call-to-action urgente. Destaque os benefícios, não apenas as features.",
        post: "Crie uma copy para post de Instagram que promova [PRODUTO/SERVIÇO] com foco em benefícios emocionais e uma oferta irresistível. Inclua sugestão de legenda e hashtags."
    }
};

// FUNÇÃO PRINCIPAL DO TIMER
function iniciarTimer() {
    const timerInterval = setInterval(() => {
        tempoRestante--; // Diminui 1 segundo
        atualizarContador(); // Atualiza o display

        if (tempoRestante <= 0) {
            clearInterval(timerInterval); // Para o timer
            timerAtivo = false; // Bloqueia a ferramenta
            redirecionarParaPagamento(); // Leva para a página de pagamento
        }
    }, 1000); // Roda a cada 1000ms (1 segundo)
}

// ATUALIZA O CONTADOR NA TELA
function atualizarContador() {
    const minutos = Math.floor(tempoRestante / 60);
    const segundos = tempoRestante % 60;
    document.getElementById('contador').textContent = 
        `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}

// REDIRECIONA PARA A PÁGINA DE PAGAMENTO
function redirecionarParaPagamento() {
    // Mostra um alerta antes de redirecionar
    if(confirm('⏰ Seu trial de 5 minutos acabou! Para continuar usando sem limites, você precisa comprar o acesso ilimitado. Deseja ser redirecionado agora?')) {
        window.location.href = 'https://pay.kiwify.com.br/z3nIxFy'; // SEU LINK DE PAGAMENTO
    }
}

// FUNÇÃO PARA GERAR O PROMPT
function gerarPrompt() {
    if (!timerAtivo) {
        alert('Seu tempo acabou! 😢 Adquira o acesso ilimitado para continuar usando.');
        return;
    }

    const nicho = document.getElementById('nichos').value;
    const tipo = document.getElementById('tipoConteudo').value;
    
    if (!nicho || !tipo) {
        alert('Por favor, selecione um nicho e um tipo de conteúdo.');
        return;
    }

    const promptGerado = prompts[nicho]?.[tipo] || "Desculpe, não encontrei um prompt para esta combinação. Tente outra!";
    document.getElementById('resultadoPrompt').value = promptGerado;
}

// FUNÇÃO PARA COPIAR O PROMPT
function copiarPrompt() {
    const texto = document.getElementById('resultadoPrompt');
    texto.select();
    document.execCommand('copy');
    alert('✅ Prompt copiado para a área de transferência!');
}

// INICIA O TIMER QUANDO A PÁGINA CARREGA
window.onload = function() {
    iniciarTimer();
    atualizarContador(); // Mostra o timer correto logo de início
};
