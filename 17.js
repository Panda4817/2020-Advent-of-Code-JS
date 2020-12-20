const part1 = data =>
  new Promise(resolve => {
    const cubes = data.split("\n");
    const cycles = 6;
    const c = {};
    const z = 0;
    for (let y = 0; y<cubes.length; y++){
      for (let x = 0; x<cubes[y].length; x++){
        c[[x, y, z]] = cubes[y][x];
      }
    }
    
    function find_neighbores(cube){
      const arr = [];
      for (let z = cube[2] - 1; z<cube[2] + 2; z++){
        for (let y = cube[1] - 1; y<cube[1] + 2; y++){
          for (let x = cube[0] - 1; x<cube[0] + 2; x++){
            if (x == cube[0] && y == cube[1] && z ==cube[2]){
              continue;
            } else {
              arr.push([x, y, z]);
            }
              
          }
        }
      }
        
      return arr; 
    }
      

    for (let i = 0; i<cycles; i++){
      let dic = JSON.parse(JSON.stringify(c));
      for (const [k, v] of Object.entries(dic)){
        let cube = k.split(",").map((l) => { return parseInt(l);})
        let neighbores = find_neighbores(cube)
        neighbores.map((n) => {
          if (n.toString() in dic){
            return;
          }else{
            c[n.toString()] = '.';
          }  
          return;
        })
      }

      dic = JSON.parse(JSON.stringify(c));
      for (const [k, v] of Object.entries(dic)){
        let cube = k.split(",").map((l) => { return parseInt(l) })
        let neighbores = find_neighbores(cube)
        let count = 0
        neighbores.map((n) => {
          if (n.toString() in dic){
            if (dic[n.toString()] == '#'){
               count += 1;
            }  
          }
          return;
        })
        if (v == '#'){
          if (count == 2 || count == 3) {
            c[k] = '#'
          }else{
            c[k] = '.'
          }
            
        }else{
          if (count == 3){
            c[k] = '#'
          }else{
            c[k] = '.'
          }
            
        }
          
      }

    }
    
    let num = 0;
    for (const [k, v] of Object.entries(c)){
      if (v == '#'){
         num += 1;
      }
       
    }
    resolve(num);
  });

const part2 = data =>
  new Promise(resolve => {
    const cubes = data.split("\n")
    const cycles = 6
    const c = {}
    const z = 0
    const w = 0
    
    for (let y = 0; y<cubes.length; y++){
      for (let x = 0; x<cubes[y].length; x++){
        c[[x, y, z, w]] = cubes[y][x]
      }
    }
    
    function find_neighbores(cube){
      const arr = []
      for (let w = cube[3] - 1; w<cube[3] + 2; w++){
        for (let z = cube[2] - 1; z<cube[2] + 2; z++){
          for (let y = cube[1] - 1; y<cube[1] + 2; y++){
            for (let x = cube[0] - 1; x<cube[0] + 2; x++){
              if (x == cube[0] && y == cube[1] && z ==cube[2] && w == cube[3]){
              continue;
            } else {
              arr.push([x, y, z, w]);
            }
                
            }
          }
        }
      }
        
      return arr    
    }
      

    for (let i = 0; i<cycles; i++){
      let dic = JSON.parse(JSON.stringify(c));
      for (const [k, v] of Object.entries(dic)){
        let cube = k.split(",").map((i) => {
          return parseInt(i)
        })
        let neighbores = find_neighbores(cube)
        neighbores.map((n) => {
          if (n.toString() in dic){
             return;
          }else{
            c[n.toString()] = '.';
          }
            
          return;
        })
      }

      dic = JSON.parse(JSON.stringify(c));
      for (const [k, v] of Object.entries(dic)){
        let cube = k.split(",").map((i) => {
          return parseInt(i);
        })
        let neighbores = find_neighbores(cube);
        let count = 0;
        neighbores.map((n) => {
          if (n.toString() in dic){
            if (dic[n.toString()] == '#'){
               count += 1;
            }  
          }
          return;
        })
        if (v == '#'){
          if (count == 2 || count == 3) {
            c[k] = '#';
          }else{
            c[k] = '.';
          }
            
        }else{
          if (count == 3){
            c[k] = '#';
          }else{
            c[k] = '.';
          }
            
        }
          
      }

    }
    
    num = 0
    for (const [k, v] of Object.entries(c)){
      if (v == '#'){
         num += 1;
      }
       
    }
    resolve(num);
  });

module.exports = {
  part1,
  part2
};