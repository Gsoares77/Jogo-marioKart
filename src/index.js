// Definindo os personagens da corrida com seus atributos
const player1 = {
    NOME: "Mario",              // Nome do personagem
    VELOCIDADE: 4,              // Atributo usado no bloco RETA
    MANOBRABILIDADE: 3,         // Atributo usado no bloco CURVA
    PODER: 3,                   // Atributo usado no bloco CONFRONTO
    PONTOS: 0                   // Pontos acumulados durante a corrida
};

const player2 = {
    NOME: "Peach",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 2,
    PONTOS: 0
};

// Função que simula o lançamento de um dado de 6 lados
async function rollDice() {
    return Math.floor(Math.random() * 6) + 1; // Retorna número de 1 a 6
}

// Função que sorteia aleatoriamente o tipo de bloco da rodada
async function getRandomBlock() {
    let random = Math.random(); // Gera número entre 0 e 1
    let result;

    // Usa condições para definir qual bloco será sorteado
    switch (true) {
        case random < 0.33:
            result = "RETA";     // Trecho de velocidade
            break;
        case random < 0.66:
            result = "CURVA";    // Trecho de manobrabilidade
            break;
        default:
            result = "CONFRONTO"; // Trecho de combate
    }

    return result; // Retorna o tipo de bloco
}

// Função que exibe no console o resultado do dado e do atributo somado
async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

// Função principal que controla toda a corrida
async function playraceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) { // 5 rodadas no total
        console.log(`🏁 Rodada ${round}`);

        // Sorteia o tipo de trecho da pista
        let block = await getRandomBlock();
        console.log(`Bloco: ${block}`);

        // Cada personagem rola um dado
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        // Variáveis para guardar o total da jogada (dado + atributo)
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        // Caso o bloco seja "RETA", compara VELOCIDADE
        if (block === "RETA") {
            totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
            totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

            await logRollResult(character1.NOME, "VELOCIDADE", diceResult1, character1.VELOCIDADE);
            await logRollResult(character2.NOME, "VELOCIDADE", diceResult2, character2.VELOCIDADE);
        }

        // Caso o bloco seja "CURVA", compara MANOBRABILIDADE
        if (block === "CURVA") {
            totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
            totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

            await logRollResult(character1.NOME, "MANOBRABILIDADE", diceResult1, character1.MANOBRABILIDADE);
            await logRollResult(character2.NOME, "MANOBRABILIDADE", diceResult2, character2.MANOBRABILIDADE);
        }

        // Caso o bloco seja "CONFRONTO", compara PODER
        if (block === "CONFRONTO") {
            // Soma o dado com o poder de cada personagem
            const powerResult1 = character1.PODER + diceResult1;
            const powerResult2 = character2.PODER + diceResult2;

            console.log(`${character1.NOME} confrontou com ${character2.NOME} ! 🥊`);

            await logRollResult(character1.NOME, "PODER", diceResult1, character1.PODER);
            await logRollResult(character2.NOME, "PODER", diceResult2, character2.PODER);

            // Quem tiver maior resultado tira 1 ponto do outro (se possível)
            if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
                console.log(`${character1.NOME} ganhou o confronto! ${character2.NOME} perdeu 1 ponto 🐢`);
                character2.PONTOS--;
            } else if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
                console.log(`${character2.NOME} ganhou o confronto! ${character1.NOME} perdeu 1 ponto 🐢`);
                character1.PONTOS--;
            } else {
                console.log("Confronto empatado! Nenhum ponto foi perdido ⚖️");
            }
        } else {
            // Comparação de pontos normais (RETA e CURVA)
            if (totalTestSkill1 > totalTestSkill2) {
                console.log(`${character1.NOME} marcou um ponto! 🏅`);
                character1.PONTOS++;
            } else if (totalTestSkill2 > totalTestSkill1) {
                console.log(`${character2.NOME} marcou um ponto! 🏅`);
                character2.PONTOS++;
            } else {
                console.log("Empate na rodada! Nenhum ponto foi marcado 🤝");
            }
        }

        // Linha para separar rodadas no console
        console.log("________________________________________________________________");
    }
}

// Função que declara o vencedor da corrida ao final das rodadas
async function declareWinner(character1, character2) {
    console.log("🏁 Resultado Final:");
    console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
    console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`);

    if (character1.PONTOS > character2.PONTOS) {
        console.log(`\n🏆 ${character1.NOME} venceu a corrida! Parabéns!`);
    } else if (character2.PONTOS > character1.PONTOS) {
        console.log(`\n🏆 ${character2.NOME} venceu a corrida! Parabéns!`);
    } else {
        console.log("🏁 A corrida terminou em empate!");
    }
}

// Função principal que inicia o jogo
(async function main() {
    console.log(`🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`);

    await playraceEngine(player1, player2);   // Executa as rodadas
    await declareWinner(player1, player2);    // Mostra o vencedor
})();














// const player3 = {
//     NOME: "Yoshi",
//     VELOCIDADE: 2,
//     MANOBRABILIDADE: 4,
//     PODER: 3,
//     PONTOS: 0,
// }

// const player4 = {
//     NOME: "Bowser",
//     VELOCIDADE: 5,
//     MANOBRABILIDADE: 2,
//     PODER: 5,
//     PONTOS: 0,
// }

// const player5 = {
//     NOME: "Luigi",
//     VELOCIDADE: 3,
//     MANOBRABILIDADE: 4,
//     PODER: 4,
//     PONTOS: 0,
// }

// const player6 = {
//     NOME: "Donkey Kong",
//     VELOCIDADE: 2,
//     MANOBRABILIDADE: 2,
//     PODER: 5,
//     PONTOS: 0,
// }