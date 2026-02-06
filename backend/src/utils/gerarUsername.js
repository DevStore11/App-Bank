export function gerarUsername(nomeCompleto) {
  const partes = nomeCompleto.trim().split(" ");

  const iniciais =
    partes[0][0].toUpperCase() +
    (partes[1] ? partes[1][0].toUpperCase() : "X");

  const ultimo = partes[partes.length - 1].toLowerCase();

  const numero = Date.now().toString().slice(-4);

  return `${iniciais}${ultimo}${numero}`;
}
