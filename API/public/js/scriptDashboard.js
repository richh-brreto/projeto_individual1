bemVindo.innerHTML = `Olá, ${sessionStorage.NOME_USUARIO}`;

let idUsuario = localStorage.getItem('idUsuario');

function obterDadosGrafico(idUsuario) {
    fetch(`/respostas/puxarRespostas/${idUsuario}`, { cache: 'no-store' })
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.log(`Dados do usuário recebidos: ${JSON.stringify(resposta)}`);

                    console.log('Respostas puxadas do usuário: ', resposta)
                    resposta.reverse();
                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
};

function obterDadosGlobaisDoQuiz() {
    fetch('/respostas/puxarTodasRespostasComPergunta', { cache: 'no-store' })
        .then(res => res.json())
        .then(dados => {
            console.log("Todas as respostas recebidas:", dados);
            processarRespostasGlobais(dados);
        })
        .catch(erro => {
            console.error("Erro ao obter respostas globais:", erro.message);
        });
}

function processarRespostasGlobais(respostas) {
    const respostasPergunta = {};

    for (let i = 0; i < respostas.length; i++) {
        const resposta = respostas[i];
        const idPergunta = resposta.fk_pergunta;

        if (!respostasPergunta[idPergunta]) {
            respostasPergunta[idPergunta] = [];
        }

        respostasPergunta[idPergunta].push(resposta.resposta);
    }

    console.log("Respostas agrupadas por pergunta:", respostasPergunta);

    plotarGraficoMusicas(respostasPergunta[1]);
    plotarGraficoFrequencia(respostasPergunta[3]);
    plotarGraficoTema(respostasPergunta[4]);
    // plotarGraficoModoEscuta(respostasPergunta[2]);
    // etc.
}

function plotarGraficoMusicas(respostas) {
    const musicas = [
        "Wesleys Theory", "For Free?", "King Kunta", "Institutionalized",
        "These Walls", "U", "Alright", "For Sale?", "Momma", "Hood Politics",
        "How Much a Dollar Cost", "Complexion", "The Blacker The Berry",
        "You Aint Gotta Lie", "I", "Mortal Man"
    ];

    const contagemMusicas = Array(musicas.length).fill(0);

    for (let i = 0; i < respostas.length; i++) {
        const resposta = respostas[i];
        const index = musicas.indexOf(resposta);
        if (index !== -1) {
            contagemMusicas[index]++;
        }
    }

    new Chart(document.getElementById('graficoFaixaGlobal'), {
        type: 'bar',
        data: {
            labels: musicas,
            datasets: [{
                label: 'Músicas favoritas (todos usuários)',
                data: contagemMusicas,
                backgroundColor: '#1b2f8c'
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Música mais escolhida pelos usuários',
                }
            },
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

function plotarGraficoFrequencia(respostas) {
    const frequencias = [
        "Entre 1 e 3 vezes", "Entre 3 e 7 vezes", "Entre 7 e 12 vezes", "Mais de 12 vezes"
    ];

    const contagemFrequencias = Array(frequencias.length).fill(0);

    for (let i = 0; i < respostas.length; i++) {
        const resposta = respostas[i];
        const index = frequencias.indexOf(resposta);
        if (index !== -1) {
            contagemFrequencias[index]++;
        }
    }

    new Chart(document.getElementById('graficoFrequenciaGlobal'), {
        type: 'doughnut',
        data: {
            labels: frequencias,
            datasets: [{
                label: 'Vezes ouvidas (todos usuários)',
                data: contagemFrequencias,
                backgroundColor: ['darkseagreen', 'darkorange', 'crimson', 'cornflowerblue'],
                borderColor: ['white'],
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Quantas vezes os usuários já ouviram o álbum',
                },
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }   
                    }
                }
            }
        }
    });
}

function plotarGraficoTema(respostas) {
    const temas = [
        "Racismo Estrutural", "Autoestima", "Espiritualidade", "Auto-conhecimento"
    ]

    const contagemTemas = Array(temas.length).fill(0);

    for (let i = 0; i < respostas.length; i++) {
        const resposta = respostas[i];
        const index = temas.indexOf(resposta);
        if (index !== -1) {
            contagemTemas[index]++;
        }
    }

    new Chart(document.getElementById('graficoTemaGlobal'), {
        type: 'bar',
        data: {
            labels: temas,
            datasets: [{
                label: 'Temas favoritos (todos usuários)',
                data: contagemTemas,
                backgroundColor: 'darksalmon'
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Tema mais escolhido pelos usuários'
                },
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        }
    });
}

function carregarIndicadores() {
    fetch(`/respostas/puxarRespostas/${idUsuario}`, { cache: 'no-store' })
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.log(`Dados recebidos para indicadores: ${JSON.stringify(resposta)}`);

                    console.log('1', resposta[1].resposta);
                    console.log('2', resposta[2].resposta);
                    console.log('3', resposta[3].resposta);
                    console.log('4', resposta[4].resposta);
                    console.log('5', resposta[5].resposta);

                    musicaFav.innerHTML = `Sua música favorita: ${resposta[0].resposta}`;
                    temaImpacto.innerHTML = `Tema que mais te impactou: ${resposta[3].resposta}`;
                    if (resposta[2].resposta == "Entre 1 e 3 vezes") {
                        nivelFa.innerHTML = `Você é um fã: Nivel Baixo `;
                    } else if (resposta[2].resposta == "Entre 3 e 7 vezes") {
                        nivelFa.innerHTML = `Você é um fã: Nivel Médio`;
                    } else if (resposta[2].resposta == "Entre 7 e 12 vezes") {
                        nivelFa.innerHTML = `Você é um fã: Nivel Alto`;
                    } else if(resposta[2].resposta == "Mais de 12 vezes") {
                        nivelFa.innerHTML = `Você é um fã: Nivel KDOT`;
                    }

                    
                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}