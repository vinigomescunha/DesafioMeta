const getMaxReturn = (input) => {
  // map dos inputs transformando em array de inputs a partir de determinado indice
  const maxReturnArray = input
    // pego os elementos a partir daquele ponto para comparar os valores posteriores
    .map((v, i) => (input.slice(i, input.length - 1)).map((vs) => vs - v)
      // ordeno pelo maior e retorno o primeiro elemento u 0
      .sort((a, b) => b - a)[0] || 0);
  return Math.max.apply(null, maxReturnArray.map(i => i ? i : 0));
};
const printResult = (input) => {
  console.log(`Input: ${JSON.stringify(input)}`);
  console.log(`Output: ${getMaxReturn(input)}`);
};
let input;
input = [7, 1, 5, 3, 6, 4];
printResult(input);
input = [7, 6, 4, 3, 1];
printResult(input);