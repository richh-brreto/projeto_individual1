let indiceAtual = 0;

let perguntas = [];
function buscarPerguntas() {
    fetch('/perguntas/buscarPerguntas')
        .then(response => response.json())
        .then(data => {
            perguntas = data;
            console.log('Perguntas recebidas:', data);

            questaoExibida.innerHTML = `${perguntas[indiceAtual].pergunta}`

            
        })
        .catch(error => console.error('Erro ao buscar perguntas:', error));
}

// confirmar resposta
function continuar() {
    const respostaInput = ipt_resposta.value.toUpperCase();
    const perguntaRespondida = perguntas[indiceAtual - 1];
    const perguntaId = perguntaRespondida ? perguntaRespondida.id : null;

    if (respostaInput == '') {
        alert(`PREENCHA UMA RESPOSTA ANTES CARAI`)
    } else {
        indiceAtual++;
        buscarPerguntas();
        guardarRespostas();
    };

    if (indiceAtual == perguntas.length) {

        questaoExibida.innerHTML = `Questionário concluido! <br> Redirecionando para a Dashboard.`

        setTimeout(function () {
            window.location.href = "dashboard/cards.html";
        }, 2000);
    }
};

let respostas = [];
function guardarRespostas() {
    // Pega a resposta do input
    const resposta = ipt_resposta.value.toUpperCase();
    // Pega o id da pergunta respondida (índice anterior ao incremento)
    const perguntaRespondida = perguntas[indiceAtual - 1];
    const perguntaId = perguntaRespondida ? perguntaRespondida.id : null;

    console.log('Enviando resposta:', resposta, 'para perguntaId:', perguntaId);

    fetch('/respostas/guardarRespostas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            resposta: resposta,
            perguntaId: perguntaId
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Resposta salva:', data);
    })
    .catch(error => console.error('Erro ao guardar resposta:', error));
}

window.onload = buscarPerguntas();