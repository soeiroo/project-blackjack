let baralho = [];

function Carta(tipo, valor) {
  this.tipo = tipo;
  this.valor = valor;
}

function criarBaralho() {
  let tipos = ["espadas", "copas", "ouros", "paus"];
  let valores = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

  baralho = [];

  for (let tipo of tipos) {
    for (let valor of valores) {
      baralho.push(new Carta(tipo, valor));
    }
  }
}

function embaralharBaralho(baralho) {
  for (let i = baralho.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [baralho[i], baralho[j]] = [baralho[j], baralho[i]];
  }
}

function valorPontos(valor) {
  if (valor === "A") return 1;

  if (["J", "Q", "K"].includes(valor)) return 10;

  return parseInt(valor);
}

function calcularPontos(mao) {
  return mao.reduce((total, carta) => total + valorPontos(carta.valor), 0);
}

function pegarCarta(jogador) {
  if (baralho.length === 0) {
    alert("O baralho acabou!");

    return;
  }

  jogador.mao.push(baralho.pop());
}

function startGame(jogador1, jogador2) {
    console.log("Iniciando jogo...");

    criarBaralho();
    
    embaralharBaralho(baralho);

    jogador1.mao = [];
    jogador2.mao = [];
    jogador1.passou = false;
    jogador2.passou = false;

    pegarCarta(jogador1);
    pegarCarta(jogador2);
    pegarCarta(jogador1);
    pegarCarta(jogador2);
}

function verificarFimDeJogo(jogador1, jogador2) {
  const p1 = calcularPontos(jogador1.mao);
  const p2 = calcularPontos(jogador2.mao);

  if (p1 > 21) {
    return "Jogador 2 venceu! Jogador 1 estourou."
  }

  if (p2 > 21) {
    return "Jogador 1 venceu! Jogador 2 estourou."
  }

  if (jogador1.passou && jogador2.passou) {
    if (p1 > p2) {
      return "Jogador 1 venceu!"
    } else if (p2 > p1) {
      return "Jogador 2 venceu!"
    } else {
      return "Empate!"
    }
  }
}

export { startGame, pegarCarta, calcularPontos, verificarFimDeJogo };