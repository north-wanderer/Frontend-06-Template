/* eslint-disable camelcase */
function match (str) {
  let state = start
  for (const s of str) {
    state = state(s)
  }
  return state === end
}

function end (s) {
  return end
}

function start (s) {
  if (s === 'a') return foundA
  return start
}

function foundA (s) {
  if (s === 'b') return foundB
  return start(s)
}
function foundB (s) {
  if (s === 'c') return foundA2
  return start(s)
}
function foundA2 (s) {
  if (s === 'a') return foundB2
  return start(s)
}
function foundB2 (s) {
  if (s === 'b') return foundA3
  return start(s)
}
function foundA3 (s) {
  if (s === 'x') return end
  return foundB(s)
}

console.log(match('abcabx')) // true
console.log('-----')
console.log(match('abcxxxabx')) // false
console.log('-----')
console.log(match('asdasdasdabcabxasdasdasdasd')) // true
console.log('-----')
console.log(match('abcababcab')) // false
