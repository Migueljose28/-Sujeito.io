  const sujeito = document.querySelector('.sujeito')
  const player = document.querySelector('.player')
  const perguntas = [
    {
      pergunta: 'Nasce daqui uma questão: se vale mais ser amado que temido ou temido que amado. Responde-se que ambas as coisas seriam de desejar; mas porque é difícil juntá-las, é muito mais seguro ser temido que amado, quando haja de faltar uma das duas. Porque dos homens se pode dizer, duma maneira geral, que são ingratos, volúveis, simuladores, covardes e ávidos de lucro, e enquanto lhes fazes bem são inteiramente teus, oferecem-te o sangue, os bens, a vida e os filhos, quando, como acima disse, o perigo está longe; mas quando ele chega, revoltam-se. <br> A partir da análise histórica do comportamento humano em suas relações sociais e políticas, Maquiavel define o homem como um ser:',
      alternativas: ["a) munido de virtude, com disposição nata a praticar o bem a si e aos outros.", "b) possuidor de fortuna, valendo-se de riquezas para alcançar êxito na política.", "c) guiado por interesses, de modo que suas ações são imprevisíveis e inconstantes."],
      respostaCorreta: "c) guiado por interesses, de modo que suas ações são imprevisíveis e inconstantes."
    },
    {
      pergunta: 'No itinerário histórico-cultural ocidental de estruturação do pensamento filosófico-político sobre a origem e fundamento do Estado e da sociedade política, encontra-se o modelo de pensamento contratualista (jusnaturalista), tendo em Hobbes, Locke e Rousseau filósofos relevantes na discussão dos elementos estruturais deste modelo. Segundo Norberto Bobbio, este modelo é “construído com base na grande dicotomia ‘estado (ou sociedade) de natureza/estado (ou sociedade) civil’”, e contém “elementos caracterizadores” deste modelo. <br> Com base no texto, assinale a alternativa INCORRETA.',
      alternativas: ["a) Na concepção política de HOBBES, o estado de natureza é tido como um estado de guerra generalizada, de todos contra todos.", "b) Na concepção política de Aristóteles, o homem é, por natureza, um ser insociável e apolítico.", "c) Na concepção política de HOBBES, o poder soberano que resulta do pacto de união, por ser soberano, tem como atributos fundamentais ser um poder absoluto, indivisível e irrevogável.", "d) naturalmente racional, vivendo em um estado pré-social e portando seus direitos naturais."],
      respostaCorreta: "b) Na concepção política de Aristóteles, o homem é, por natureza, um ser insociável e apolítico."
    },
    {
      pergunta: 'Para Aristóteles, o melhor regime político <br>seria:',
      alternativas: ["a) A democracia, onde todos poderiam opinar e participar das decisões tomadas.", "b) A monarquia, pois dessa maneira o comandante seria alguém que desde sua infância seria ensinado a como governar e assim estaria melhor preparado para tal cargo.", "c) O anarquismo, considerando a importância de se desenvolver uma sociedade sem classes e hierarquias.", "d) A aristocracia, pois segundo o filósofo, os aristocratas pensavam no bem comum e, portanto, seriam os mais aptos a comandarem um reino ou nação."],
      respostaCorreta: "d) A aristocracia, pois segundo o filósofo, os aristocratas pensavam no bem comum e, portanto, seriam os mais aptos a comandarem um reino ou nação."
    },
    {
      pergunta: 'Filósofo conhecido por sua teoria do contrato social, segundo a qual as pessoas renunciam a certos direitos naturais em troca de proteção e segurança por parte do Estado?',
      alternativas: ["a) Karl Marx, ao afirmar que a constituição uma sociedade pautada em classes sociais acaba por ser a melhor forma de organização social.", "b) Friedrich Nietzsche, ao propor a ideia do “além-do-homem”.", "c) John Locke, quando defende que o direito a propriedade é algo inalienável, tal como a vida, liberdade e propriedade, e que o governo deve proteger esses direitos.", "d) Jean-Paul Sartre, existencialista, que apresentou a teoria de que a existência precede a essência."],
      respostaCorreta: "c) John Locke, quando defende que o direito a propriedade é algo inalienável, tal como a vida, liberdade e propriedade, e que o governo deve proteger esses direitos."
    },
    {
      pergunta: 'Segundo qual filósofo o Estado deveria possuir o monopólio legítimo da violência?',
      alternativas: ["a) Thomas Hobbes.", "b) John Locke.", "c) Jean-Jacques Rousseau.", "d) Immanuel Kant."],
      respostaCorreta: "a) Thomas Hobbes."
    }
  ];
  let indexPerguntaAtual = 0;
  const temporizador = 60; 
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
  }}

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
      player.src = 'imagem/zorodano.gif';
      

    } else if (resposta !== 'tempo_esgotado' && !quizFinalizado){
      vida1 -= 20;
      sujeito.src = 'imagem/SUJEITODANO.gif';
      player.src = 'imagem/zoroATAQUE.gif';
      
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
  if(vida1 > vida2){
    document.getElementById('mensagemdeavanço').style.display = 'block';

  }

  function mostrarMensagemPerdeu() {
    document.getElementById('mensagem-perdeu').style.display = 'block';
  }

  
  exibirPergunta();