const $ = Symbol('$')

class Trie {
  constructor () {
    this.root = Object.create(null)
  }

  insert (word) {
    let curNode = this.root
    for (const c of word) {
      if (!curNode[c]) {
        curNode[c] = Object.create(null)
      }
      curNode = curNode[c]
    }
    if (!($ in curNode)) {
      curNode[$] = 0
    }
    curNode[$]++
  }

  most () {
    let max = 0
    let maxWord = null
    const visit = (node, word) => {
      if (node[$] && node[$] > max) {
        max = node[$]
        maxWord = word
      }
      for (const p in node) {
        visit(node[p], `${word}${p}`)
      }
    }
    visit(this.root, '')
    console.log(maxWord, max)
  }
}

function randomWord (length) {
  let s = ''
  for (let i = 0; i < length; i++) {
    s += String.fromCharCode(Math.random() * 26 + 'a'.charCodeAt(0))
  }
  return s
}

const trie = new Trie()

for (let i = 0; i < 10000; i++) {
  trie.insert(randomWord(4))
}
