let turnoAtual = 0;

const jogador1 = { nome: "Jogador 1", mao: [] };
const jogador2 = { nome: "Jogador 2", mao: [] };
const jogadores = [jogador1, jogador2];

const maoJogador1 = document.querySelector(".mao-jogador-1");
const maoJogador2 = document.querySelector(".mao-jogador-2");

const pontosJogador1 = document.querySelector("#pontuacao-jogador-1");
const pontosJogador2 = document.querySelector("#pontuacao-jogador-2");

const btnComprar = document.querySelector(".comprar-carta");
const btnPassar = document.querySelector(".passar-vez");

let baralho = [];

function Carta(tipo, valor) {
  this.tipo = tipo;
  this.valor = valor;
}

function criarBaralho() {
  let tipos = ["espadas", "copas", "ouros", "paus"];
  let valores = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];

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

function calcularPontos(jogador) {
  return jogador.mao.reduce(
    (total, carta) => total + valorPontos(carta.valor),
    0
  );
}

function mostrarPontos(pontos, elemento) {
  if (pontos > 21) {
    elemento.textContent = `${pontos}: Estourou!`;
  } else if (pontos === 21) {
    elemento.textContent = `${pontos}!`;
  } else {
    elemento.textContent = pontos;
  }
}

function mostrarCartas(mao, elemento) {
  elemento.innerHTML = "";

  for (let i = 0; i < mao.length; i++) {
    const carta = mao[i];
    const li = document.createElement("li");
    li.classList.add("carta");

    const img = document.createElement("img");
    const valor = carta.valor.toLowerCase();
    const tipo = carta.tipo.toLowerCase();

    img.src = `../assets/images/${valor}-${tipo}.png`;
    img.alt = `${carta.valor} de ${carta.tipo}`;
    img.classList.add("imagem-carta");

    li.appendChild(img);

    const rotacao = (i - Math.floor(mao.length / 2)) * 6;
    li.style.setProperty("--rotacao", `${rotacao}deg`);

    elemento.appendChild(li);
  }
}

function atualizarInterface() {
  mostrarCartas(jogador1.mao, maoJogador1);
  mostrarCartas(jogador2.mao, maoJogador2);

  mostrarPontos(calcularPontos(jogador1), pontosJogador1);
  mostrarPontos(calcularPontos(jogador2), pontosJogador2);
}

function atualizarTurno() {
  const mensagemTurno = document.getElementById("mensagem-turno");

  if (!mensagemTurno) return;

  if (jogador1.passou && jogador2.passou) return;

  mensagemTurno.textContent = `Vez de: ${jogadores[turnoAtual].nome}`;
}

function pegarCarta(jogador) {
  if (baralho.length === 0) {
    alert("O baralho acabou!");

    return;
  }

  jogador.mao.push(baralho.pop());
}

function startGame() {
  criarBaralho();
  embaralharBaralho(baralho);

  jogador1.mao = [];
  jogador2.mao = [];
  jogador1.passou = false;
  jogador2.passou = false;

  turnoAtual = 0;

  pegarCarta(jogador1);
  pegarCarta(jogador2);
  pegarCarta(jogador1);
  pegarCarta(jogador2);

  btnComprar.disabled = false;
  btnPassar.disabled = false;

  atualizarInterface();
  atualizarTurno();
}

function encerrarJogo(mensagem) {
  btnComprar.disabled = true;
  btnPassar.disabled = true;
  document.getElementById("mensagem-turno").textContent = mensagem;
}

function verificarFimDeJogo() {
  const p1 = calcularPontos(jogador1);
  const p2 = calcularPontos(jogador2);

  if (p1 > 21) {
    encerrarJogo("Jogador 2 venceu! Jogador 1 estourou.");
    return;
  }

  if (p2 > 21) {
    encerrarJogo("Jogador 1 venceu! Jogador 2 estourou.");
    return;
  }

  if (jogador1.passou && jogador2.passou) {
    if (p1 > p2) {
      encerrarJogo("Jogador 1 venceu!");
    } else if (p2 > p1) {
      encerrarJogo("Jogador 2 venceu!");
    } else {
      encerrarJogo("Empate!");
    }
  }
}

btnComprar.addEventListener("click", () => {
  const jogador = jogadores[turnoAtual];

  if (!jogador.passou) {
    pegarCarta(jogador);
    atualizarInterface();

    const pontos = calcularPontos(jogador);

    if (pontos >= 21) {
      jogador.passou = true;
      verificarFimDeJogo();

      if (!btnComprar.disabled && !btnPassar.disabled) {
        turnoAtual = 1 - turnoAtual;
        atualizarTurno();
      }
    }
  }
});

btnPassar.addEventListener("click", () => {
  jogadores[turnoAtual].passou = true;

  verificarFimDeJogo();

  if (!jogadores[1 - turnoAtual].passou) {
    turnoAtual = 1 - turnoAtual;
    atualizarTurno();
  }
});

startGame();
