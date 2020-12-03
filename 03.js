const part1 = data =>
  new Promise(resolve => {
    setTimeout(() => {
      const lst = data.split("\n");
      let count = 0;
      let along = 3;
      for (let i=1; i<lst.length; i++) {
        let s = lst[i];
        while(along > s.length-1){
          s += lst[i];
        }
        if (s[along] == '#'){
          count += 1;
        }
        along += 3;
      }
      resolve(count);
    }, 1000);
  
  });

const part2 = data =>
  new Promise(resolve => {
    setTimeout(() => {
      const lst = data.split("\n");
      const increase_by = [1, 5, 7, 1];
      let along = [1, 5, 7, 1];
      let count = [0, 0, 0, 0];
      for(let a = 0; a< 4; a++){
        if (a == 3){
          for (let r = 2; r< lst.length; r+=2) {
            s = lst[r];
            while(along[a] > s.length-1){
              s += lst[r];
            }
            if (s[along[a]] == '#'){
              count[a] += 1;
            }
            along[a] += increase_by[a];
          }
        }else{
          for (let r = 1; r< lst.length; r++) {
            s = lst[r];
            while(along[a] > s.length-1){
              s += lst[r];
            }
            if (s[along[a]] == '#'){
              count[a] += 1;
            }
            along[a] += increase_by[a];
          }
        }
      }
      resolve(count[0]*count[1]*count[2]*count[3]*193);
    }, 1000);
  
  });


module.exports = {
  part1,
  part2
};