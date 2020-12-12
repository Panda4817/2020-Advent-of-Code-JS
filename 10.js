const part1 = data =>
  new Promise(resolve => {
    const nums = data.split("\n").map((d) => {
      return parseInt(d);
    });
    nums.push(0);
    nums.push(Math.max(...nums) + 3)
    const sorted_nums = nums.sort(function(a, b){return a-b});
    let ones = 0;
    let threes = 0;
    for (let i=0; i < sorted_nums.length - 1; i++){
      for (let j=i+1; j < i+2; j++){
        if (sorted_nums[j] - sorted_nums[i] == 1) {
          ones += 1;
        } else if (sorted_nums[j] - sorted_nums[i] == 3) {
          threes += 1;
        }
      }
    }
    resolve(ones * threes)
  });

const part2 = data =>
  new Promise(resolve => {
    const nums = data.split("\n").map((d) => {
      return parseInt(d);
    });
    nums.push(0);
    nums.push(Math.max(...nums) + 3);
    const sorted_nums = nums.sort(function(a, b){return a-b});
    let must = [0];
    for (let i = 0; i< nums.length - 1; i++){
      for (let j = i+ 1 ; j < i+ 2; j++){
        if (nums[j] - nums[i] == 3){
          if (must.indexOf(nums[i]) < 0){
            must.push(nums[i]);
          }
          if (must.indexOf(nums[j]) < 0){
            must.push(nums[j]);
          }
        }
          
      }
    }
    
    function numOfArrangements(l){
      if (l == 1){
        return 2;
      }else if (l == 2){
        return 4;
      } else if (l == 3){
        return 7;
      }
    }
      

    let a = 1;
    for (let i = 0; i < must.length -1; i++) {
      let xmin = nums.indexOf(must[i]);
      let xmax = nums.indexOf(must[i + 1]);
      arr = nums.slice(xmin, xmax + 1);
      if(arr.length < 3){
        continue;
      }
      a *= numOfArrangements(arr.length - 2);
    }
    resolve(a)

  });

module.exports = {
  part1,
  part2
};