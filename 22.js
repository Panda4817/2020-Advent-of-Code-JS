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
    console.log(p1, p2)
    const arraysMatch = function (arr1, arr2) {

      // Check if the arrays are the same length
      if (arr1.length != arr2.length) return false;

      // Check if all items exist and are in the same order
      for (var i = 0; i < arr1.length; i++) {
        if (arr1[i] != arr2[i]) return false;
      }
      
      return true;

    };
    
    function recurse(p1, p2){
      console.log("recurse")
      let rounds = {}
      let r = 1
      while(p1.length > 0 && p2.length > 0){
        for (const [k,v] of Object.entries(rounds)){
          if (arraysMatch(p1,v['one']) == true && arraysMatch(p2,v['two']) == true){
             return 1
          }
        }
        let one = Array.from(p1)
        let two = Array.from(p2)
        rounds[r] = {'one': one , 'two': two}
        let x = p1.shift()
        let y = p2.shift()
        let answer = 0
        if (p1.length >= x && p2.length >= y){
          let sl1 = Array.from(p1.slice(0,x))
          let sl2 = Array.from(p2.slice(0,y))
          answer = recurse(sl1,sl2)
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
        r += 1
      }
      
      if (p1.length == 0){
        return 2
      }else if (p2.length == 0){
        return 1
      }

      return
        
    }

    let rounds = {}
    let r = 1
    let winner = undefined
    while(p1.length > 0 && p2.length > 0){
      for (const [k,v] of Object.entries(rounds)){
        if (arraysMatch(p1, v['one']) == true && arraysMatch(p2, v['two']) == true){
          winner = p1
          break
        }
          
      }
      if (winner != null){
        console.log(winner)
        break
      }
      let one = Array.from(p1)
      let two = Array.from(p2)
      rounds[r] = {'one': one, 'two': two}
      let x = p1.shift()
      let y = p2.shift()
      let answer = 0
      if (p1.length >= x && p2.length >= y){
        let sl1 = Array.from(p1.slice(0,x))
        let sl2 = Array.from(p2.slice(0,y))
        answer = recurse(sl1, sl2)
      }else if (x > y){
        answer = 1 
      }else if (y > x){
        answer = 2
      }
        
      
      if (answer == 1){
        p1.push(x)
        p1.push(y)
      }else if (answer == 2){
        p2.push(y)
        p2.push(x)
      }
        
      r += 1
      console.log(r, p1, p2)
    }
      
    
    let i = 0
    if (p1.length == 0){
      i = p2.length
      winner = p2
    }else if (p2.length == 0){
      i = p1.length
      winner = p1
    }
      
    else if (winner != null){
      i = p1.length
    }
      

    let num = 0
    console.log(i)
    winner.map((w) => {
      num += (w * i)
      i -= 1
    })
    
    resolve(num)
  })

module.exports = {
  part1,
  part2
};