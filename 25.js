const part1 = data =>
  new Promise(resolve => {
    const public_keys = [1526110, 20175123]
    const loop_sizes = []
    public_keys.map((pk) => {
      let sn = 7
      let v = 1
      let l = 0
      while(v != pk){
        l += 1
        v = v * sn
        v = v % 20201227 
      }  
      loop_sizes.push(l)
    })

    let sn = public_keys[0]
    let v = 1
    for (let i= 0; i < loop_sizes[1]; i++){
      v = v * sn
      v = v % 20201227
    }
    resolve(v)
  })

module.exports = {
  part1,
  // no part 2
};