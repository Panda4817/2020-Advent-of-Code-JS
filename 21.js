const part1 = data =>
  new Promise(resolve => {
    
    const lst = data.split("\n")
    const allergens = []
    const alls = []
    const inglst = []
    lst.map((l) => {
      let parts = l.split("(contains ")
      let al = parts[1].split(", ")
      al[al.length - 1] = al[al.length - 1].split(")")[0]
      let ing = parts[0].split(" ")
      ing.map((i) => {
        if (inglst.indexOf(i) < 0 && i != ''){
          inglst.push(i)
        } 
        return
      })  
      allergens.push({'contains': al, 'ing': ing })
      al.map((a) => {
        if (alls.indexOf(a) < 0){
          alls.push(a)
        }
        return 
      })
      return
    })
    const filtered = {}
    const nt = []
    alls.map((a) => {
      filtered[a] = []
      let options = {}
      inglst.map((i) => {
        options[i] = 0
        return
      })  
      let number = 0
      allergens.map((b) =>{
        if (b['contains'].indexOf(a) < 0){
           return
        }
        number += 1
        b['ing'].map((val) => {
          options[val] += 1
          return
        })
        return
      })
      for (const [k, v] of Object.entries(options)){
        if (v >= number){
          filtered[a].push(k)
        }  
      }
      return 
    })
      
    
    for (const [k, v] of Object.entries(filtered)){
      if (v.length == 1){
        for (const [ke, ve] of Object.entries(filtered)){
          if (ke == k){
            continue
          }
          let i = ve.indexOf(v[0])
          if (i > -1){
            ve.splice(i, 1)
          }
            
        }
          
      }
        


    }
      
    
    for (const [k, v] of Object.entries(filtered)){
      if (v.length > 1){
        let options = {}
        v.map((val) => {
          options[val] = 0
          return
        })
        v.map((val) => {
          for (const [ke, ve] of Object.entries(filtered)){
            if (ke == k){
              continue
            }
            let i = ve.indexOf(val)
            if (i > -1){
              options[val] += 1
            }
          }
          return 
        })

        let keep = null
        for (const [o, op] of Object.entries(options)){
          if (op == 0){
            keep = o
          }   
        }
        for (const [o, op] of Object.entries(options)){
          if (op > 0 && keep != null){
            let i = v.indexOf(o)
            if (i > -1){
              v.splice(i, 1)
            }
          }   
        } 
      }
    }
    
    for (const [k, v] of Object.entries(filtered)){
      if (v.length == 1){
        for (const [ke, ve] of Object.entries(filtered)){
          if (ke == k){
            continue
          }
          let i = ve.indexOf(v[0])
          if (i > -1){
            ve.splice(i, 1)
          }   
        }    
      }
    }
    
    const a = []
    for (const [key, value] of Object.entries(filtered)){
      for (let i=0; i<value.length; i++){
        if (a.indexOf(value[i]) < 0 && value[i] != ''){
          a.push(value[i])
        }
        
      }
    }
    a.sort()
    console.log(a.join(",")) // Answer to part 2
    
    inglst.map((k) => {
      if (a.indexOf(k) < 0){
        nt.push(k)
      }
      return  
    })
      
    
    num = 0
    allergens.map((a) => {
      a['ing'].map((val) => {
        if (nt.indexOf(val) > -1){
          num += 1
        }
        return 
      })
      return
    })
      

    resolve(num) // part 1 answer
  })


// const part2 = data =>
//   new Promise(resolve => {
  
//   })

module.exports = {
  part1,
  // part2 in part 1
};