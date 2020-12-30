var GrammarGraph = require('grammar-graph')

const part1 = data =>
  new Promise(resolve => {
    const lst = data.split("\n\n")
    var rules = {}
    lst[0].split("\n").map((r) => {
      let parts = r.split(": ")
      sub = parts[1].split(" | ")
      let arr = []
      sub.map((s) => {
        let ss = s.split(" ")
        let aa = ''
        for (let i= 0; i< ss.length; i++){
          if (ss[i] == '"a"' || ss[i] == '"b"') {
            if (ss[i] == '"a"'){
              aa += "a"
              //aa.push('a')
            } else {
              aa += "b"
              //aa.push('b')
            }
            
          } else{
            if (aa != ''){
              aa += ' ' + ss[i]
            } else{
              aa += ss[i]
            }
            
          }
        }
        arr.push(aa)
        return
      })

      rules[parts[0]] = arr
      return
    })
    console.log(rules)
    
    // part 2 - update to rule 8 and 11
    rules['8'] = ['42', '42 8']
    rules['11'] = ['42 31', '42 11 31']

    console.log(rules)
    var graph = new GrammarGraph(rules)
    var sentence = graph.createRecognizer('0')
    let m = lst[1].split("\n")
    let count = 0
    m.map((p) => {
      sp = p.split("").join(" ").trim()
      let bool = sentence.isComplete(sp)
      if (bool){
        count += 1
      }
      return
    })
    resolve(count)
  })


module.exports = {
  part1,
  // part2 in part 1
};