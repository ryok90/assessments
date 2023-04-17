const fibonnaci = (num) => {
  if (num === 0) return 0;

  const recc = (prev, curr, acc) => {
    if (acc === num) return curr;

    return recc(curr, prev + curr, acc + 1);
  }

  return recc(0, 1, 1);
};

console.log(fibonnaci(0));
console.log(fibonnaci(1));
console.log(fibonnaci(2));
console.log(fibonnaci(3));
console.log(fibonnaci(4));
console.log(fibonnaci(5));
console.log(fibonnaci(6));