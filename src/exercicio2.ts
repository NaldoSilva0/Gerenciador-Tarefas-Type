class Usuario {
    nome: string;
    idade: number;
    

    constructor(nome: string, idade: number) {
        this.nome = nome;
        this.idade = idade;
    }

    apresentar(): string {
        return `Olá, me chamo ${this.nome} e tenho ${this.idade} anos de idade`
    }
}


class ContaBancaria {
    public titular: string;
    private saldo: number;

    constructor(titular: string, saldoInicial: number) {
        this.titular = titular;
        this.saldo = saldoInicial;
    }
    public depositar(valor: number): void {
        this.saldo += valor;
        console.log(`Valor R$ ${valor} depositado em sua conta!`)
    }
    public sacar(valor: number): void{
        if (valor <= 0){
            console.log("Digite um valor maior que 0")
        } else if (valor > this.saldo){
            console.log(`Saldo insuficiente para sacar R$ ${valor}`) 
        } else {
            this.saldo -= valor
            console.log(`Saque de r$ ${valor} Realizado com sucesso!`)
        }
    }
    public verSaldo(): number {
        return this.saldo
    }
}


class ContaPoupança extends ContaBancaria {
    private taxaJuros: number;

    constructor(titular: string, saldoInicial: number, taxaJuros: number) {
        super(titular, saldoInicial);
        this.taxaJuros = taxaJuros;
    }

    public renderJuros(): void {
        const saldoAtual = this.verSaldo();
        const rendimento = saldoAtual * (this.taxaJuros / 100)
        this.depositar(rendimento);
        console.log(`Rendimento de R$ ${rendimento} aplicado!`)
    }
}

const poupanca = new ContaPoupança("Eduardo", 1000, 1);
poupanca.renderJuros();
console.log(`Novo saldo: R$ ${poupanca.verSaldo()}`);
