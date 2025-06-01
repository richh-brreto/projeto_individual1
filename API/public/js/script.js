let indiceAtual = 0;
let perguntas = [];

const alternativas = [
    ["Wesleys Theory", "For Free?", "King Kunta", "Institutionalized", "These Walls", "U", "Alright", "For Sale?", "Momma", "Hood Politics", "How Much a Dollar Cost", "Complexion", "The Blacker The Berry", "You Aint Gotta Lie", "I", "Mortal Man"],
    ["Ouço o álbum inteiro", "Ouço minhas músicas favoritas"],
    ["Entre 1 e 3 vezes", "Entre 3 e 7 vezes", "Entre 7 e 12 vezes", "Mais de 12 vezes"],
    ["Racismo Estrutural", "Autoestima", "Espiritualidade", "Auto-conhecimento"],
    ["Sim", "Não", "Já ouvi com amigos"],
    ["Diariamente", "Algumas vezes por semana", "Raramente"]
];

function buscarPerguntas() {
    fetch('/perguntas/buscarPerguntas')
        .then(response => response.json())
        .then(data => {
            perguntas = data;
            console.log('Perguntas recebidas:', data);

            questaoExibida.innerHTML = `${perguntas[indiceAtual].pergunta}`

            mostrarPergunta();
        })
        .catch(error => console.error('Erro ao buscar perguntas:', error));
}

function mostrarPergunta() {
    if (indiceAtual >= perguntas.length) return;

    const questao = perguntas[indiceAtual];
    questaoExibida.innerHTML = questao.pergunta;

    const select = document.getElementById('ipt_resposta');
    select.innerHTML = `<option value="" disabled selected>Escolha aqui sua resposta</option>`;
    alternativas[indiceAtual].forEach(alt => {
        select.innerHTML += `<option value="${alt}">${alt}</option>`;
    });
}

let confirmou = false;
function continuar() {
    indiceAtual++;
    if (confirmou) {
        if (indiceAtual < perguntas.length) {
            mostrarPergunta();
            confirmou = false;
        } else {
            questaoExibida.innerHTML = `Questionário concluído!<br>Redirecionando para o Login.`;
            document.getElementById('ipt_resposta').style.display = 'none';
            setTimeout(function () {
                window.location.href = "login.html";
            }, 2000);
        }
    } else {
        alert('Confirme uma resposta antes!')
        return;
    }
    confirmou = false;
}

let idUsuario = localStorage.getItem('idUsuario');
function confirmar() {
    let resposta = ipt_resposta.value;

    if (!resposta) {
        alert('Selecione uma resposta antes!');
        return;
    } else {
        confirmou = true;

        guardarRespostas();
    }
}

let respostas = [];
function guardarRespostas() {
    const resposta = ipt_resposta.value.trim();

    console.log('Enviando resposta:', resposta);

    fetch('/respostas/guardarRespostas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            resposta: resposta,
            indiceAtual: indiceAtual,
            idUsuario: idUsuario
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Resposta salva:', data);
        })
        .catch(error => console.error('Erro ao guardar resposta:', error));
}