const openBrackets = ['(', '{', '['];
const closedBrackets = [')', '}', ']'];
const getBalancedStr = (sequences) => {
    let stack = [];
    // quebro a palavra em letras
    Array.from(sequences).forEach(l => {
        // se for uma bracket de abertura eu adiciono ao stack
        if (openBrackets.includes(l)) {
            stack.push(l)
            // se for uma bracket de fechamento verifico se e igual a bracket de abertura pelo indice, no array de brackets abertas
        } else if (closedBrackets.includes(l)) {
            if (stack[stack.length - 1] === openBrackets[closedBrackets.indexOf(l)]) {
                stack.splice(-1, 1)
            } else {
                stack.push(l);
                return;
            }
        }
    });
    return (stack.length === 0) ? 'SIM' : 'NAO';
}
// minhas frases
const sequences = [
    "{()}", // SIM balanceada
    "[()]]", // NAO balanceada
    "[[()]]", // SIM balanceada
    "{{([])}}", // SIM balanceada
    "[[[}", // NAO balanceada
    "{[()]}", // SIM
    "{[(])}", // NAO
    "{{[[(())]]}}" // SIM
];
sequences.forEach(p => {
    console.log(`${p} ${getBalancedStr(p)}`);
});