const part1 = data =>
  new Promise(resolve => {
    const lst = data.split("\n\n");
    let count = 0;
    const have = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
    for(let p = 0; p<lst.length; p++) {
      let num = 0;
      let n = lst[p].split(":"); 
      for(let e=0; e<n.length; e++) {
        for(let h=0; h<7; h++) {
          if (n[e].includes(have[h])){ num += 1 }
        }
      }
      if (num == 7){count += 1}
    }
    resolve(count);
  
  });


const part2 = data =>
  new Promise(resolve => {
    const lst = data.split("\n\n");
    let count = 0;
    const eye_colours = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
    for(let p = 0; p<lst.length; p++) {
      let num = 0;
      const n = lst[p].split(" ")
      const updated_n = []
      for (let e=0; e<n.length; e++) {
        if (n[e].includes("\n")) {
          temp = n[e].split("\n");
          for (let t=0; t<temp.length; t++) {
            updated_n.push(temp[t])
          }
        } else {updated_n.push(n[e])}
      }

      for(let el=0; el<updated_n.length; el++) {
        const kv = updated_n[el].split(":");
        if (kv[0] == 'byr' && parseInt(kv[1]) >= 1920 && parseInt(kv[1]) <= 2002){
          num += 1
        }else if (kv[0] == 'iyr' && parseInt(kv[1]) >= 2010 && parseInt(kv[1]) <= 2020){
          num += 1
          
        }else if (kv[0] == 'eyr' && parseInt(kv[1]) >= 2020 && parseInt(kv[1]) <= 2030){
          num += 1
      
        }else if (kv[0] == 'hgt' && /^[0-9]+(cm|in)$/.test(kv[1])){
          if (kv[1].includes('cm')){
            let g = kv[1].split('cm')
            if (parseInt(g[0]) >= 150 && parseInt(g[0]) <= 193){
              num += 1
            }
          }else if (kv[1].includes('in')){
            let g = kv[1].split('in')
            if (parseInt(g[0]) >= 59 && parseInt(g[0]) <= 76){
              num += 1
            }
          }     
        }else if (kv[0] == 'hcl' && /^[#][0-9a-f]{6}$/.test(kv[1])){
          num += 1
          
        }else if (kv[0] == 'ecl' && eye_colours.includes(kv[1])){
          num += 1
        }  
        else if (kv[0] == 'pid' && /^[0-9]{9}$/.test(kv[1])){
          num += 1
        }
      }
      if (num == 7){
        count += 1
      }
    
    
    }
    resolve(count);
  
  });


module.exports = {
  part1,
  part2
};