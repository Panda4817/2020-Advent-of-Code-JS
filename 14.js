const part1 = data =>
  new Promise(resolve => {
    const lst = data.split("\n");
    const mem = {};
    let current_mask = "";
    lst.map((l) => {
      if (l.slice(0,4) == 'mask'){
        current_mask = l.slice(7,l.length);
      }else{
        let parts = l.split(" = ");
        let key = parts[0].slice(4,-1);
        let num = parseInt(parts[1]);
        mem[key] = num;
        let binary = num.toString(2);
        console.log(binary);
        let r = current_mask.length - binary.length;
        let extra = '';
        for (let i = 0; i<r; i++){
          extra += '0';
        } 
        let current_val = extra + binary;
        let new_val = '';
        for (let i = 0; i<36; i++){
          if (current_mask[i] == 'X'){
             new_val += current_val[i];
          }else{
            new_val += current_mask[i];
          }  
        } 
        let new_val_int = parseInt(new_val, 2)
        mem[key] = new_val_int
      }
      return
    })
    resolve(Object.values(mem).reduce((a, b) => a + b, 0));
  });

const part2 = data =>
  new Promise(resolve => {
    const lst = data.split("\n");
    const mem = {};
    let current_mask = "";
    function product(iterables, repeat) {
      var argv = Array.prototype.slice.call(arguments), argc = argv.length;
      if (argc === 2 && !isNaN(argv[argc - 1])) {
        var copies = [];
        for (var i = 0; i < argv[argc - 1]; i++) {
          copies.push(argv[0].slice()); // Clone
        }
        argv = copies;
      }
      return argv.reduce(function tl(accumulator, value) {
        var tmp = [];
        accumulator.forEach(function(a0) {
          value.forEach(function(a1) {
            tmp.push(a0.concat(a1));
          });
        });
        return tmp;
      }, [[]]);
    }
    lst.map((l) => {
      if (l.slice(0,4) == 'mask'){
        current_mask = l.slice(7,l.length);
      }else{
        let parts = l.split(" = ");
        let key = parseInt(parts[0].slice(4,-1));
        let num = parseInt(parts[1]);
        let binary = key.toString(2);
        let r = current_mask.length - binary.length;
        let extra = '';
        for (let i = 0; i<r; i++){
          extra += '0';
        }  
        let current_val = extra + binary;
        let new_val = '';
        let x_added = 0;
        for (let i=0; i< 36; i++){
          if (current_mask[i] == 'X'){
            new_val += 'X';
            x_added += 1;
          }else if (current_mask[i] == '1'){
            new_val += '1';
          }else{
            new_val += current_val[i];
          }  
        }
          
        if (x_added == 0){
          mem[parseInt(new_val, 2)] = num;
          return;
        }

        let floats = [];
        
        let combi = product([0, 1], x_added);

        for (let i =0; i<combi.length; i++){
          let temp = '';
          let added = 0;
          for (let j = 0; j<new_val.length; j++){
            if (new_val[j] == 'X'){
              temp += combi[i][added].toString();
              if (added != x_added - 1){
                added += 1;
              }
                
            }else{
              temp += new_val[j];
            }
          }
          floats.push(temp);
        }
          
        floats.map((f) => {
          mem[parseInt(f, 2)] = num;
          return;
        })
      }
      return;  
    });
    

  resolve(Object.values(mem).reduce((a, b) => a + b, 0));
  });

module.exports = {
  part1,
  part2
};