function search (str) {
  for (let i = 0; i < str.length; i++) {
    if ((str[i] === 'a') && (str[i + 1] === 'b')) return [i, i + 1]
  }
  return false
}

// test

console.log(search('1aa2ac3qwe1ab23')) // [11, 12]
