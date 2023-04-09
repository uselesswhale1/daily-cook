export const uniqueBy = (arr: any[], fn: Function) => arr.reduce((acc, value) => {
  if (!acc.some((item: any) => fn(value, item))) {
    acc.push(value);
  }
  return acc;
}, []);

export default uniqueBy;
