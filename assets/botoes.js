const botoes = [
    "7", "8", "9", "÷",
    "4", "5", "6", "×",
    "1", "2", "3", "−",
    "0", ".", "⌫", "+",
    "C", "="
];

window.criarBotoes = function({
    areaBotoes,
    visor,
    calcular,
    atualizarHistorico,
    atualizarRanking
}) {
    let resultadoExibido = false;

    botoes.forEach(function(valor) {
        const botao = document.createElement("button");
        botao.textContent = valor;

        if (["÷", "×", "−", "+", "="].includes(valor)) {
            botao.classList.add("operador");
        };

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
}
