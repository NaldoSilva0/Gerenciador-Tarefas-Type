import readline from "readline";
import { readFile, writeFile } from "fs/promises";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


interface Task {
    id: number;
    title: string;
    completed: boolean;
}
const tarefas: Task[] = [];
let idNumero = 0

await carregarTarefas()

function interfaceUsuario(){
        console.log("---Gerenciador do usuário---\n")
        console.log("[1]-Abrir tarefas")
        console.log("[2]-Adicionar tarefa")
        console.log("[3]-Remover tarefa")
        console.log("[4]-Concluir tarefa")
        console.log("[5]-Desfazer tarefa")
        console.log("[6]-Sair")

        rl.question(`\nDigite a opção que deseja: `, (resposta: string) => {
            if (resposta === "1"){
                usuarioAbrirTarefas()
            } else if(resposta === "2"){
                usuarioAdicionarTarefa()
            } else if(resposta === "3"){
                usuarioRemoverTarefa()
            } else if(resposta === "4"){
                usuarioConcluirTarefa()
            } else if(resposta === "5"){
                usuarioDesfazerTarefa()
            } else if(resposta === "6"){
                console.log("Obrigado por usar nossos sistemas!")
                process.exit(0)
            }                
                
        })
}

interfaceUsuario()


function usuarioDesfazerTarefa(){
    console.log("---Desfazer tarefa---")
    rl.question("Digite o ID da tarefa: ",(id: string) => {
        const idNumero = Number(id)
        const localizarTarefa = tarefas.findIndex((tarefa) => tarefa.id === idNumero)
        if(localizarTarefa === -1){
            console.log("Esse ID não está registrada!\n")
            interfaceUsuario
        }  else{
            const tarefa = tarefas[localizarTarefa]

            if (tarefa) {
                tarefa.completed = false
                salvarTarefas()
                console.log("Tarefa desfeita!\n")
        interfaceUsuario()
            }
        }     
    })
}


function usuarioConcluirTarefa(){
    console.log("---Concluir tarefa---\n")
    rl.question(`Digite o ID da tarefa: `,(id: string) => {
        const idNumero = Number(id)
        const localizarTarefa = tarefas.findIndex((tarefa) => tarefa.id === idNumero)
        if(localizarTarefa === -1){
            console.log("Esse ID não está registrado!\n")
            interfaceUsuario()
        } else { 
            const tarefa = tarefas[localizarTarefa]

            if (tarefa) {
                tarefa.completed = true
                salvarTarefas()
                console.log("Tarefa concluída!\n")
        interfaceUsuario()
            }
        }
    })
}


function usuarioAbrirTarefas(): void{
    console.log("---Tarefas---\n")
   
    for (const usuario of tarefas){
    const status = usuario.completed ? "✓" : " "
    console.log(`[${status}] | id: ${usuario.id} | ${usuario.title}`)   

    }



    rl.question(`Pressione ENTER para voltar ao menu...`, (voltar: string) => {
        interfaceUsuario()
    })
    
}

function usuarioAdicionarTarefa(){

    idNumero++;
    
    rl.question(`Digite sua tarefa: `, (tarefa: string) => {
        if (tarefa === ""){
            console.log("É necessário escrever algo para ser adiciona a lista de tarefas!\n")
        } else{
            console.log(`Tarefa: ${tarefa} adicionada com sucesso!`);
        }

        const tarefaUsuario: Task = {
            id: idNumero,
            title: tarefa,
            completed: false,
        };
        tarefas.push(tarefaUsuario)
        salvarTarefas()
        interfaceUsuario()

        
    })
}

function usuarioRemoverTarefa(){
    console.log("---Remover tarefa---\n")
    rl.question(`Digite o ID que deseja remover: `, (id: string) => {
        const idNumero = Number(id)
        const localizarTarefa = tarefas.findIndex((tarefa) => tarefa.id === idNumero)
        if (localizarTarefa === -1){
            console.log("\nEsse ID não está registrado!")

        } else {
            tarefas.splice(localizarTarefa, 1)
            salvarTarefas()
        }
        
        interfaceUsuario()
    })
}

async function carregarTarefas() {
    try {
       const dados = await readFile("../data/tarefas.json", "utf-8")
    const transformar = JSON.parse(dados)
    tarefas.push(...transformar)
    if (tarefas.length > 0 ){
        idNumero = Math.max(...tarefas.map((tarefa) => tarefa.id)) 
    }
    
    } catch (erro) {
        console.log("Não foi possível carregar o arquivo")
    
} 
    }

async function salvarTarefas() {
    const dados = JSON.stringify(tarefas, null, 2)
    await writeFile("../data/tarefas.json", dados)
}