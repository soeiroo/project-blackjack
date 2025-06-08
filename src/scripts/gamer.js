import { startGame, pegarCarta, calcularPontos, verificarFimDeJogo } from "./regrasDoGamer.js";

const jogador1 = { nome: "Jogador 1", mao: [] };
const jogador2 = { nome: "Jogador 2", mao: [] };
const jogadores = [jogador1, jogador2];

let turnoAtual = 0;

const maoJogador1 = document.querySelector(".mao-jogador-1");
const maoJogador2 = document.querySelector(".mao-jogador-2");

const pontosJogador1 = document.querySelector("#pontuacao-jogador-1");
const pontosJogador2 = document.querySelector("#pontuacao-jogador-2");

const btnComprar = document.querySelector(".comprar-carta");
const btnPassar = document.querySelector(".passar-vez");
const btnReiniciar = document.querySelector(".reiniciar-gamer");

document.addEventListener("DOMContentLoaded", () => {
  startGame(jogador1, jogador2);

  mostrarCartas(jogador1.mao, maoJogador1);
  mostrarCartas(jogador2.mao, maoJogador2, true);

  mostrarPontos(calcularPontos(jogador1.mao), pontosJogador1);
  mostrarPontos(calcularPontos([jogador2.mao[1]]), pontosJogador2);

  atualizarTurno();
});

function mostrarPontos(pontos, elemento) {
  if (pontos > 21) {
    elemento.textContent = `${pontos}: Estourou!`;
  } else if (pontos === 21) {
    elemento.textContent = `${pontos}!`;
  } else {
    elemento.textContent = pontos;
  }
}

function mostrarCartas(mao, elemento, ocultar = false) {
  elemento.innerHTML = "";

  for (let i = 0; i < mao.length; i++) {
    const carta = mao[i];
    const li = document.createElement("li");
    li.classList.add("carta");

    const img = document.createElement("img");

    if(ocultar) {
      img.src = `../assets/images/cartas/card_back_black.png`;
      img.alt = "Carta virada";
      ocultar = false;
    } else {
      const valor = carta.valor.toLowerCase();
      const tipo = carta.tipo.toLowerCase();
      img.src = `../assets/images/cartas/${valor}-${tipo}.png`;
      img.alt = `${carta.valor} de ${carta.tipo}`;
    }

    img.classList.add("imagem-carta");
    li.appendChild(img);

    const rotacao = (i - Math.floor(mao.length / 2)) * 6;
    li.style.setProperty("--rotacao", `${rotacao}deg`);

    elemento.appendChild(li);
  }
}


function atualizarInterface(jogador1, jogador2, turnoAtual) {
  mostrarCartas(jogador1.mao, maoJogador1);

  if(turnoAtual) {
    mostrarCartas(jogador2.mao, maoJogador2);
    mostrarPontos(calcularPontos(jogador2.mao), pontosJogador2);
  }

  mostrarPontos(calcularPontos(jogador1.mao), pontosJogador1);
}

function atualizarTurno() {
  const mensagemTurno = document.getElementById("mensagem-turno");

  if (!mensagemTurno) return;

  if (jogador1.passou && jogador2.passou) return;

  mensagemTurno.textContent = `Vez de: ${jogadores[turnoAtual].nome}`;
}

function encerrarJogo(mensagem) {
  if(mensagem) {
    btnComprar.disabled = true;
    btnPassar.disabled = true;

    btnComprar.classList.add("btn-desabilidado");
    btnPassar.classList.add("btn-desabilidado");

    document.getElementById("mensagem-turno").textContent = mensagem;
  }
}

btnComprar.addEventListener("click", () => {
  const jogador = jogadores[turnoAtual];

  if (!jogador.passou) {
    pegarCarta(jogador);
    
    const pontos = calcularPontos(jogador.mao);
    
    if (pontos >= 21) {
      jogador.passou = true;
      
      encerrarJogo(verificarFimDeJogo(jogador1, jogador2));
      
      if (!btnComprar.disabled && !btnPassar.disabled) {
        turnoAtual = 1 - turnoAtual;
        atualizarTurno();
      }
    }
    
    atualizarInterface(jogador1, jogador2, turnoAtual);
  }
});

btnPassar.addEventListener("click", () => {
  jogadores[turnoAtual].passou = true;

  encerrarJogo(verificarFimDeJogo(jogador1, jogador2));

  if (!jogadores[1 - turnoAtual].passou) {
    turnoAtual = 1 - turnoAtual;
    atualizarInterface(jogador1, jogador2, turnoAtual);
    atualizarTurno();
  }
});

btnReiniciar.addEventListener("click", () => {
    startGame(jogador1, jogador2);

    mostrarCartas(jogador1.mao, maoJogador1);
    mostrarCartas(jogador2.mao, maoJogador2, true);

    mostrarPontos(calcularPontos(jogador1.mao), pontosJogador1);
    mostrarPontos(calcularPontos([jogador2.mao[1]]), pontosJogador2);

    turnoAtual = 0;

    atualizarTurno();

    btnComprar.disabled = false;
    btnPassar.disabled = false;

    btnComprar.classList.remove("btn-desabilidado");
    btnPassar.classList.remove("btn-desabilidado");
});