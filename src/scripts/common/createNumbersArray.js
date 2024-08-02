export const createNumbersArray = (from, to) => {
  const numbers = [];
  let count = from;

  while (count <= to) {
    numbers.push(count);
    count += 1;
  }

  return numbers;
};
