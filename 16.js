const part1 = data =>
  new Promise(resolve => {
    const lst = data.split("\n\n");
    const rules = [];
    const wrong = [];
    const valid = [];
    const current_order = [];
    lst[0].split("\n").map((i) => {
      let nums = i.split(": ");
      current_order.push(nums[0]);
      let parts = nums[1].split(" or ");
      let arr = []
      parts.map((p) => {
        let sub = p.split("-");
        let t = [parseInt(sub[0]), parseInt(sub[1])];
        arr.push(t);
        return;
      })
      rules.push(arr);
      return;
    })
    lst[2].split("\n").map((i) => {
      if (i == "nearby tickets:"){
        return;
      }
      const nums = i.split(",").map((n) => {
        return parseInt(n);
      })
      let valid_check = 0
      nums.map((n) => {
        let invalid = 0;
        rules.map((r) => {
          r.map((q) => {
            if (n< q[0] || n > q[1]){
              invalid += 1;
            }
            return;
          })
          
          return; 
        }) 
        if (invalid == rules.length * 2){
          wrong.push(n);
          valid_check += 1;
        }
        return;  
      })
      if (valid_check == 0){
        valid.push(nums);
      }
      return;
    });
    const my_ticket = []
    lst[1].split("\n").map((x) => {
      if (x != "your ticket:"){
        x.split(",").map((i) => {
           my_ticket.push(parseInt(i));
           return;
        })
      }
      return;
    })
    //resolve(wrong.reduce((a, b) => a + b, 0));
    resolve([current_order, rules, my_ticket, valid])
  });

const part2 = data =>
  
  new Promise(resolve => {
    part1(data).then((info) => {
      const order = [];
      const length = info[0].length;
      for (let x = 0; x < length; x++){
        let counts = [];
        for (let r = 0; r<length; r++){
          let count = 0;
          info[3].map((t) => {
            if (t[x] >= info[1][r][0][0] && t[x] <= info[1][r][0][1]){
              count += 1;
            }
              
            else if (t[x] >= info[1][r][1][0] && t[x] <= info[1][r][1][1]){
               count += 1;
            }
            return;
          }) 
          counts.push(count)  
          
        } 
        let arr = []  
        for (let c = 0; c<counts.length; c++){
          if (counts[c] == info[3].length){
            arr.push(info[0][c])
          }
            
        }
          
        if (arr.length > 0){
          order.push(arr)
        }
      }
      const new_order = {}
      while (Object.keys(new_order).length < length){
        for (let o = 0; o<order.length; o++){
          if (order[o].length == 1){
            new_order[o] = order[o][0]
            order.map((i) =>{
              if (i.includes(new_order[o]) >= 0 && i != order[o]){
                i.splice(i.indexOf(order[o][0]), 1)
              }
              return;
                
            })
          }
              
        }
      }
      
      let final = 1
      for (const [key, value] of Object.entries(new_order)){
        if (value.includes("departure ")){
          final *= info[2][key]
        }  
      }
      resolve(final)
    });
   
  });


module.exports = {
  part1,
  part2
};
