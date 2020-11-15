const regexp = /([0-9.]+)|([ \t]+)|([\r\n]+)|(\+)|(-)|(\*)|(\/)/g

const dictionary = [
  'Number',
  'Whitespace',
  'LineTerminator',
  '+',
  '-',
  '*',
  '/'
]

function * tokenize (source) {
  let result = null
  let lastIndex = 0
  while (true) {
    lastIndex = regexp.lastIndex
    result = regexp.exec(source)

    if (!result) break

    if (regexp.lastIndex - lastIndex > result[0].length) break

    const token = {
      type: null,
      value: null
    }

    for (let i = 1; i <= dictionary.length; i++) {
      if (result[i]) token.type = dictionary[i - 1]
    }
    token.value = result[0]
    yield token
  }

  yield {
    type: 'EOF'
  }
}

const source = []

function MultiplicativeExp(source) {
  if (source[0].type === 'Number') {
    const node = {
      type: 'MultiplicativeExpression',
      children: [source[0]]
    }

    source[0] = node
    return MultiplicativeExp(source)
  }

  if (source[0].type === 'MultiplicativeExpression' && source[1] && source[1].type === '*') {
    const node = {
      type: 'MultiplicativeExpression',
      operator: '*',
      children: []
    }

    node.children.push(source.shift())
    node.children.push(source.shift())
    node.children.push(source.shift())

    source.unshift(node)
    return MultiplicativeExp(source)
  }
  if (source[0].type === 'MultiplicativeExpression' && source[1] && source[1].type === '/') {
    const node = {
      type: 'MultiplicativeExpression',
      operator: '/',
      children: []
    }

    node.children.push(source.shift())
    node.children.push(source.shift())
    node.children.push(source.shift())

    source.unshift(node)
    return MultiplicativeExp(source)
  }
  if (source[0].type === 'MultiplicativeExpression') return source[0]

  return MultiplicativeExp(source)
}

// test
for (const token of tokenize('10 * 25 / 2')) {
  if (token.type !== 'Whitespace' && token.type !== 'LineTerminator') {
    source.push(token)
  }
}

console.log(MultiplicativeExp(source))
