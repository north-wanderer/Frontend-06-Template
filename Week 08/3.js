function search (target, str) {
  for (const s of str) {
    if (s === target) return str.indexOf(s)
  }

  return false
}

// test
console.log(search('a', '123qwe1a23')) // 7

console.log(search('b', '123qwe1a23')) // false
