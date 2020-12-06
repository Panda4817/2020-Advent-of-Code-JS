const part1 = data =>
  new Promise(resolve => {
    const lst = data.split("\n\n");
    let count = 0;
    const az = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i','j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  
  lst.map((l) => {
    const person = l.split("\n");
    let found = [];
    person.map((p) => {
      for(let i=0; i<26; i++) {
        if (p.includes(az[i]) && found.indexOf(az[i]) == -1) {
          found.push(az[i]);
        }
      }
      return;
    });
    count += found.length;
    return;
  });

  resolve(count);

  });

const part2 = data =>
  new Promise(resolve => {
    const lst = data.split("\n\n");
    let count = 0;
    const az = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i','j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  lst.map((l) => {
    const person = l.split("\n");
    for(let i=0; i<26; i++) {
      found = 0
      person.map((p) => {
        if (p.includes(az[i])) {
          found ++;
        }
        return
      })
      if (found == person.length) {
        count ++;
      }
    }
    return;
  });
  
  resolve(count);
    
  });

module.exports = {
  part1,
  part2
};