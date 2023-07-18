export const getMinFromArray = (list: number[]) => {
  return Math.min(...(list || []));
}

export const getMaxFromArray = (list: number[]) => {
  return Math.max(...(list || []));
}

export const getMin = (num1: number, num2: number) => {
  return Math.min(num1, num2);
}

export const getMax = (num1: number, num2: number) => {
  return Math.max(num1, num2);
}
