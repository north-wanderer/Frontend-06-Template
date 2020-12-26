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
  if (s === 'a') return foundA2
  return start(s)
}
function foundA2 (s) {
  if (s === 'b') return foundB2
  return start(s)
}
function foundB2 (s) {
  if (s === 'a') return foundA3
  return start(s)
}
function foundA3 (s) {
  if (s === 'b') return foundB3
  return start(s)
}
function foundB3 (s) {
  if (s === 'x') return end
  return foundA3(s)
}

console.log(match('abababx')) // true
console.log('-----')
console.log(match('ababxxxxabx')) // false
console.log('-----')
console.log(match('pppabababxqqq')) // true
console.log('-----')
console.log(match('abababababab')) // false
