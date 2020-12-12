const part1 = data =>
  new Promise(resolve => {
    const nums  = data.split("\n").map((n) => {
      return parseInt(n);
    });
    const preamble = 25;
    for (let n = preamble; n < nums.length; n++){
      const add_up_to = nums[n];
      found = false;
      for (let p1 = n-preamble; p1 < n; p1++){
        for (let p2 = p1 + 1; p2 < n; p2++) {
          if (nums[p1] + nums[p2] == add_up_to){
            found = true;
          }
          if (found){
            break;
          }
        }
        if(found){
          break;
        }
      }
      if (found == false){
        resolve(add_up_to);
      }
    }
      
  });

const part2 = (data) => 
  new Promise(resolve => {
    const nums  = data.split("\n").map((n) => {
      return parseInt(n);
    });
    const num = 756008079;
    let temp = num;
    let contigious = []
    let i = 0;
    while (temp != 0) {
      if (temp == 0){
        console.log(temp)
        break;
      }
      temp = num;
      contigious.length = 0;
      for (let n = i; n < nums.length; n++){
        if (nums[n] != num){
          temp -= nums[n];
          contigious.push(nums[n]);
        }
        if (temp == 0){
          break;
        } 
      }
      i += 1;
    }  
    resolve(Math.max(...contigious) + Math.min(...contigious));
});

module.exports = {
  part1,
  part2
};