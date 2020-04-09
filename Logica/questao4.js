const getRelevationMap = input => {
    let sum = 0;
    // regra de calculo, o posterior ser inferior ao atual, e estar na lista de valores somaveis
    input.forEach((item, index, array) => {
        const posterior = array && typeof array[index + 1] !== 'undefined' ? array[index + 1] : null;
        if (item > posterior && posterior !== null) {
            sum += (item - posterior);
        }
    });
    return sum;
};
const input = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
console.log(
    `Input: ${JSON.stringify(input)} \n`,
    `\rOutput: ${getRelevationMap(input)}`
);