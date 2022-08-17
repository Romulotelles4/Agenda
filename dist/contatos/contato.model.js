import { EntidadeBase } from "../shared/entidade.model.js";
export class Contato extends EntidadeBase {
    constructor(nome, telefone, email, empresa, cargo, id) {
        super();
        if (id)
            this.id = id;
        this.nome = nome;
        this.telefone = telefone;
        this.email = email;
        this.empresa = empresa;
        this.cargo = cargo;
    }
}
