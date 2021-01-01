const nj = require('@0xcmdr/numjs');

const part1 = data =>
  new Promise(resolve => {
    const initial = data.split("\n\n")
    const tiles = initial.map((i) => {
      let lines = i.split("\n")
      let id = 0
      let arr = []
      for(let l = 0; l< lines.length; l++){
        if (l == 0){
          let parts = lines[l].split(" ")
          id = parseInt(parts[1].split(":")[0])
        } else {
          let lst = lines[l].split("").map((j) => {
            if(j == '#'){
              return 1
            }else if (j == '.') {
              return 0
            }
          })
          arr.push(lst)
        }
      }
      if (arr){
        let njlist = nj.array(arr)
        return {'id': id, 'tile': njlist}
      } 
    })
    let sides = parseInt(Math.sqrt(tiles.length))
    let total = sides * 10
    final = nj.zeros([total, total])
    ids = nj.zeros([sides, sides])
    image = nj.zeros([(total - sides*2), (total - sides*2)])

    const all_slices = {'corners':[], 'edges':[], 'middle': []}
    const slices = []
    const arraysMatch = function (arr1, arr2) {

      // Check if the arrays are the same length
      if (arr1.length != arr2.length) return false;

      // Check if all items exist and are in the same order
      for (var i = 0; i < arr1.length; i++) {
        if (arr1[i] != arr2[i]) return false;
      }
      
      return true;

    };
    for (let i=0; i<sides; i++){
      for (let j=0; j<sides; j ++){
        let sl = [i, 1 + i, j, 1 + j]
        slices.push(sl)
        if (arraysMatch(sl, [0,1,0,1]) == true || arraysMatch(sl, [0,1,sides-1,sides]) == true || arraysMatch(sl, [sides-1, sides, 0, 1]) == true || arraysMatch(sl, [sides-1, sides, sides-1, sides]) == true){
          all_slices['corners'].push(sl)
        }
          
        else if ((sl[0] == 0 && sl[1] == 1 && sl[2] >= 0 && sl[2] < sides) || (sl[0] == sides - 1 && sl[1] == sides && sl[2] >= 0 && sl[2] < sides) || (sl[2] == 0 && sl[3] == 1 && sl[0] >= 0 && sl[0] < sides) || (sl[2] == sides - 1 && sl[3] == sides && sl[0] >= 0 && sl[0] < sides)){
          all_slices['edges'].push(sl)
        }
          
        else{
           all_slices['middle'].push(sl)
        }
         
      }
    }

    console.log(all_slices['corners'].length, all_slices['edges'].length, all_slices['middle'].length)

    function get_edges(t){
      let tedges = []
      const eslices = {
        'left': [0,10,0,1],
        'right': [0,10,9,10],
        'up': [0,1,0,10],
        'down': [9,10,0,10]
      }
      for (const[k, v] of Object.entries(eslices)){
        let arr = []
        for (let i = v[0]; i< v[1]; i++ ){
          for (let j = v[2]; j < v[3]; j++){
            arr.push(t.get(i, j))
          }
        }
        tedges.push(arr)
      }
      return tedges
    }
    
    function get_reverse(a){
      let b = Array.from(a)
      return b.reverse()
    }
    const edges = []
    tiles.map((t) => {
      let es = get_edges(t['tile'])
      es.map((k) => {
        let exists = false
        edges.map((e) => {
          if(arraysMatch(e['edge'], k) == true || arraysMatch(e['edge'], get_reverse(k)) == true){
            e['count'] += 1
            exists = true
          }
          return
        })
        if (exists == false){
          edges.push({'edge': k, 'count': 1})
        }
        return
      })
      return
    })
    const outer_edges = []
    edges.map((e) => {
      if (e['count'] % 2 != 0){
        outer_edges.push(e['edge'])
      }
      return
    })
    console.log(sides, total, outer_edges.length)

    corner_tiles = []
    edge_tiles = []
    middle_tiles = []

    tiles.map((t) => {
      let num_outer_edges = 0
      let es = get_edges(t['tile'])
      es.map((e) => {
        outer_edges.map((o) => {
          if (arraysMatch(e, o) || arraysMatch(e, get_reverse(o))){
            num_outer_edges += 1
          }
          return
        })
        return
      })
      if (num_outer_edges == 2){
        corner_tiles.push(t)
      } else if (num_outer_edges == 1) {
        edge_tiles.push(t)
      } else{
        middle_tiles.push(t)
      }
      return
    })
    console.log(corner_tiles.length, edge_tiles.length, middle_tiles.length)

    // Check if 0 in ids
    function isThereZeros(){
       for (let i=0; i<sides; i++){
        for (let j=0; j<sides; j++){
          let x = ids.get(i, j)
          if (x === 0){
            return true
          }
        }
      }
      return false
    }
    function isTilePlaced(s){
      let x = ids.get(s[0], s[2])
      if (x != 0){
        return true
      } else {
        return false
      }
    }
    // Check if tile id already used
    function tileUsed(id){
      for (let i=0; i<sides; i++){
        for (let j=0; j<sides; j++){
          let x = ids.get(i, j)
          if (x == id){
            return true
          }
        }
      }
      return false
    }
    // get neighbores (via ids)
    function get_neighbores(s){
      let nids = {}
      if (s[0] != 0 && s[1] != 0) {
        nids['up'] = [s[0]-1,s[1]-1, s[2],s[3]]
      }else {nids['up'] = null}
      if (s[0] != sides && s[1] != sides) {
        nids['down'] = [s[0]+1,s[1]+1, s[2],s[3]] 
      }else {nids['down'] = null}
      if (s[2] != 0 && s[3] != 0) {
        nids['left'] = [s[0],s[1], s[2] -1,s[3] - 1]
      }else {nids['left'] = null}
      if (s[2] != sides && s[3] != sides) {
        nids['right'] = [s[0],s[1], s[2]+1,s[3]+1] 
      } else {nids['right'] = null}
      let n = {}
      for (const [k, v] of Object.entries(nids)){
        if (v == null){
          n[k] = null
          continue
        }
        let id = ids.get(v[0], v[2])
        let f = false
        tiles.map((t) => {
          if (t['id'] == id){
            n[k] = t['tile']
            f = true
            return
          }
          return
        })
        if (f == false){
          n[k] = null
        }

      }
      return n

    }
    // get edge
    function get_edge(t, side){
      const sides = {
        'left': [0,10,0,1],
        'right': [0,10,9,10],
        'up': [0,1,0,10],
        'down': [9,10,0,10]
      }
      let arr = []
      for (const[k, v] of Object.entries(sides)){
        if (k != side){
          continue
        }
        for (let i = v[0]; i< v[1]; i++ ){
          for (let j = v[2]; j < v[3]; j++){
            arr.push(t.get(i, j))
          }
        }
      }
      return arr
    }
    // set final
    function set_final(s, t){
      let f = 10
      let k = 0
      for (let i = s[0] *f; i< s[1]*f; i++ ){
        let l = 0
        for (let j = s[2]*f; j < s[3]*f; j++){
          let x = t.get(k, l)
          final.set(i, j, x)
          l += 1
        }
        k += 1
      }
    }
    // set image
    function set_image(s, t){
      let f = 10
      console.log([s[0]*f, s[1]*f, s[2]*f, s[3]*f])
      let k = 1
      let m = s.map((val) => {
        if (val == 0){
          return 0
        } else{
          return val*f - val*2
        }
      })
      console.log(m)
      for (let i = m[0] ; i< m[1]; i++ ){
        let l = 1
        for (let j = m[2]; j < m[3]; j++){
          let x = t.get(k, l)
          image.set(i, j, x)
          l += 1
        }
        k += 1
      }
    }
    // Check if outer_edges
    function inOuterEdges(e){
      let ans = false
      let r = get_reverse(e)
      for (let o = 0; o < outer_edges.length; o++){
        if (arraysMatch(outer_edges[o], e) || arraysMatch(outer_edges[o], r)){
          ans = true
          break
        }
      }
      return ans
    }
    // check if slices in all_slices
    function in_all_slices(s, area){
      let ans = false
      all_slices[area].map((a) => {
        if (arraysMatch(a, s) == true){
          ans = true
        }
      })
      return ans
    }

    // check if tile in correct tiles
    function in_tiles(t, area){
      let ans = false
      if (area == 'corner'){
        corner_tiles.map((c) => {
          if (t['id'] == c['id']){
            ans = true
          }
          return
        })
      }else if (area == 'edge'){
        edge_tiles.map((c) => {
          if (t['id'] == c['id']){
            ans = true
          }
          return
        })
      }else if (area == 'middle'){
        middle_tiles.map((c) => {
          if (t['id'] == c['id']){
            ans = true
          }
          return
        })
      }
      return ans
    }
    let tlength = tiles.length
    let slength = slices.length
    
    while(isThereZeros() == true){
      console.log(ids)
      for (let s = 0; s < slength; s++){
        if(isTilePlaced(slices[s]) == true){
          continue
        }
        for (let t = 0; t < tlength; t ++) {
          if(tileUsed(tiles[t]['id']) == true){
            continue
          }
          let found = false
          let num_rotated = 0
    
          let n = get_neighbores(slices[s])
          while(found == false){
            let count = 0
            let length = 0
         
            if (n['up'] != null){
              length += 1
              let up = get_edge(tiles[t]['tile'], 'up')
              let down = get_edge(n['up'], 'down')
              if (arraysMatch(up , down) == true){
                count += 1
              }
            }
            if (n['down'] != null){
              length += 1
              let down = get_edge(tiles[t]['tile'], 'down')
              let up = get_edge(n['down'], 'up')
              if (arraysMatch(down, up) == true){
                count += 1
              }
            }
            if (n['left'] != null){
              length += 1
              let left = get_edge(tiles[t]['tile'], 'left')
              let right = get_edge(n['left'], 'right')
              if (arraysMatch(left, right) == true){
                count += 1
              }
            }
            if (n['right'] != null){
              length += 1
              let right  = get_edge(tiles[t]['tile'], 'right')
              let left  = get_edge(n['right'], 'left')
              if (arraysMatch(right, left) == true){
                count += 1
              }
            }
            
            let inCorners = in_all_slices(slices[s], 'corners')
            let inEdges = in_all_slices(slices[s], 'edges')
            if (inCorners == true){
              length += 2
              if (arraysMatch(slices[s], [0, 1, 0, 1]) == true){
                if (inOuterEdges(get_edge(tiles[t]['tile'], 'up')) == true && inOuterEdges(get_edge(tiles[t]['tile'], 'left')) == true){
                  count += 2
                }
              } else if (arraysMatch(slices[s], [0, 1, sides - 1, sides]) == true){
                if (inOuterEdges(get_edge(tiles[t]['tile'], 'up')) == true && inOuterEdges(get_edge(tiles[t]['tile'], 'right')) == true){
                  count += 2
                }
              } else if (arraysMatch(slices[s], [sides - 1, sides, 0, 1]) == true){
                if (inOuterEdges(get_edge(tiles[t]['tile'], 'down')) == true && inOuterEdges(get_edge(tiles[t]['tile'], 'left')) == true){
                  count += 2
                }
              } else if (arraysMatch(slices[s], [sides-1, sides, sides-1, sides]) == true){
                if (inOuterEdges(get_edge(tiles[t]['tile'], 'down')) == true && inOuterEdges(get_edge(tiles[t]['tile'], 'right')) == true){
                  count += 2
                }
              }
            } else if (inEdges == true){
              length += 1
              if (slices[s][0] == 0 && slices[s][1] == 1 && slices[s][2] >= 0 && slices[s][2] < sides){
                if (inOuterEdges(get_edge(tiles[t]['tile'], 'up'))== true){
                  count += 1
                }
              } else if (slices[s][0] == sides - 1 && slices[s][1] == sides && slices[s][2] >= 0 && slices[s][2] < sides){
                if (inOuterEdges(get_edge(tiles[t]['tile'], 'down'))== true){
                  count += 1
                }
              } else if (slices[s][2] == 0 && slices[s][3] == 1 && slices[s][0] >= 0 && slices[s][0] < sides){
                if (inOuterEdges(get_edge(tiles[t]['tile'], 'left'))== true){
                  count += 1
                }
              } else if (slices[s][2] == sides - 1 && slices[s][3] == sides && slices[s][0] >= 0 && slices[s][0] < sides){
                if (inOuterEdges(get_edge(tiles[t]['tile'], 'right'))== true){
                  count += 1
                }
              } 
            }

            
          
            if (length > 0){
              if (inCorners == true && in_tiles(tiles[t], 'corner') == true && count == length){
                found = true
              }
              else if (inEdges == true && in_tiles(tiles[t], 'edge') == true && count == length){
                found = true
              }
              else if (in_all_slices(slices[s], 'middle') == true && in_tiles(tiles[t], 'middle') == true && count == length){
                found = true
              }
            }

            if (found == true) {
              ids.set(slices[s][0], slices[s][2], tiles[t]['id'])
              set_final(slices[s], tiles[t]['tile'])
              set_image(slices[s], tiles[t]['tile'])
              break
            }

            tiles[t]['tile'] = nj.rot90(tiles[t]['tile'])
            num_rotated += 1
            if (num_rotated == 4){
              tiles[t]['tile'] = nj.flip(tiles[t]['tile'], 0)
            }
            if (num_rotated == 8){
              tiles[t]['tile'] = nj.flip(tiles[t]['tile'], 0)
              tiles[t]['tile'] = nj.flip(tiles[t]['tile'], 1)
            }
            if (num_rotated == 12){
              tiles[t]['tile'] = nj.flip(tiles[t]['tile'], 1)
              tiles[t]['tile'] = nj.flip(tiles[t]['tile'], 0)
              tiles[t]['tile'] = nj.flip(tiles[t]['tile'], 1)
            }
            if (num_rotated == 16){
              tiles[t]['tile'] = nj.flip(tiles[t]['tile'], 1)
              tiles[t]['tile'] = nj.flip(tiles[t]['tile'], 0)
              tiles[t]['tile'] = nj.flip(tiles[t]['tile'], 1)
              tiles[t]['tile'] = nj.flip(tiles[t]['tile'], 0)
            }
            if (num_rotated == 20){
              tiles[t]['tile'] = nj.flip(tiles[t]['tile'], 0)
              tiles[t]['tile'] = nj.flip(tiles[t]['tile'], 1)
              break
            }

          }
          if(found == true){
            break
          }
        }
      }
    }

    function print(arr){
      let shape = arr.shape
      for (let i =0 ; i < shape[0]; i ++){
        let temp = []
        for (let j = 0; j < shape[1]; j ++){
          temp.push(arr.get(i, j))
        }
        console.log(temp.join(" "))
      }
    }

    print(final)
    print(ids)
    console.log(ids.get(0, 0) * ids.get(0, sides - 1) * ids.get(sides - 1, 0) * ids.get(sides - 1, sides - 1))


    print(image)
    function pattern_check(i, j, arr){
      let coord = [
        [i + 1, j + 1],
        [i + 1, j + 4],
        [i, j + 5],
        [i, j + 6],
        [i + 1, j + 7],
        [i + 1, j + 10],
        [i, j + 11],
        [i, j + 12],
        [i + 1, j + 13],
        [i + 1, j + 16],
        [i, j + 17],
        [i, j + 18],
        [i, j + 19],
        [i - 1, j + 18]
      ]
      for (let c=0; c<coord.length; c++){
        let x = arr.get(coord[c][0], coord[c][1])
        if (x != 1){
          return false
        }
      }
      return true 
    }
    function change_to_twos(i, j, arr){
      let coord = [
        [i, j],
        [i + 1, j + 1],
        [i + 1, j + 4],
        [i, j + 5],
        [i, j + 6],
        [i + 1, j + 7],
        [i + 1, j + 10],
        [i, j + 11],
        [i, j + 12],
        [i + 1, j + 13],
        [i + 1, j + 16],
        [i, j + 17],
        [i, j + 18],
        [i, j + 19],
        [i - 1, j + 18]
      ]
      for (let c=0; c<coord.length; c++){
        arr.set(coord[c][0], coord[c][1], 2)
      }
    }

    function isEqual(arr1, arr2){
      for (let i = 0; i< (total - sides*2); i++){
        for (let j = 0; j< (total - sides*2); j++){
          let x = arr1.get(i, j)
          let y = arr2.get(i, j)
          if (x != y){
            return false
          }
        }
      }
      return true
    }

    function makeCopy(arr1, arr2){

      for (let i = 0; i< (total - sides*2); i++){
        for (let j = 0; j< (total - sides*2); j++){
          let x = arr1.get(i, j)
          arr2.set(i, j, x)
        }
      }
    }

    let cp = nj.zeros([(total - sides*2), (total - sides*2)])
    makeCopy(image, cp)
    num_rotated = 0
    while(true){
      for(let i = 1; i < (total - sides*2) - 1; i++){
        for (let j = 0; j< (total - sides*2) - 19; j++){
          let x = cp.get(i, j)
          if (x != 1){
            continue
          }
          else if (pattern_check(i, j, cp) == true){
            change_to_twos(i, j, image)
          }
        }
      }
      if (isEqual(cp, image) == false){
        break
      }
      cp = nj.rot90(cp)
      image = nj.rot90(image)
      num_rotated += 1
      if (num_rotated == 4){
        cp = nj.flip(cp, 0)
        image = nj.flip(image, 0)
      }
      if (num_rotated == 8){
        cp = nj.flip(cp, 0)
        image = nj.flip(image, 0)
        cp = nj.flip(cp, 1)
        image = nj.flip(image, 1)
      }
      if (num_rotated == 12){
        cp = nj.flip(cp, 1)
        image = nj.flip(image, 1)
        cp = nj.flip(cp, 0)
        image = nj.flip(image, 0)
        cp = nj.flip(cp, 1)
        image = nj.flip(image, 1)
      }
        
      if (num_rotated == 16){
        cp = nj.flip(cp, 1)
        image = nj.flip(image, 1)
        cp = nj.flip(cp, 0)
        image = nj.flip(image, 0)
        cp = nj.flip(cp, 1)
        image = nj.flip(image, 1)
        cp = nj.flip(cp, 0)
        image = nj.flip(image, 0)
      }
        
      if (num_rotated == 20){
        break
      }
    }

    let count = 0
    for (let i = 0; i< (total - sides*2); i++){
      for (let j = 0; j< (total - sides*2); j++){
        let x = image.get(i, j)
        if (x == 1){
          count += 1
        }
      }
    }

    resolve(count)
  })

module.exports = {
  part1,
  // part2 in part 1
};
