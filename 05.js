const part1 = data =>
  new Promise(resolve => {
    const lst = data.split("\n");
    const id_list = lst.map((p) => {
      let rows = [];
      for (let r = 0; r< 128; r++) {
        rows.push(r);
      }
      let columns = [];
      for (let c = 0; c< 8; c++) {
        columns.push(c);
      }
      
      const row = p.slice(0,7);
      const column = p.slice(7, p.length);
      for (let r = 0; r< 7; r++){
        let half = Math.ceil(rows.length / 2);
        if (row[r] == 'F'){rows.splice(half, rows.length)}
        else{rows.splice(0,half)}
      }
      for (let c = 0; c< 3; c++){
        let half = Math.ceil(columns.length / 2);
        if (column[c] == 'L'){columns.splice(half, columns.length)}
        else{columns.splice(0,half)}
      }
      return (rows[0] * 8) + columns[0];
    });
    resolve(Math.max(...id_list));
  });

const part2 = data =>
  new Promise(resolve => {
    lst = data.split("\n")
    seats = {};
    for (let r = 0; r< 128; r++) {
          seats[r] = [0,0,0,0,0,0,0,0];
    }
    lst.map((p) => {
      let rows = [];
      for (let r = 0; r< 128; r++) {
        rows.push(r);
      }
      let columns = [];
      for (let c = 0; c< 8; c++) {
        columns.push(c);
      }
      
      const row = p.slice(0,7);
      const column = p.slice(7, p.length);
      for (let r = 0; r< 7; r++){
        let half = Math.ceil(rows.length / 2);
        if (row[r] == 'F'){rows.splice(half, rows.length)}
        else{rows.splice(0,half)}
      }
      for (let c = 0; c< 3; c++){
        let half = Math.ceil(columns.length / 2);
        if (column[c] == 'L'){columns.splice(half, columns.length)}
        else{columns.splice(0,half)}
      }
      seats[rows[0]][columns[0]] = (rows[0] * 8) + columns[0];
      return
    });

    for (let [key, value] of Object.entries(seats)) {
      for(let v=0; v<8; v++) {
        if (value[v] == 0 && value[v-1] !== 0 && value[v+1] != 0){
          resolve(((key * 8) + v));
        }
      }
    }
  });

module.exports = {
  part1,
  part2
};