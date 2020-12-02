const part1 = data =>
  new Promise(resolve => {
    setTimeout(() => {
      const passwords  = data.split("\n");
      let overall = 0;
      for (let i=0; i<passwords.length; i++) {
        const parts = passwords[i].split(" ");
        const pol1_pol2 = parts[0].split("-");
        const letter = parts[1].split(":")[0];
        console.log(parts[2], pol1_pol2, letter)
        let count = 0;
        for (let j=0; j<parts[2].length; j++) {
          if (parts[2][j] == letter) {
            count ++;
          }
        }
        if (count >= parseInt(pol1_pol2[0]) && count <= parseInt(pol1_pol2[1])){
          overall ++;
        }
      }
      resolve(overall);
    }, 1000);
  
  });

const part2 = data =>
  new Promise(resolve => {
    setTimeout(() => {
      const passwords  = data.split("\n");
      let overall = 0;
      for (let i=0; i<passwords.length; i++) {
        const parts = passwords[i].split(" ");
        const pol1_pol2 = parts[0].split("-");
        const letter = parts[1].split(":")[0];
        const pos = [parseInt(pol1_pol2[0]) - 1, parseInt(pol1_pol2[1]) - 1];
        console.log(parts[2], pos, letter)
        try{
          if (parts[2][pos[0]] == letter && parts[2][pos[1]] != letter) {
            overall ++;
          } else if (parts[2][pos[0]] != letter && parts[2][pos[1]] == letter) {
            overall ++;
          } else {
            continue;
          }
        }catch(IndexError) {
          continue;
        }
      }
      resolve(overall);
    }, 1000);

  });

module.exports = {
  part1,
  part2
};