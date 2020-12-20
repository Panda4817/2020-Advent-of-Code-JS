const part1 = data =>
  new Promise(resolve => {
    const nums = data.split(",").map((n) => {return parseInt(n)});
    console.log(nums);
    const length = nums.length;
    const turns = {};
    let last_number = 0;
    const turn = 2020;
    for (let i = 0; i<length; i++) {
      turns[nums[i]] = [];
      turns[nums[i]].push(i + 1);
      last_number = nums[i]
    }
    console.log(turns)
    for (let i = length + 1; i<turn + 1; i++){
      let arr = [...turns[last_number]]
      if (arr.length == 1){
        turns[0].push(i);
        last_number = 0;
      }  
      else{
        let new_number = arr.slice(-1) - arr.slice(-2, -1);
        if (new_number in turns){
          turns[new_number].push(i);
        }else{
          turns[new_number] = [];
          turns[new_number].push(i)
        }
        last_number = new_number;
      }
    }
    console.log(turns)
    resolve(last_number);
  });


module.exports = {
  part1,
  //part2
};
