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
  if (s === 'd') return foundD
  return start(s)
}
function foundD (s) {
  if (s === 'e') return foundA3
  return start(s)
}
function foundA3 (s) {
  if (s === 'f') return end
  return start(s)
}

console.log(match('abcdef'))
console.log('-----')
console.log(match('ababcdef'))
