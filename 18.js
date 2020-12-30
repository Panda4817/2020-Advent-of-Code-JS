const part1 = data =>
  new Promise(resolve => {
    const nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    const operators = ['+', '*']
    const problems = data.split("\n")
    const answers  = problems.map((p) => {
      let temp = []
      let current = []
      let done = ''
      let c = -1
      while(done.length != p.length){
        c += 1
        done =  done + p[c]
        if (p[c] == ' ' || p[c-1] == '(' || p[c-2] == '('){
          continue
        }
        
        if (nums.indexOf(p[c]) > -1 && c == 0){
          temp.push(parseInt(p[c]))
        }
        else if (operators.indexOf(p[c]) > -1){
          current.push(p[c])
        }
        else if (nums.indexOf(p[c]) > -1 && current.length > 0){
          if (current.length > 1){
            if (current[current.length - 1] == '+'){
              temp[temp.length -1] += parseInt(p[c])
            }
            else if (current[current.length - 1] == '*'){
              temp[temp.length -1] *= parseInt(p[c])
            }
            current.pop()
          }
          else{
            if (current[0] == '+'){
              temp[temp.length -1] += parseInt(p[c])
            }
            else if (current[0] == '*'){
               temp[temp.length -1] *= parseInt(p[c])
            }
            current.shift()
          }
            
        }
        else if (p[c].includes('(')){
          let x = c + 1
          let char = p[x]
          while(char == '('){
            temp.push(null)
            x +=1 
            char = p[x]
          }
          temp.push(parseInt(char))
        }
        else if (p[c].includes(')') && current.length > 0){
          let length =  temp.length
          while(temp.length != length - 1){
            if (temp[temp.length - 2] == null){
              temp[temp.length - 2] = temp[temp.length -1]
              temp.pop()
            }  
            else if (current.length > 1){
              if (current[current.length - 1] == '+'){
                temp[temp.length - 2] += temp[temp.length -1]
              }  
              else if (current[current.length - 1] == '*'){
                temp[temp.length - 2] *= temp[temp.length -1]
              }
              current.pop()
              temp.pop()
            } 
            else {
              if (current[0] == '+'){
                temp[temp.length - 2] += temp[temp.length -1]
              } 
              else if (current[0] == '*'){
                temp[temp.length - 2] *= temp[temp.length -1]
              }  
              current.shift()
              temp.pop()
            }   
          }
        }
        


      }
      if (temp[0] != null){
        return temp[0]
      }else{
        return temp[1]
      }
    })

    ans = 0
    for (let i = 0; i < answers.length; i ++){
      ans += answers[i]
    }
    resolve(ans)
  })


const part2 = data =>
  new Promise(resolve => {
  
  // Lowest precedence first: for part 2 "+" has higher precedence than "*"
  // EXPRESSION -> TERM_A("*"TERM_A)*
  // TERM_A -> TERM_B("+"TERM_B)*
  // TERM_B -> "("EXPRESSION")"|NUMBER

  function tokenize(data){
      const operator_tokens = [
          '(', ')', '+', '*',
      ]
      const tokens = []
      let t = ''
      for (let i = 0; i < data.length; i ++){
        let char = data[i]
        if (operator_tokens.indexOf(char) > -1){
          if (t){
            tokens.push(t)
            t = ''
          }  
          tokens.push(char)
        }  
        else if ([' ', '\n'].indexOf(char) > -1){
          continue
        }  
        else{
           t += char
        }
         
      }  
      if (t){
        tokens.push(t)
      }
      return tokens
  }
    
  
  function parse(tokens){
    const max_len = tokens.length
    function _read_expression(index, func, char, op_func){
      // EXPRESSION -> FUNC(CHAR FUNC)*
      let arr = func(index)
      index = arr[1]
      let val = arr[0]
      while (index < max_len){
        let token = tokens[index]
        if (token == char){
          index += 1  // Skip past operator
          arr = func(index)
          index = arr[1]
          let val2 = arr[0]
          val = op_func(val, val2)
        }
        else{
          break
        }
            
      }

      return [val, index]
    }

    function multiply(v, w){
      return v * w
    }

    function add(v, w) {
      return v + w
    }
    
    function read_term_b(index){
      let token = tokens[index]
      let val = null
      if (token == '('){
        index += 1  //Skip past opening bracket
        let arr = read_expression(index)
        index = arr[1]
        val = arr[0]
        index += 1  //Skip past closing bracket
      }else{
        let arr = read_number(index)
        val = arr[0]
        index = arr[1]

      }
      return [val, index]
    }

    function read_term_a(index){
      return _read_expression(index, read_term_b, '+', add)
    }
      

    function read_number(index){
      let token = tokens[index]
      return [parseInt(token), index + 1]
    }

    function read_expression(index){
       return _read_expression(index, read_term_a, '*', multiply)
    }
    
    let ans = read_expression(0)
    return ans[0]
  }
  
  let num = 0

  data.split("\n").map((d) =>{
    let tokens = tokenize(d)
    //console.log(tokens)
    let ans = parse(tokens)
    num += ans
    return
  })
    
  resolve(num)
  })

module.exports = {
  part1,
  part2
};
