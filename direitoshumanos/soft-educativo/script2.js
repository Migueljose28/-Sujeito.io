const sujeito = document.querySelector('.sujeito')
const player = document.querySelector('.player')
const perguntas = [
  
  {
    pergunta: 'Em suas obras, Montesquieu escreveu sobre a repartição dos poderes de um Estado em três. Qual dos listados abaixo corresponde a sua teoria?',
    alternativas: ["a) Poder Executivo, responsável pela implementação das leis e administração do governo.", "b) Poder Judiciário, responsável por implementar as leis e utilizar o orçamento público para validar as leis criadas pelo executivo.", "c) Poder Judiciário, responsável pela aplicação das leis e fiscalização do legislativo.","d) Poder Legislativo, responsável pela criação e aplicação das leis na esfera jurídica."],
    respostaCorreta: "a) Poder Executivo, responsável pela implementação das leis e administração do governo."
  },
  {
    pergunta: 'Sobre a obra “O Príncipe”, de Maquiavel, assinale o que for INCORRETO:',
    alternativas: ["a) A obra foi escrita com o intuito de presentear Lourenço de Médici e serviria como um manual, contendo teorias e embasamentos históricos sobre como um príncipe deveria comandar.", "b) Maquiavel define “virtù” como sendo o conjunto de qualidades que um príncipe deve possuir para se manter no poder.", "c) É importante, ao analisar os escritos de Maquiavel, ter a ciência de que seus escritos tinham como endereço um príncipe. Portanto, as atitudes necessárias apresentadas não eram aconselhadas para qualquer pessoa de um reino.", "d) Para Maquiavel, as ações que um príncipe deve ter para manter-e no trono são equivalentes às ações de um cristão que deseja alcançar o reino dos céus."],
    respostaCorreta: "d) Para Maquiavel, as ações que um príncipe deve ter para manter-e no trono são equivalentes às ações de um cristão que deseja alcançar o reino dos céus."
  },
  {
    
    pergunta: 'Segundo Aristóteles, qual é a principal função de um governo?',
    alternativas: ["a) Garantir o poder e hegemonia das famílias nobres e tradicionais daquele local.", "b) Promover as virtudes dos cidadãos e garantir o bem comum nas tomadas de decisão.", "c) Fortalecer o exército do reino, no intuito de garantir a integridade física dos cidadãos.", "d) Validar a Filosofia e o debate de ideias enquanto bases educacionais das escolas de seus reinos, para preparar todos os habitantes desde a infância para a vida em sociedade."],
    respostaCorreta: "c) Fortalecer o exército do reino, no intuito de garantir a integridade física dos cidadãos."
  },
  {
    pergunta: 'Polemizando contra a tradicional tese aristotélica, que via na sociedade o resultado de um instinto primordial, Hobbes sustenta que no gênero humano, diferentemente do animal, não existe sociabilidade instintiva. Entre os indivíduos não existe um amor natural, mas somente uma explosiva mistura de temor e necessidade recíprocos que, se não fosse disciplinada pelo Estado, originaria uma incontrolável sucessão de violências e excessos. <br> Referente à constituição da sociedade civil, considere, respectivamente, o correto posicionamento de Aristóteles e Hobbes:',
    alternativas: ["A)Instrumento artificial para a realização da justiça e forma de legitimação do exercício da coerção e da violência", "B)Realização das disposições naturais do homem e artifício necessário para frear a natureza humana.", "C) Resultado involuntário da ação de cada indivíduo e anulação dos impulsos originários presentes na natureza humana."],
    respostaCorreta: "B)Realização das disposições naturais do homem e artifício necessário para frear a natureza humana."
  },
  {
    pergunta: 'O fim último, causa final e desígnio dos homens, ao introduzir uma restrição sobre si mesmos sob a qual os vemos viver nos Estados, é o cuidado com sua própria conservação e com uma vida mais satisfeita; quer dizer, o desejo de sair da mísera condição de guerra que é a consequência necessária das paixões naturais dos homens, como o orgulho, a vingança e coisas semelhantes. É necessário um poder visível capaz de mantê-los em respeito, forçandoos, por medo do castigo, ao cumprimento de seus pactos e ao respeito às leis, que são contrárias a nossas paixões naturais. HOBBES, T. M. Leviatã. São Paulo: Nova Cultural, 1999 (adaptado). <br>Para o autor, o surgimento do estado civil estabelece as condições para o ser humano',
    alternativas: ["A) internalizar os princípios morais, objetivando a satisfação da vontade individual.", "B) aderir à organização política, almejando o estabelecimento do despotismo.", "C) aprofundar sua religiosidade, contribuindo para o fortalecimento da Igreja.", "D)Obter a situação de paz, com a garantia legal do seu bem-estar."],
    respostaCorreta: "D)Obter a situação de paz, com a garantia legal do seu bem-estar."
  }

];
let indexPerguntaAtual = 0;
const temporizador = 50; 
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
    player.src = 'imagem/luffydano.gif';

  } else if (resposta !== 'tempo_esgotado' && !quizFinalizado){
    vida1 -= 20;
    player.src = 'imagem/luffy ataque.gif';
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


