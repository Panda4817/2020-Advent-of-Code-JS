const part1 = data =>
  new Promise(resolve => {
    const instructions = data.split("\n")
    const joined = [
      's', 'n'
    ]
    const seperate = [
      'e', 'w'
    ]
    const parsed = []
    instructions.map((i) => {
      let p = []
      for (let c = 0; c <i.length; c++){
        let prev = c - 1
        let nex = c + 1
        if (prev < 0 && seperate.indexOf(i[c]) > -1){
          p.push(i[c])
        }
        else if (seperate.indexOf(i[c]) > -1 && joined.indexOf(i[prev]) < 0){
          p.push(i[c])
        }
          
        else if (joined.indexOf(i[c]) > -1 && seperate.indexOf(i[nex]) > -1){
          p.push(i[c] + i[nex])
        }
      }
      parsed.push(p)
      return
    })
    console.log(parsed)
      

    const tiles = {}
    
    parsed.map((instruction) => {
      let current = [0, 0]
      instruction.map((p) => {
        if (p == 'w'){
          current[0] -= 2
        }
          
        else if (p == 'e'){
          current[0] += 2
        }
          
        else if (p == 'nw'){
          current[0] -= 1
          current[1] += 1
        }
          
        else if (p == 'se'){
          current[0] += 1
          current[1] -= 1
        }
          
        else if (p == 'ne'){
          current[0] += 1
          current[1] += 1
        }
          
        else if (p == 'sw'){
          current[0] -= 1
          current[1] -= 1
        }
        return
        
      })
        
      t = current.toString()
      if (t in tiles){
        if (tiles[t] == 0){
          tiles[t] = 1
        }else if (tiles[t] == 1){
          tiles[t] = 0
        }   
      }
        
      else{
        tiles[t] = 1
      }
      return   
    })
      
    
    // Part 1
    let ans = 0
    for (const [k, v] of Object.entries(tiles)){
      if (v == 1){
        ans += 1
      }
    }
    console.log(ans)
    
    const days = 100

    function get_nbs(tile){
      n = [
        [tile[0] - 2, tile[1]],
        [tile[0] + 2, tile[1]],
        [tile[0] - 1, tile[1] + 1],
        [tile[0] + 1, tile[1] - 1],
        [tile[0] + 1, tile[1] + 1],
        [tile[0] - 1, tile[1] - 1]
      ]
      return n
    }
      

    for (let i = 0; i < days; i++){
      let cp_tiles = JSON.parse(JSON.stringify(tiles))
      for (const [k, v] of Object.entries(tiles)){
        let t = k.split(",").map((j) => {
          if (j != ''){
            return parseInt(j)
          }
          
        })

        let neighbors = get_nbs(t)
        neighbors.map((n) => {
          let m = n.toString()
          if (m in tiles){
            return
          } else {cp_tiles[m] = 0}
          return
        })
      }
        
      for (const [k, v] of Object.entries(cp_tiles)){
        let t = k.split(",").map((j) => {
          if (j != ''){
            return parseInt(j)
          }
        })
        let neighbors = get_nbs(t)
        let how_many_black = 0
        neighbors.map((n) => {
          let m = n.toString()
          if (m in cp_tiles){
            if (cp_tiles[m] == 1){
              how_many_black += 1 
            }
          }
          return
        })
        if (v == 1 && (how_many_black == 0 || how_many_black > 2)){
          tiles[t] = 0
        }else if (v == 0 && how_many_black == 2){
          tiles[t] = 1
        }
      }
    }
    // Part 2
    let ans2 = 0
    for (const [k, v] of Object.entries(tiles)){
      if (v == 1){
        ans2 += 1
      }
    }
    console.log(ans2)

    resolve(ans2)
  })

module.exports = {
  part1,
  // part2 in part 1
};