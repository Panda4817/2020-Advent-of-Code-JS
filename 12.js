const part1 = data =>
  new Promise(resolve => {
    const nav = data.split("\n")
    const n = 'N'
    const s = 'S'
    const w = 'W'
    const e = 'E'
    const f = 'F'
    const r = 'R'
    const l = 'L'
    let current_face = e
    let n_s_val = 0
    let e_w_val = 0
    let rotate = 0

    nav.map((d) => {
      const val = parseInt(d.slice(1,d.length))

      if (d[0] == f){
        if (current_face == e){
           e_w_val += val;
        }
         
        else if (current_face == w){
          e_w_val -= val;
        }
          
        else if (current_face == n){
          n_s_val += val;
        }
          
        else if (current_face == s){
          n_s_val -= val;
        }
          
      }
        
      
      else if (d[0] == e){
        e_w_val += val
      }

      else if (d[0] == w){
        e_w_val -= val
      }

      else if (d[0] == n){
        n_s_val += val
      }

      else if (d[0] == s){
        n_s_val -= val
      }
        
      else if (d[0] == r){
        rotate += val
      }
        
      
      else if (d[0] == l){
        rotate -= val
      }
        
      
      rotate = rotate % 360
      if ((rotate == 90) || (rotate == -270)){
         current_face = s
      }
       
      else if ((rotate == 180) || (rotate == -180)){
        current_face = w
      }
        
      else if ((rotate == 270) || (rotate == -90)){
        current_face = n
      }
        
      else{
        current_face = e
      }
      return;
    });
    resolve(Math.abs(e_w_val) + Math.abs(n_s_val))
  });

const part2 = data =>
  new Promise(resolve => {
    const nav = data.split("\n")
    const n = 'N'
    const s = 'S'
    const w = 'W'
    const e = 'E'
    const f = 'F'
    const r = 'R'
    const l = 'L'
    let way_e_val = 10
    let way_n_val = 1
    let n_s_val = 0
    let e_w_val = 0
    let rotate = 0

    nav.map((d) => {
      const val = parseInt(d.slice(1,d.length));
      
      if (d[0] == e){
        way_e_val += val
      }
        
      
      else if (d[0] == w){
        way_e_val -= val
      }
        
      
      else if (d[0] == n){
        way_n_val += val
      }
        
      
      else if (d[0] == s){
        way_n_val -= val
      }
        
      
      else if (d[0] == f){
        let temp_e = val * way_e_val
        let temp_n = val * way_n_val
        n_s_val += temp_n
        e_w_val += temp_e
      }
        
      
      else if (d[0] == r){
        if (val == 90){
          let temp_e = way_n_val
          let temp_n = -way_e_val
          way_e_val = temp_e
          way_n_val = temp_n
        }
          
        else if (val == 180){
          let temp_e = -way_e_val
          let temp_n = -way_n_val
          way_e_val = temp_e
          way_n_val = temp_n
        }
          
        else if (val == 270){
          let temp_e = -way_n_val
          let temp_n = way_e_val
          way_e_val = temp_e
          way_n_val = temp_n
        }
          
      }
        
      
      else if (d[0] == l){
        if (val == 90){
          let temp_e = -way_n_val
          let temp_n = way_e_val
          way_e_val = temp_e
          way_n_val = temp_n
        }
          
        else if (val == 180){
          let temp_e = -way_e_val
          let temp_n = -way_n_val
          way_e_val = temp_e
          way_n_val = temp_n
        }
          
        else if (val == 270){
          let temp_e = way_n_val
          let temp_n = -way_e_val
          way_e_val = temp_e
          way_n_val = temp_n
        }
          
      }
        

    });

    resolve(Math.abs(e_w_val) + Math.abs(n_s_val))
  });

module.exports = {
  part1,
  part2
};