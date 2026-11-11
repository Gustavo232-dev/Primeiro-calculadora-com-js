window.calcular = function calcular(expressao) {
    expressao = expressao
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/−/g, "-");

    const partes = expressao.match(/\d+(?:\.\d+)?|[+\-*/]/g);

    if (!partes || partes.join("") !== expressao) {
        throw new Error("Expressão inválida");
    }

    const operadores = ["+", "-", "*", "/"];
    const parteInvalida = (item, indice) =>
        indice % 2 === 0
            ? !/^\d/.test(item)
            : !operadores.includes(item);

    if (partes.length % 2 === 0 || partes.some(parteInvalida)) {
        throw new Error("Expressão inválida");
    }

    for (let i = 1; i < partes.length; ) {
        if (partes[i] !== "*" && partes[i] !== "/") {
            i += 2;
            continue;
        }

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
    }

    let resultado = Number(partes[0]);

    for (let i = 1; i < partes.length; i += 2) {
        const numero = Number(partes[i + 1]);

        if (partes[i] !== "+") {
            resultado -= numero;
            continue;
        }

        resultado += numero;
    }

    if (!Number.isFinite(resultado)) {
        throw new Error("Resultado inválido");
    }

    return resultado;
};
