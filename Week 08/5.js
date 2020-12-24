function search (str) {
  const is = {
    a: false,
    b: false,
    c: false,
    d: false,
    e: false,
    f: false
  }
  for (const i of str) {
    if (i === 'a') {
      if (is.a) break
      is.a = true
    } else if (is.a && i === 'b') {
      if (is.b) break
      is.b = true
    } else if (is.b && i === 'c') {
      if (is.c) break
      is.c = true
    } else if (is.c && i === 'd') {
      if (is.d) break
      is.d = true
    } else if (is.d && i === 'e') {
      if (is.e) break
      is.e = true
    } else if (is.e && i === 'f') {
      if (is.f) break
      is.f = true
      return true
    } else {
      for (const k of Object.keys(is)) {
        is[k] = false
      }
    }
  }
  return false
}

// test

console.log(search('abcdef123')) // true
console.log('-----')
console.log(search('abc123def')) // false
console.log('-----')
console.log(search('abcde123')) // false
console.log('-----')
console.log(search('abbccdef')) // false
console.log('-----')
console.log(search('abcadef')) // false
