export const sum = (a: number, b: number) => {
  if ('development' === process.env.NODE_ENV) {
    console.log('dev环境编写逻辑66')
  }
  return a + b;
};


console.log(sum(2, 2))