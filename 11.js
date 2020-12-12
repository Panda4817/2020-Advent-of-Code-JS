const part1 = data =>
  new Promise(resolve => {
    let seats = data.split("\n");
  
    function check(y, x, h, w){
      if (y < 0 || y >= h){
        return false;
      }  
      else if (x < 0 || x >= w){
        return false;
      } 
      return true;
    }

    function get_adj(y, x){
      neighbores = [];
      neighbores.push([y - 1, x]);
      neighbores.push([y + 1, x]);
      neighbores.push([y, x - 1]);
      neighbores.push([y, x + 1]);
      neighbores.push([y - 1, x - 1]);
      neighbores.push([y - 1, x + 1]);
      neighbores.push([y + 1, x - 1]);
      neighbores.push([y + 1, x + 1]);
      return neighbores;
    }
      

    let changed = true;
    let taken = 0
    while (changed == true){
      let new_plan = [];
      taken = 0;
      for (let s= 0; s < seats.length; s++){
        let row = '';
        for(let r = 0; r < seats[s].length; r++){
          if (seats[s][r] == '.'){
            row += '.';
            continue;
          }
          let num = 0;
          const neighbores = get_adj(s, r);
          neighbores.map((n) => {
            if (check(n[0], n[1], seats.length, seats[s].length) == false){
              return;
            }
            if (seats[n[0]][n[1]] == '#'){
              num += 1;
            }
            return;
          });
          if (num == 0 && seats[s][r] == 'L'){
            row += '#';
            taken += 1;
          }else if (num >= 4 && seats[s][r] == '#'){
            row += 'L';
          }else{
            if (seats[s][r] == '#'){
              taken += 1;
            }  
            row += seats[s][r];
          }
        }
        new_plan.push(row);
      }

      if (JSON.stringify(new_plan) == JSON.stringify(seats)){
        changed = false;
        break;
      }else{
        seats = [];
        seats = [...new_plan];
      }
    }
    
    resolve(taken);

  });

const part2 = data =>
  new Promise(resolve => {
    let seats = data.split("\n");

    function check(y, x, h, w){
      if (y < 0 || y >= h){
        return false;
      }  
      else if (x < 0 || x >= w){
        return false;
      } 
      return true;
    }
    
    function get_num_taken_seats(y, x, h, w, arr){
      let num = 0;
      for (let i= 1; i<h; i++){
        let temp_y = y - i;
        if (check(temp_y, x, h, w)){
          if (arr[temp_y][x] == '#' || arr[temp_y][x] == 'L'){
            if (arr[temp_y][x] == '#'){
              num += 1;
            } 
            break;
          }   
        } 
        else{
          break;
        }
      }

      for (let i= 1; i<h; i++){
        let temp_y = y + i;
        if (check(temp_y, x, h, w)){
          if (arr[temp_y][x] == '#' || arr[temp_y][x] == 'L'){
            if (arr[temp_y][x] == '#'){
              num += 1;
            } 
            break;
          }   
        } 
        else{
          break;
        }
      }

      for (let i= 1; i<w; i++){
        let temp_x = x - i;
        if (check(y, temp_x, h, w)){
          if (arr[y][temp_x] == '#' || arr[y][temp_x] == 'L'){
            if (arr[y][temp_x] == '#'){
              num += 1;
            } 
            break;
          }   
        } 
        else{
          break;
        }
      }

      for (let i= 1; i<w; i++){
        let temp_x = x + i;
        if (check(y, temp_x, h, w)){
          if (arr[y][temp_x] == '#' || arr[y][temp_x] == 'L'){
            if (arr[y][temp_x] == '#'){
              num += 1;
            } 
            break;
          }   
        } 
        else{
          break;
        }
      }
      
      let x_minus = 1;
      for (let i = 1; i< h; i++){
        let temp_y = y - i;
        let temp_x = x - x_minus;
        if (check(temp_y, temp_x, h, w)){
          if (arr[temp_y][temp_x] == '#' || arr[temp_y][temp_x] == 'L'){
            if (arr[temp_y][temp_x] == '#'){
               num += 1;
            }
            break;
          }
        }
        else {
          break;
        }
        x_minus += 1;
      }

      let x_plus = 1;
      for (let i = 1; i< h; i++){
        let temp_y = y - i;
        let temp_x = x + x_plus;
        if (check(temp_y, temp_x, h, w)){
          if (arr[temp_y][temp_x] == '#' || arr[temp_y][temp_x] == 'L'){
            if (arr[temp_y][temp_x] == '#'){
               num += 1;
            }
            break;
          }
        }
        else {
          break;
        }
        x_plus += 1;
      }

      x_minus = 1;
      for (let i = 1; i< h; i++){
        let temp_y = y + i;
        let temp_x = x - x_minus;
        if (check(temp_y, temp_x, h, w)){
          if (arr[temp_y][temp_x] == '#' || arr[temp_y][temp_x] == 'L'){
            if (arr[temp_y][temp_x] == '#'){
               num += 1;
            }
            break;
          }
        }
        else {
          break;
        }
        x_minus += 1;
      }

      x_plus = 1;
      for (let i = 1; i< h; i++){
        let temp_y = y + i;
        let temp_x = x + x_plus;
        if (check(temp_y, temp_x, h, w)){
          if (arr[temp_y][temp_x] == '#' || arr[temp_y][temp_x] == 'L'){
            if (arr[temp_y][temp_x] == '#'){
               num += 1;
            }
            break;
          }
        }
        else {
          break;
        }
        x_plus += 1;
      }
      
      return num;
    }
 
    let changed = true
    let taken = 0
    while (changed == true){
      let new_plan = [];
      taken = 0;
      for (let s = 0; s < seats.length; s++){
        let row = '';
        for (let r=0; r< seats[s].length; r++){
          if(seats[s][r] == '.'){
            row += '.';
            continue;
          }
          const num = get_num_taken_seats(s, r, seats.length, seats[s].length, seats);
          if (num == 0 && seats[s][r] == 'L'){
            row += '#';
            taken += 1;
          }else if (num >= 5 && seats[s][r] == '#'){
            row += 'L';
          }else{
            if (seats[s][r] == '#'){
              taken += 1;
            }  
            row += seats[s][r];
          }
        }
        new_plan.push(row);
      }
      if (JSON.stringify(new_plan) == JSON.stringify(seats)){
        changed = false;
        break;
      }else{
        seats = [];
        seats = [...new_plan];
      }
    }
    resolve(taken);
  });

module.exports = {
  part1,
  part2
};