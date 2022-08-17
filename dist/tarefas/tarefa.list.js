import { TarefaRepositoryLocalStorage } from "./tarefas.repository.local-storage.js";
class TarefaPaginaListagem {
    constructor(repositorioTarefas) {
        this.repositorioTarefas = repositorioTarefas;
        this.configurarElementos();
        this.atualizarTabela();
    }
    configurarElementos() {
        this.tabela = document.getElementById("tabela");
    }
    atualizarTabela() {
        const tarefas = this.repositorioTarefas.selecionarTodos();
        let corpoTabela = this.tabela.getElementsByTagName("tbody")[0];
        tarefas.forEach(tarefa => {
            const novaLinha = corpoTabela.insertRow();
            Object.values(tarefa).forEach((valor) => {
                const novaCelula = novaLinha.insertCell();
                novaCelula.innerText = valor;
            });
            const celulaBotoes = novaLinha.insertCell();
            const btnEditar = document.createElement("button");
            btnEditar.innerText = "Editar";
            btnEditar.className = "btnEditar me-2";
            btnEditar.addEventListener("click", () => {
                const idSelecionado = tarefa.id;
                window.location.href = `tarefa.create.html?id=${idSelecionado}`;
            });
            const btnExcluir = document.createElement("button");
            btnExcluir.innerText = "Excluir";
            btnExcluir.className = "btnExcluir";
            btnExcluir.addEventListener("click", () => {
                const idSelecionado = tarefa.id;
                this.repositorioTarefas.excluir(idSelecionado);
                window.location.reload();
            });
            celulaBotoes.appendChild(btnEditar);
            celulaBotoes.appendChild(btnExcluir);
        });
    }
    ;
}
new TarefaPaginaListagem(new TarefaRepositoryLocalStorage());