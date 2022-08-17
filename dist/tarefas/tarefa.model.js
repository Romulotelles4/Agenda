import { EntidadeBase } from "../shared/entidade.model.js";
export class Tarefa extends EntidadeBase {
    constructor(titulo, descricao, prioridade, id) {
        super();
        if (id)
            this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.dataCriacao = new Date();
        this.prioridade = prioridade;
    }
}
