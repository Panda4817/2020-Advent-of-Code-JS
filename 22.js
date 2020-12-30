const part1 = data =>
  new Promise(resolve => {
    const lst = data.split("\n\n")
    const p1 = []
    const p2 = []
    lst[0].split("\n").map((l) => {
      if (l == 'Player 1:'){
        return
      }
      p1.push(parseInt(l))
      return
    })
      
    lst[1].split("\n").map((l) => {
      if (l == 'Player 2:'){
        return
      }
      p2.push(parseInt(l))
      return
    })

    while(p1.length > 0 && p2.length > 0){
      let x = p1.shift()
      let y = p2.shift()
      if (x > y){
        p1.push(x)
        p1.push(y)
      }
      else if (y > x){
        p2.push(y)
        p2.push(x)
      }
    }

    let i, winner;
    if (p1.length == 0){
      i = p2.length
      winner = p2
    }
    else if (p2.length == 0){
      i = p1.length
      winner = p1
    }
      

    let num = 0
    
    winner.map((w) => {
      num += (w * i)
      i -= 1
      return
    })
      
    
   resolve(num)

  })


const part2 = data =>
  new Promise(resolve => {
    const lst = data.split("\n\n")
    const p1 = []
    const p2 = []
    lst[0].split("\n").map((l) => {
      if (l == 'Player 1:'){
        return
      }
      p1.push(parseInt(l))
      return
    })
      
    lst[1].split("\n").map((l) => {
      if (l == 'Player 2:'){
        return
      }
      p2.push(parseInt(l))
      return
    })
    
    function recurse(p1, p2){
      console.log("recurse")
      let rnds = {}
      let rr = 1
      while(p1.length > 0 && p2.length > 0){
        for (const [k,v] of Object.entries(rnds)){
          if (p1 == v[1] && p2 == v[2]){
             return 1
          }
        }
        rnds[rr] = {1: Array.from(p1), 2: Array.from(p2)}
        x = p1.shift()
        y = p2.shift()
        let answer;
        if (p1.length >= x && p2.length >= y){
           answer = recurse(Array.from(p1.slice(0,x)),Array.from(p2.slice(0,y)))
        }
  
        else if (x > y){
          answer = 1  
        }
        else if (y > x){
          answer = 2
        }
        if (answer == 1){
          p1.push(x)
          p1.push(y)
        }else if (answer == 2){
          p2.push(y)
          p2.push(x)
        }
        rr += 1  
      }
      
      if (p1.length == 0){
        return 2
      }else if (p2.length == 0){
        return 1
      }
        
    }

    let rounds = {}
    let r = 1
    let winner = null
    while(p1.length > 0 && p2.length > 0){
      for (const [k,v] of Object.entries(rounds)){
        if (p1 == v[1] && p2 == v[2]){
          winner = p1
          break
        }
          
      }
      if (winner != null){
        break
      }  
      rounds[r] = {1: Array.from(p1), 2: Array.from(p2)}
      let x = p1.shift()
      let y = p2.shift()
      let answer;
      if (p1.length >= x && p2.length >= y){
        answer = recurse(Array.from(p1.slice(0,x)), Array.from(p2.slice(0,y)))
      }else if (x > y){
        answer = 1 
      }
         
      else if (y > x){
        answer = 2
      }
        
      
      if (answer == 1){
        p1.push(x)
        p1.push(y)
      }
        
      else if (answer == 2){
        p2.push(y)
        p2.push(x)
      }
        
      r += 1
      console.log(r, p1, p2)
    }
      
    
    let i;
    if (p1.length == 0){
      i = p2.length
      winner = p2
    }
      
    else if (p2.length == 0){
      i = p1.length
      winner = p1
    }
      
    else if (winner){
      i = p1.length
    }
      

    let num = 0
    
    winner.map((w) => {
      num += (w * i)
      i -= 1
      return
    })
      
    
    resolve(num)
  })

module.exports = {
  part1,
  part2
};