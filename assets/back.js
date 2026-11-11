const botoes = [
    "7", "8", "9", "÷",
    "4", "5", "6", "×",
    "1", "2", "3", "−",
    "0", ".", "⌫", "+",
    "C", "="
];

const areaBotoes = document.getElementById("botoes");
const visor = document.getElementById("visor");
const listaHistorico = document.getElementById("listaHistorico");
const listaRanking = document.getElementById("listaRanking");

let resultadoExibido = false;
let historicoOperacoes = [];
let rankingResultados = [];

function calcular(expressao) {
    expressao = expressao
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/−/g, "-");

    const partes = expressao.match(/\d+(?:\.\d+)?|[+\-*/]/g);

    if (!partes || partes.join("") !== expressao) {
        throw new Error("Expressão inválida");
    }

    if (
        partes.length % 2 === 0 ||
        partes.some((item, i) =>
            i % 2 === 0
                ? !/^\d/.test(item)
                : !["+", "-", "*", "/"].includes(item)
        )
    ) {
        throw new Error("Expressão inválida");
    }

    for (let i = 1; i < partes.length; ) {
        if (partes[i] === "*" || partes[i] === "/") {
            const esquerda = Number(partes[i - 1]);
            const direita = Number(partes[i + 1]);

            if (partes[i] === "/" && direita === 0) {
                throw new Error("Não é possível dividir por zero");
            }

            const resultado = partes[i] === "*"
                ? esquerda * direita
                : esquerda / direita;

            partes.splice(i - 1, 3, String(resultado));
            i = 1;
        } else {
            i += 2;
        }
    }

    let resultado = Number(partes[0]);

    for (let i = 1; i < partes.length; i += 2) {
        const numero = Number(partes[i + 1]);

        if (partes[i] === "+") {
            resultado += numero;
        } else {
            resultado -= numero;
        }
    }

    if (!Number.isFinite(resultado)) {
        throw new Error("Resultado inválido");
    }

    return resultado;
}

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

botoes.forEach(function(valor) {
    const botao = document.createElement("button");
    botao.textContent = valor;

    if (["÷", "×", "−", "+", "="].includes(valor)) {
        botao.classList.add("operador");
    }

    botao.addEventListener("click", function() {
        if (valor === "C") {
            visor.value = "";
            resultadoExibido = false;
            return;
        }

        if (valor === "⌫") {
            visor.value = visor.value.slice(0, -1);
            resultadoExibido = false;
            return;
        }
        
        if (valor === "=") {
            try {
                const expressaoOriginal = visor.value;
                const resultado = calcular(expressaoOriginal);

                atualizarHistorico(expressaoOriginal, resultado);
                atualizarRanking(resultado);

                visor.value = String(resultado);
                resultadoExibido = true;
            } catch (erro) {
                alert(erro.message);
            }
            return;
        }
        
        if (resultadoExibido) {
            if (["+", "−", "×", "÷"].includes(valor)) {
                resultadoExibido = false;
            } else {
                visor.value = "";
                resultadoExibido = false;
            }
        }
        
        visor.value += valor;
    });

    areaBotoes.appendChild(botao);
});