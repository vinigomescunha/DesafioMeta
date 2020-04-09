const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// busco a classe com o "modelo de dominio" interface cof!cof! de contato
const Contato = require('./domain').Contato;
// responsavel pela busca do model de contato
const modelBuilder = require('./models').initialize();
const contatos = modelBuilder.getModel('Contato');

const auth = require('basic-auth');
// podia ter criado um env no padrao dotenv
const users = require('./users-example-out-pattern-12-factors.json');

app.use(bodyParser.json());
app.use(express.json());
app.use((request, response, next) => {
    response.removeHeader("X-Powered-By");
    const user = auth(request);
    if (!user || !users[user.name] || users[user.name].password !== user.pass) {
        response.set('WWW-Authenticate', 'Basic realm="unauth"');
        return response.status(401).send('Unauthorized');
    }
    return next();
});

app.get('/:idContato', (request, response) => {
    const contato = contatos.get(parseInt(request.params.idContato));
    response.status(contato ? 200 : 404).send(contato ? contato : 'Not found!');
});

app.put('/:idContato', (request, response) => {
    try {
        const existContato = contatos.get(parseInt(request.params.idContato));
        if (!existContato) {
            response.status(404).send('Not found!');
            return;
        }
        const isUpdated = contatos.update(
            parseInt(request.params.idContato),
            new Contato(request.body)
        );
        response.status(isUpdated ? 204 : 400).send(isUpdated ? '' : 'Bad Request');
    } catch (e) {
        response.status(400).send('Bad request' + e.message);
    }
});

app.delete('/:idContato', (request, response) => {
    const isDeleted = contatos.delete(parseInt(request.params.idContato));
    response.status(isDeleted ? 204 : 404).send('');
});

app.get('/', (request, response) => {
    const size = request.query.size;
    const page = request.query.page;
    const allContacts = contatos.getAll(size, page);
    response.status(allContacts.length > 0 ? 200 : 404).send(allContacts);
});

app.post('/', (request, response) => {
    try {
        const contato = new Contato(request.body); // o objeto valida os dados
        contatos.insert(contato);
        response.status(201).send('Created');
    } catch (e) {
        response.status(400).send('Bad Request' + e.message);
    }
});

app.listen(3000);