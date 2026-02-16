import bcrypt from "bcryptjs";

export function gerarNumeroCliente() {
  return "CL" + Math.floor(10000000 + Math.random() * 90000000);
}

export function gerarNumeroConta() {
  const sequencia = Date.now().toString().slice(-9);
  return "ACC" + sequencia;
}

export function gerarIBAN(numeroConta) {
  const codigoBanco = "0001";
  return "MZ21" + codigoBanco + numeroConta;
}

export function gerarPinSeguro() {
  const pin = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
  const pinHash = bcrypt.hashSync(pin, 10);
  return { pin, pinHash };
}


export function gerarDadosBancarios() {
  const numero_cliente = gerarNumeroCliente();
  const numero_conta = gerarNumeroConta();
  const iban = gerarIBAN(numero_conta);
  const {pin,pinHash}=gerarPinSeguro();

  return {
    numero_cliente,
    numero_conta,
    iban,
    saldo: 0.0,
    pinHash, // ✅ inclui o pinHash nos dados bancários
    pin
  };
}
