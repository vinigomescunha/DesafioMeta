exports = module.exports = class Contato {
    constructor(obj) {
        if (!obj) throw new Error('E necessario as informacoes de contato');
        this.requiredFields.forEach(f => {
            if (typeof obj[f] === 'undefined') {
                throw new Error(`Falta campo requerido: ${f}`);
            }
            this[f] = obj[f];
        });
        // em alguns casos pode nao vir com id como no insert
        if (obj.id) {
            this.id = obj.id;
        }
        this.obs = obj.obs ? obj.obs : '';
    }
    get requiredFields() {
        return ['nome', 'canal', 'valor'];
    }
};