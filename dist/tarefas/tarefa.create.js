import { Prioridade } from "./prioridade.enum.js";
import { Tarefa } from "./tarefa.model.js";
import { TarefaRepositoryLocalStorage } from "./tarefas.repository.local-storage.js";
class TarefaPaginaCadastro {
    constructor(repositorioTarefas, id) {
        this.repositorioTarefas = repositorioTarefas;
        this.configurarElementos();
        if (id) {
            this.idSelecionado = id;
            const tarefaSelecionada = this.repositorioTarefas.selecionarPorId(id);
            if (tarefaSelecionada)
                this.preencherFormulario(tarefaSelecionada);
        }
    }
    preencherFormulario(tarefaSelecionada) {
        this.txtTitulo.value = tarefaSelecionada.titulo;
        this.txtDescricao.value = tarefaSelecionada.descricao;
        switch (tarefaSelecionada.prioridade) {
            case Prioridade.Baixa:
                this.rdbPrioridade = document.querySelector("input[value='Baixa']");
                break;
            case Prioridade.Média:
                this.rdbPrioridade = document.querySelector("input[value='Média']");
                break;
            case Prioridade.Alta:
                this.rdbPrioridade = document.querySelector("input[value='Alta']");
                break;
        }
        this.rdbPrioridade.checked = true;
    }
    configurarElementos() {
        this.txtTitulo = document.getElementById("txtTitulo");
        this.txtDescricao = document.getElementById("txtDescricao");
        this.btnInserir = document.getElementById("btnInserir");
        this.btnInserir.addEventListener("click", (_evt) => this.gravarRegistros());
    }
    gravarRegistros() {
        const tarefa = this.obterDadosFormulario();
        if (!this.idSelecionado)
            this.repositorioTarefas.inserir(tarefa);
        else
            this.repositorioTarefas.editar(tarefa.id, tarefa);
        window.location.href = "tarefa.list.html";
    }
    obterDadosFormulario() {
        const titulo = this.txtTitulo.value;
        const descricao = this.txtDescricao.value;
        const prioridade = this.obterPrioridadeSelecionada();
        let tarefa = null;
        if (!this.idSelecionado)
            tarefa = new Tarefa(titulo, descricao, prioridade);
        else
            tarefa = new Tarefa(titulo, descricao, prioridade, this.idSelecionado);
        return tarefa;
    }
    obterPrioridadeSelecionada() {
        this.rdbPrioridade = document.querySelector("input[type='radio']:checked");
        return this.rdbPrioridade.value;
    }
}
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
new TarefaPaginaCadastro(new TarefaRepositoryLocalStorage(), id);
