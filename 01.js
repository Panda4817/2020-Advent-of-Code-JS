const part1 = data =>
  new Promise(resolve => {
    setTimeout(() => {
      const num  = Array.from(data.split("\n"))
      const len = num.length
      const target = 2020
      let num1 = 0
      let num2 = 0
      for (let i=0; i<len; i ++) {
        for (let j=i+1; j<len; j ++) {
          if (parseInt(num[i]) + parseInt(num[j]) == target && i != j) {
            num1 = parseInt(num[i])
            num2 = parseInt(num[j])
            console.log(num1, num2)
          }
        }
      }
      
      resolve(num1*num2)
      
    }, 1000);
  });

const part2 = data =>
  new Promise(resolve => {
    setTimeout(() => {
      const num  = Array.from(data.split("\n"))
      const len = num.length
      const target = 2020
      let num1 = 0
      let num2 = 0
      let num3 = 0
      for (let i=0; i<len; i ++) {
        for (let j=i+1; j<len; j ++) {
          for (let k=j+1; k<len; k++) {
            if (parseInt(num[i]) + parseInt(num[j]) + parseInt(num[k]) == target && i != j != k) {
            num1 = parseInt(num[i])
            num2 = parseInt(num[j])
            num3 = parseInt(num[k])
            console.log(num1, num2, num3)
          }
          }
          
        }
      }
      
      resolve(num1*num2*num3)
      
    }, 1000);
  });

module.exports = {
  part1,
  part2
};
