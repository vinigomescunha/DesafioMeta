exports = module.exports = (db) => {
    class ContatoModel {
        constructor(db) {
            this.db = db;
            this.db.defaults({
                contatos: []
            }).write();
        }
        get contatos() {
            return this.db.get('contatos');
        }
        getAll(size, page) {
            return size && typeof page !== 'undefined' ?
                this.contatos.value().slice(page * size, parseInt(page * size) + parseInt(size)) :
                this.contatos.value();
        }
        get(id) {
            return this.contatos.find({
                id
            }).value();
        }
        // aqui eu entendo que ja veio validado
        insert(c) {
            // nao me preocupo com a concorrencia nesse momento, e nem com informacoes assincronas
            const id = this.contatos.size().value();
            c.id = id;
            return this.contatos.push(c).write();
        }
        update(id, newData) {
            newData.id = id;
            const item = this.contatos.find({
                id
            });
            if (item.value()) {
                item.assign(newData).write();
                return true;
            } else {
                return false;
            }
        }
        delete(id) {
            const item = this.contatos.find({
                id
            });
            if (item.value()) {
                this.contatos.remove(i => i.id === id).write();
                return true;
            } else {
                return false;
            }
        }
    }
    return new ContatoModel(db);
}