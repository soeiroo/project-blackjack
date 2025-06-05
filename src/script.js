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
