const pattern = [
  0, 0, 0,
  0, 0, 0,
  0, 0, 0
]

let color = 1 // 1 -> ⭕️; 2 -> ❌

function newUnit () {
  const unit = document.createElement('div')
  unit.classList.add('unit')
  return unit
}

function clone (arr) {
  return Object.create(arr)
}

function check (pattern, color) {
  for (let i = 0; i < 3; i++) {
    let status = true
    for (let j = 0; j < 3; j++) {
      if (pattern[3 * i + j] !== color) { // -
        status = false
      }
    }
    if (status) return true
  }

  for (let i = 0; i < 3; i++) {
    let status = true
    for (let j = 0; j < 3; j++) {
      if (pattern[3 * j + i] !== color) { //  |
        status = false
      }
    }
    if (status) return true
  }

  {
    let status = true
    for (let i = 0; i < 3; i++) {
      if (pattern[i * 3 + i] !== color) { // \
        status = false
      }
    }
    if (status) return true
  }

  {
    let status = true
    for (let i = 0; i < 3; i++) {
      if (pattern[i * 3 + 2 - i] !== color) { // /
        status = false
      }
    }
    if (status) return true
  }

  return false
}

function userMove (x, y) {
  if (pattern[3 * y + x]) return
  pattern[3 * y + x] = color
  if (check(pattern, color)) {
    window.alert(color === 2 ? '❌ is winner!' : '⭕️ is winner!')
  }
  color = 3 - color
  show()
  computerMove()
}

function computerMove () {
  const choice = bestChoice(pattern, color)
  if (choice.point) {
    pattern[choice.point[1] * 3 + choice.point[0]] = color
  }
  if (check(pattern, color)) {
    window.alert(color === 2 ? 'X is winner!' : 'O is winner!')
  }
  color = 3 - color
  show()
}

function willWin (pattern, color) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (pattern[3 * i + j] !== 0) continue
      const temp = clone(pattern)
      temp[3 * i + j] = color
      if (check(temp, color)) return [j, i]
    }
  }
  return null
}

// result: -1-> lost; 0 -> even; +1 -> win;
function bestChoice (pattern, color) {
  let point = willWin(pattern, color)
  if (point) {
    return {
      point,
      result: 1
    }
  }
  let result = -2

  /*  eslint-disable no-labels */
  outer: for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (pattern[3 * i + j]) continue
      const temp = clone(pattern)
      temp[3 * i + j] = color
      const r = bestChoice(temp, 3 - color).result

      if (-r > result) {
        result = -r
        point = [j, i]
      }
      if (result === 1) break outer
    }
  }

  return {
    point,
    result: point ? result : 0
  }
}

function show () {
  const board = document.querySelector('.board')
  board.innerHTML = ''
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const unit = newUnit()
      unit.innerText = pattern[3 * i + j] === 2 ? '❌' : pattern[3 * i + j] === 1 ? '⭕️' : ''
      unit.addEventListener('click', () => userMove(j, i))
      board.appendChild(unit)
    }
  }
}

show()
