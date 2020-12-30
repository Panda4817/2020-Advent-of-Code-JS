const part1 = data =>
  new Promise(resolve => {
    const lst = data.split("\n");
    const earliest = parseInt(lst[0])
    const buses = lst[1].split(",").map((b) => {
      if (b != "x"){
        return parseInt(b);
      }
      return;
    })
    console.log(buses)
    const number_lines = [];

    buses.map((b) => {
      let num = 0
      let arr = [0]
      while (num < earliest){
        num += b
        arr.push(num)
      }arr.reverse()
      number_lines.push(arr)
      return;
    });
    let diff = Infinity;
    let current = 0;
    number_lines.map((n) => {
      let temp = n[0] - earliest;
      if (temp < diff){
        diff = temp;
        current = buses[number_lines.indexOf(n)];
      }
      return;
    })    
    resolve(diff * current)
  });

const part2 = data =>
  new Promise(resolve => {
    // Using Chinese Remainder Theorem to solve this
    const lst = data.split("\n")
    const buses = lst[1].split(",").map((b) => {
      if (b != 'x'){
        return parseInt(b)
      } else {
        return b
      }
    })
    const len = buses.length
    let offsetts = []
    let moduli = []
    for (let i=0; i < len; i ++){
      if (buses[i] != 'x'){
        offsetts.push(i)
        moduli.push(buses[i])
      }
    }
    
    // My own code for chinese remainder theorem
    const lg = moduli.length
    let remainders = []
    n_prod = 1
    for (let i = 0; i < lg; i++){
      remainders.push(moduli[i] - offsetts[i])
      n_prod *= moduli[i]
    }
    let n = []
    for (let i = 0; i < lg; i ++){
      n.push(parseInt(n_prod / moduli[i]))
    }
    let x = []
    for (let i = 0; i < lg; i ++){
      let z = n[i] % moduli[i]
      if (z == 1){
        x.push(1)
        continue
      }
      let a = 0
      let y = 1
      while (a != 1){
        y += 1
        a = (z * y) % moduli[i]
      }
      x.push(y)
    }

    let prod_up = []
    for (let i = 0; i < lg; i ++){
      prod_up.push((remainders[i] * n[i] * x[i]))

    }
    t = 0
    for (let i = 0; i < lg; i ++){
      t += prod_up[i]
    }
    t = t % n_prod

    resolve(t)
  
})


module.exports = {
  part1,
  part2
};