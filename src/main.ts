



type usuario = {
    nome: string;
    idade: number;
    id: number;
    premium: boolean;
    bio?: string;
}

const usuario1: usuario = {
    nome: "Naldo",
    idade: 17,
    id: 1,
    premium: true
}

const usuario2: usuario = {
    nome: "Eduardo",
    idade: 19,
    id: 2,
    premium: false
}

function maiorIdade(user: usuario): void{
    const status = user.idade >= 18 ? "Maior de idade" : "Menor de idade"
    console.log(`Usuário:${user.nome}\n | Idade:${user.idade}\n | ID:${user.id}\n | Status:${status}\n`)
}

const listaDeUsuarios: usuario[] = [
    {nome: "Naldo", idade: 17, id: 1, premium: true, bio: "Meu nome é Naldo e serei programador"},
    {nome: "Ana", idade: 18, id: 2, premium: false, bio: "Meu nome é ana e sou arquiteta"},
    {nome: "Eduardo", idade: 50, id: 3, premium: true}
]

for (const user of listaDeUsuarios) {
    maiorIdade(user);
}

const apenasMaiores = listaDeUsuarios.filter(user => user.idade >= 18);
for (const user of apenasMaiores){
    console.log(user)
}

const apenasUsuarios: string[] = listaDeUsuarios.map(user => user.nome)
console.log(apenasUsuarios)

const usuarioMaiores: string[] = listaDeUsuarios
    .filter(user => user.idade >= 18)
    .map(user => user.nome);
console.log(usuarioMaiores)


const acharId = listaDeUsuarios.find(user => user.id === 1)
    if (acharId){
    console.log(`Encontrado: ${acharId.nome}`)
} else{
    console.log("Usuário não encontrado.")
}



for (const user of listaDeUsuarios){
    const bioNaoCadastrada = user?.bio ?? "Biografia não cadastrada"
    console.log(`${user.nome}: ${bioNaoCadastrada}`)
}
