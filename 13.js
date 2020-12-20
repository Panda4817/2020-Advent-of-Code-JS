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

module.exports = {
  part1,
  //part2
};