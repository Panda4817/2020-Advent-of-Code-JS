const part1 = data =>
  new Promise(resolve => {
    const lst = data.split("\n");
    const rules = {};
    const gold = 'shiny gold';
    const count = [];
    let to_check = [gold];
    lst.map((r) => {
      const parts = r.split(" bags contain ");
      rules[parts[0]] = [];
      const contains = parts[1].split(", ");
      for (let c = 0; c < contains.length; c++){
        const sub_parts = contains[c].split(" ");
        if (sub_parts[0] != 'no'){
          rules[parts[0]].push(sub_parts[1] + ' ' + sub_parts[2]);
        }
        
      }
      return;
    })

    while(to_check.length > 0){
      let temp = []
      for (let [key, value] of Object.entries(rules)) {
        for (let b = 0; b < value.length; b++) {
          if (to_check.indexOf(value[b]) > -1) {
            if (count.indexOf(key) < 0) {
              temp.push(key);
              count.push(key);
            }
            break;
          }
        }
      }
      to_check = temp;
    }

    resolve(count.length);

  });

const part2 = data =>
  new Promise(resolve => {
    const lst = data.split("\n");
    const rules = {};
    const gold = 'shiny gold';
    lst.map((r) => {
      const parts = r.split(" bags contain ");
      rules[parts[0]] = {};
      const contains = parts[1].split(", ");
      for (let c = 0; c < contains.length; c++){
        const sub_parts = contains[c].split(" ");
        if (sub_parts[0] != 'no'){
          rules[parts[0]][sub_parts[1] + ' ' + sub_parts[2]] = parseInt(sub_parts[0]);
        }
        
      }
      return;
    })

    function recursion(colour){
      let bag_total = 0;
      for (let [key, value] of Object.entries(rules[colour])) {
        bag_total += value;
        bag_total += recursion(key) * value;
      }
      return bag_total;
    }

    const total = recursion(gold);
      
    resolve(total);
    
  });

module.exports = {
  part1,
  part2
};

