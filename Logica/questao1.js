// gero um array, com determinado tamanho que eu passo e embaralho para simular dados variados
const generateArrayShuffled = (length) => Array.from(new Array(length), (item, index) => index).sort(() => .5 - Math.random());
// obtenho array de acordo com a expressao de filtro que passo
const getArrayFromExpression = (arr, expression) => arr.map((value, index) => item = expression(value, index) ? ({
    index,
    value
}) : null).filter(i => i !== null);
// retorno os indices dos valores de um array baseado na soma de dois valores comparados ao alvo(target)
const getIndexesFromTarget = (arr, target) => {
    // valido se o array tem valor definido
    if (!arr) throw new Error('O array nao existe!');
    // valido se o array e um valor do tipo array
    if (!Array.isArray(arr)) throw new Error('O array nao esta respeitando o tipo correspondente!');
    //  valido se o array tem no minimo dois valores
    if (arr.length < 2) throw new Error('O array precisa de no minimo dois valores a comparar!');
    // pego o primeiro valor menor que o target, para fins de validação da sentença
    const firstValue = getArrayFromExpression(arr, (value) => value < target)[0];
    // valido se existe um valor inicial menor que o target(alvo)
    if (!firstValue) throw new Error('Nao existe valor menor que o target');
    // valido se existe um valor que nao seja o primeiro valor(nao seja o index do primeiro resultado) e a regra de que o valor somado ao primeiro resultado seja igual ao alvo
    const secondValue = getArrayFromExpression(arr, (value, index) => index !== firstValue.index && value + firstValue.value === target)[0];
    // valido se existe um valor correspondente  a soma de dois valores seja igual ao alvo
    if (!secondValue) throw new Error('Nao existe um valor que corresponda a soma do alvo');
    console.debug(`Array avaliado: ${JSON.stringify(arr)}\n\n`);
    console.debug(`Os valores encontrados para o alvo ${target} foram: ${firstValue.value} e ${secondValue.value}\n\n`);
    return [firstValue.index, secondValue.index];
};
try {
    // um valor para o alvo
    const target = 22;
    // um array gerado a partir de um numero de inteiros e embaralhado
    const arrayGenerated = generateArrayShuffled(100);
    // indices gerados a partir das regras pre definidas de 
    const indexes = getIndexesFromTarget(arrayGenerated, target);
    console.log(`Os indices encontrados: `, indexes);
} catch (e) {
    console.error(`Ocorreu um erro durante a operacao: ${e.message}`);
}