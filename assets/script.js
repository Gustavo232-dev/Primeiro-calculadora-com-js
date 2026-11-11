const visor = document.getElementById("visor");
const listaHistorico = document.getElementById("listaHistorico");
const listaRanking = document.getElementById("listaRanking");

let historicoOperacoes = [];
let rankingResultados = [];

function atualizarHistorico(expressao, resultado) {
    const itemTexto = `${expressao} = ${resultado}`;
    historicoOperacoes.unshift(itemTexto); 

    if (historicoOperacoes.length > 10) {
        historicoOperacoes.pop(); 
    }

    listaHistorico.innerHTML = "";
    historicoOperacoes.forEach(function(op) {
        const li = document.createElement("li");
        li.textContent = op;
        listaHistorico.appendChild(li);
    });
}

function atualizarRanking(resultado) {
    rankingResultados.push(resultado);
    rankingResultados.sort(function(a, b) {
        return b - a; 
    });

    if (rankingResultados.length > 10) {
        rankingResultados.pop(); 
    }

    listaRanking.innerHTML = "";
    rankingResultados.forEach(function(res) {
        const li = document.createElement("li");
        li.textContent = res;
        listaRanking.appendChild(li);
    });
}

window.criarBotoes({
    areaBotoes: document.getElementById("botoes"),
    visor,
    calcular: window.calcular,
    atualizarHistorico,
    atualizarRanking
});