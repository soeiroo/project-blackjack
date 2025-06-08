function mostrarRegras() {
  const header = document.getElementById("header");
  const rules = document.getElementById("rules");
  if (!header || !rules) return;
  header.classList.add("topo");
  rules.classList.add("visivel");
}

function mostrarInicio() {
  const header = document.getElementById("header");
  const rules = document.getElementById("rules");
  if (!header || !rules) return;
  header.classList.remove("topo");
  rules.classList.remove("visivel");
}
