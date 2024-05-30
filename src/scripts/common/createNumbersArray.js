export const createNumbersArray = (from, to) => {
  // ф-ция должна генерировать массив чисел от from до to
  const numbers = [];
  let count = from;

  while(count <= to) {
    numbers.push(count);
    count += 1;
  }

  return numbers
};
