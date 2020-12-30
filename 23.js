const part1 = data =>
  new Promise(resolve => {
    const nums = data.split("").map((i) => {
      return parseInt(i)
    })
    console.log(nums)
    let mx = Math.max(...nums)
    console.log(mx)
    const cups = {}
    for (let d = 0; d < 9; d++){
      try{
        cups[nums[d]] = nums[d + 1]
      }catch(err){
        continue
      }
            
    }
    cups[nums[8]] = mx + 1 //part 2
    console.log(mx)
    console.log(cups) 
    // cups[nums[nums.length - 1]] = nums[0] // part 1

    // part 2
    for (let i = mx + 1; i< 1000000; i++){
      cups[i] = i + 1
    }    
    cups[1000000] = nums[0]

    const length = Object.keys(cups).length
    mx = 1000000
    let mn = 1
    const moves = 10000000 //part 2 // part 1 is 100
    let decider = nums[0]
    for (let i = 0; i < moves; i++){
      let current = decider
      let one  = cups[decider]
      let two = cups[one]
      let three = cups[two]
      let four = cups[three]
      cups[decider] = four
      let destination = current
      while(destination == one || destination == two || destination == three || destination == current){
        destination -= 1
          if (destination < mn){
            destination = mx
          }
              
      }    
      let nx = cups[destination]
      cups[destination] = one
      cups[one] = two
      cups[two]= three
      cups[three] = nx
      decider = cups[current]
    }

    ////Part 1
    // let ans = ''
    // let x = 1
    // while (ans.length != length - 1){
    //    x = cups[x]
    //    if (x != 1){
    //      ans += str(x)
    //     }         
    //  }     
    
    // part 2
    console.log(cups[1], cups[cups[1]])
    console.log(cups[1] * cups[cups[1]])

    resolve(cups[1] * cups[cups[1]])
        
  })

module.exports = {
  part1,
  // part2 same as part1 with different moves
};