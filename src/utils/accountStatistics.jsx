//total, min, max, avg
const calcTransaction = (arr) => {
  const tranArr = arr?.map((data) => data?.amount);
  //sum
  const sumTotal = arr
    ?.map((data) => data?.amount)
    .reduce((acc, curr) => {
      return Number(acc) + Number(curr);
    }, 0);
  const avg = sumTotal / arr?.length;
  const min = Math.min(...tranArr);
  const max = Math.max(...tranArr);
  return {
    sumTotal,
    min,
    max,
    avg,
  };
};

export default calcTransaction;
