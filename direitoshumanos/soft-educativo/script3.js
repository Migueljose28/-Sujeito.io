const sujeito = document.querySelector('.sujeito')
const player = document.querySelector('.player')
const perguntas = [
  
  {
    pergunta: 'Vemos que toda cidade é uma espécie de comunidade, e toda comunidade se forma com vistas a algum bem, pois todas as ações de todos os homens são praticadas com vistas ao que lhe parece um bem; todas as comunidades visam algum bem, é evidente que a mais importante de todas elas e que inclui todas as outras tem mais que todas este objetivo e visa ao mais importante de todos os bens. <br>No fragmento, Aristóteles promove uma reflexão que associa dois elementos essenciais à discussão sobre a vida em comunidade, a saber:',
    alternativas: ["A) Ética e política, pois conduzem à eudaimonia.", "B) Retórica e linguagem, pois cuidam dos discursos na ágora.", "C) Metafísica e ontologia, pois tratam da filosofia primeira.", "D)Democracia e sociedade, pois se referem a relações sociais."],
    respostaCorreta: "A) Ética e política, pois conduzem à eudaimonia."
  },
  {
    pergunta: ' sociedade como um sistema justo de cooperação social consiste em uma das ideias familiares fundamentais, que dá estrutura e organização à justiça como equidade. A cooperação social guia-se por regras e procedimentos publicamente reconhecidos e aceitos por aqueles que cooperam como sendo apropriados para regular a sua conduta. Diz-se que a cooperação é justa porque seus termos são tais que todos os participantes podem razoavelmente aceitar, desde que todos os demais também o aceitem. FERES JR. J, POGREBINSCH1, T. Teoria politica contemporânea uma introdução. Rio de Janeiro: Elsevier, 2010. <br> No contexto do pensamento político, a ideia apresentada mostra-se consoante o(a)',
    alternativas: ["A) ideal republicano de governo.", "B) corrente tripartite dos poderes.", "C) posicionamento critico do socialismo.", "D) entendimento do contratualismo moderno. "],
    respostaCorreta: "D) entendimento do contratualismo moderno. "
  },
  {
    pergunta: 'Sobre direitos humanos, a frase "Atitudes que levam ao respeito integral da dignidade humana, evitando sofrimentos." representa:',
    alternativas: ["A) Concepção contemporânea", "B) direitos", "C) Convenções internacionais", "D) Características"],
    respostaCorreta: "A) Concepção contemporânea"
  },
  {
    pergunta: 'Sobre direitos humanos, a frase "Vida, liberdade, igualdade e segurança pessoal." representa:',
    alternativas: ["A) Concepção contemporânea", "B) direitos", "C) Convenções internacionais", "D) Características"],
    respostaCorreta: "B) direitos"
  },
  {
    pergunta: 'A característica de geração individualista se refere a qual geração?',
    alternativas: ["A) Direitos humanos de primeira geração(liberdade).", "B) Direitos humanos de segunda geração(Igualdade)", "C) Direitos humanos de terceira geração(fraternidade)"],
    respostaCorreta: "A) Direitos humanos de primeira geração(liberdade)."
  },
];
let indexPerguntaAtual = 0;
const temporizador = 30; 
let tempo = temporizador;
let vida1 = 100;
let vida2 = 100;
let numeroPergunta = 1;
let respostasCorretas = 0;
let quizFinalizado = false;


function exibirPergunta() {
  const perguntaAtual = perguntas[indexPerguntaAtual];
  document.getElementById('pergunta-titulo').textContent = "Questão " + numeroPergunta;
  document.getElementById('pergunta-texto').innerHTML = perguntaAtual.pergunta;

  const listaAlternativas = document.getElementById('alternativas-lista');
  listaAlternativas.innerHTML = "";

  perguntaAtual.alternativas.forEach((alternativa, index) => {
    const button = document.createElement('button');
    button.className = 'alternativa';
    button.textContent = alternativa;
    button.onclick = (function(alternativaClicada) {
      return function() {
        verificarResposta(alternativaClicada);
      };
    })(alternativa);

    listaAlternativas.appendChild(button);
  });
}

function atualizarContador() {
  tempo--;
  if (tempo >= 0) {
    const segundos = tempo % 60;
    const minutos = Math.floor(tempo / 60);
    document.getElementById('conta-regressiva').textContent = minutos.toString().padStart(2, '0') + ':' + segundos.toString().padStart(2, '0');
  } else {
    clearInterval(timer);
    if (!quizFinalizado) {
      desabilitarBotoesAlternativas();
      mostrarMensagemPerdeu();
    }
  }
}

const timer = setInterval(atualizarContador, 1000);
atualizarContador();

function desabilitarBotoesAlternativas() {
  const botoesAlternativas = document.querySelectorAll('.alternativa');
  botoesAlternativas.forEach(botao => {
    botao.disabled = true;
  });
}



function verificarResposta(resposta) {
  const perguntaAtual = perguntas[indexPerguntaAtual];
  if (resposta === perguntaAtual.respostaCorreta) {
    vida2 -= 20;
    sujeito.src = 'imagem/sujeito-ataque .gif';
    player.src = 'imagem/biadano2,0.gif';

  } else if (resposta !== 'tempo_esgotado' && !quizFinalizado){
    vida1 -= 20;
    player.src = 'imagem/biaataque.gif';
    sujeito.src = 'imagem/SUJEITODANO.gif';
  }

  if (tempo < 0) {
    // Tempo expirado, não permitir resposta
    return;
  }

  indexPerguntaAtual++;
  numeroPergunta++;

  if (indexPerguntaAtual < perguntas.length) {
    exibirPergunta();
    resetarTempo();
  } else {
    clearInterval(timer);
    quizFinalizado = true;
    exibirMensagemFinal();
  }

  atualizarVida();
  atualizarRespostasCorretas();
  if (indexPerguntaAtual === perguntas.length) {
    exibirMensagemFinal();
   
  }
}

function resetarTempo() {
  tempo = temporizador;
}

function atualizarRespostasCorretas() {
    
}

function atualizarVida() {
  vida1 = Math.max(0, Math.min(vida1, 100));
  vida2 = Math.max(0, Math.min(vida2, 100));

  document.getElementById('barraVida1').value = vida1;
  document.getElementById('barraVida2').value = vida2;
}

function exibirMensagemFinal() {
  let mensagem = "";

  if (vida1 > vida2) {
    mensagem = "Você ganhou!";
    
  } else if (vida1 < vida2) {
    mensagem = "Você perdeu!";
  } else {
    mensagem = "Deu empate!";
  }

  document.getElementById('contingencia').textContent = mensagem;
}

function mostrarMensagemPerdeu() {
  document.getElementById('mensagem-perdeu').style.display = 'block';
  
}

exibirPergunta();
