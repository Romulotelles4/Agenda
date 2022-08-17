import { Guid } from "../shared/guid.model.js";
export class TarefaRepositoryLocalStorage {
    constructor() {
        this.localStorage = window.localStorage;
        this.tarefas = this.selecionarTodos();
    }
    excluir(id) {
        this.tarefas = this.tarefas.filter(x => x.id !== id);
        this.gravar();
    }
    editar(id, registroEditado) {
        const indexSelecionado = this.tarefas.findIndex(x => x.id === id);
        this.tarefas[indexSelecionado] = {
            id: id,
            titulo: registroEditado.titulo,
            descricao: registroEditado.descricao,
            dataCriacao: registroEditado.dataCriacao,
            prioridade: registroEditado.prioridade
        };
        this.gravar();
    }
    inserir(registro) {
        registro.id = new Guid().gerarNovoId();
        this.tarefas.push(registro);
        this.gravar();
    }
    selecionarTodos() {
        const dados = this.localStorage.getItem("tarefas");
        if (!dados)
            return [];
        return JSON.parse(dados);
    }
    gravar() {
        const tarefasJsonString = JSON.stringify(this.tarefas);
        this.localStorage.setItem("tarefas", tarefasJsonString);
    }
    selecionarPorId(id) {
        return this.tarefas.find(x => x.id === id);
    }
}
