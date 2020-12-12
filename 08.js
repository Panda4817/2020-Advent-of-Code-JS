const part1 = data =>
  new Promise(resolve => {
    const lst = data.split("\n");
    const instructions = [];
    
    lst.map((l) => {
      let parts = l.split(" ");
      instructions.push([parts[0], parseInt(parts[1]), 0]);
      return;
    })
      

    let count = 0
    let current = 0
    let a = 0

    while(count < 2){
      instructions[current][2] += 1;
      count = instructions[current][2];
      if (count == 2){
        break;
      }
        
      if (instructions[current][0] == 'nop'){
        current += 1;
      } 
      else if (instructions[current][0] == 'acc'){
        a += instructions[current][1];
        current += 1;
      }  
      else{
        current += instructions[current][1];
      }
        
    }
       
    resolve(a)
  });

const part2 = data =>
  new Promise(resolve => {
    const lst = data.split("\n");
    const instructions = [];
    lst.map((l) => {
      let parts = l.split(" ");
      instructions.push([parts[0], parseInt(parts[1]), 0]);
      return;
    })

    let i = [];
    for (let j = 0; j < instructions.length; j++) {
      t = []
      for (let k = 0; k < instructions[j].length; k++){
        t.push(instructions[j][k]);
      }
      i.push(t)
    }
    let count = 0;
    let current = 0;
    let a = 0;
    let tryNum = 0;
    
    while(current < i.length){
      if (current >= i.length){
        break;
      }
      a = 0;
      count = 0;
      current = 0;
      i = [];
      for (let j = 0; j < instructions.length; j++) {
        t = []
        for (let k = 0; k < instructions[j].length; k++){
          t.push(instructions[j][k]);
        }
        i.push(t)
      }
      if (i[tryNum][0] == 'jmp'){
        i[tryNum][0] = 'nop';
      } else if (i[tryNum][0] == 'nop') {
        i[tryNum][0] = 'jmp';
      } else {
        tryNum += 1;
        continue;
      }
      while(current < i.length || count < 2){
        if (current >= i.length){
          break;
        }
        i[current][2] += 1;
        count = i[current][2];
        if (count == 2){
          break;
        }
        if (i[current][0] == 'nop'){
          current += 1;
        }else if (i[current][0] == 'acc'){
          a += i[current][1];
          current += 1;
        }else{
          current += i[current][1];
        }
      }
      tryNum += 1;

    }
      
    resolve(a);
  });

module.exports = {
  part1,
  part2
};