var listaCartas = [1, 2, 3, 4, 5];

var listaCartasJogador = [];

var maoJogador = listaCartas.pop();
listaCartasJogador.push(maoJogador);

console.log("Mão: " + listaCartasJogador);
console.log("Baralho: " + listaCartas);

function startGame() {
  alert("Bem-vindo ao jogo de baralho!");
  alert("Você receberá duas carta do baralho.");
  alert("Boa sorte!");
}

function Carta(tipo, valor) {
  this.tipo = tipo;
  this.valor = valor;
}

let baralho = [];

(function criarBaralho() {
  let tipos = ["♠", "♥", "♦", "♣"];
  let valores = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

  for (let i = 0; i < tipos.length; i++) {
    for (let j = 0; j < valores.length; j++) {
      let carta = new Carta(tipos[i], valores[j]);
      baralho.push(carta);
    }
  }
})()

function embaralharBaralho(baralho) {
  for(let i = baralho.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [baralho[i], baralho[j]] = [baralho[j], baralho[i]];
  }
}

embaralharBaralho(baralho);

const listaCartas = document.querySelector(".cartas");

for(let carta of baralho){
  let cartaElement = document.createElement("li");
  cartaElement.classList.add("carta");
  cartaElement.textContent = carta.tipo + carta.valor;
  listaCartas.appendChild(cartaElement);
}

const jogador1 = {
    'nome': 'Jogador 1',
}
