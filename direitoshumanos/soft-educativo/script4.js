const sujeito = document.querySelector('.sujeito')
const player = document.querySelector('.player')
const perguntas = [
  {
    pergunta: 'Há sujeito indeterminado em:',
    alternativas: ["Não deve haver problemas com a sua contratação.", "Precisa-se de mais computadores no escritório.", "Dê-se ciência às partes da decisão.", "Alugam-se apartamentos."," É preciso entrar com novo recurso."],
    respostaCorreta: "Precisa-se de mais computadores no escritório."
  },
  {
    pergunta: 'Identifique a alternativa em que o verbo destacado não é de ligação:',
    alternativas: ["A criança estava com fome.", "Pedro parece adoentado.", "Ele tem andado confuso.", "Ficou em casa o dia todo.", "Objeto indireto"],
    respostaCorreta: "Ficou em casa o dia todo."
  },
  {
    pergunta: 'Assinale a alternativa em que o verbo é transitivo direto.',
    alternativas: ["Comprei um terreno e construí a casa.", "Os guerreiros dormem agora.", "O cego não vê.", "João parece zangado."],
    respostaCorreta: "Comprei um terreno e construí a casa."
  },
  {
    pergunta: 'Indique a alternativa em que o verbo é transitivo indireto.',
    alternativas: ["Cumpri com as expectativas.", "Concordo com ele.", "Amar a Deus.", "Agradeceu a ajuda ao colega."],
    respostaCorreta: "Concordo com ele."
  },
  {
    pergunta: 'Em qual das alternativas o complemento em destaque é objeto direto?',
    alternativas: ["Informei-lhes os resultados.", "Informei-os aos presentes.", "Cumpri com o prometido.", "Aos meus filhos, dedico-lhes o meu tempo livre.", "Tinha carência de afeto"],
    respostaCorreta: "Informei-os aos presentes."
  },
  {
    pergunta: 'Na oração “Dei a notícia de manhã.”, o verbo é:',
    alternativas: ["transitivo direto e indireto.", "intransitivo.", "transitivo indireto.", "transitivo direto."],
    respostaCorreta: "transitivo direto."
  },
  {
    pergunta: 'Indique a alternativa em que o verbo é transitivo direto.',
    alternativas: ["O pai emprestou o carro ao filho.", "O velhinho caiu ontem.", "Queimou todas as provas.", "Acredito nele."],
    respostaCorreta: "Queimou todas as provas."
  },
  {
    pergunta: '“Usando do direito que lhe confere a Constituição”, as palavras sublinhadas exercem a função, respectivamente, de:',
    alternativas: ["objeto direto e objeto direto", "sujeito e objeto indireto", "objeto indireto e sujeito", "objeto direto e objeto indireto"],
    respostaCorreta: "objeto direto e objeto indireto"
  },
  {
    pergunta: 'Em “Se *descobrissem* a desmoralização que *reina* dentro de mim”, temos, respectivamente, verbos:',
    alternativas: ["transitivo direto e transitivo indireto.", "transitivo direto e de ligação.", "transitivo indireto e intransitivo.", "transitivo indireto e intransitivo."],
    respostaCorreta: "transitivo indireto e intransitivo."
  },
  {
    pergunta: 'Identifique a oração em que TODOS os termos em destaque são adjuntos adnominais.',
    alternativas: [" Infelizmente, estamos atrasados.", "A casa azul da esquina foi vendida.", "Desejou que um forte raio atingisse a sua terrível cabeça.", "Telefonemas de clientes insatisfeitos são complicados."],
    respostaCorreta: "Desejou que um forte raio atingisse a sua terrível cabeça."
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
    vida2 -= 10;
    sujeito.src = 'imagem/sujeito-ataque .gif';
    player.src = 'imagem/biadano2,0.gif';

  } else if (resposta !== 'tempo_esgotado' && !quizFinalizado){
    vida1 -= 10;
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
