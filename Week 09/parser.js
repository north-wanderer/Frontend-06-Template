/* eslint-disable no-empty */
let currentToken = null
let currentAttribute = null
const stack = [{ type: 'document', children: [] }]

function emit (token) {
  console.log(token)
  if (token.type === 'text') return

  const top = stack[stack.length - 1]

  if (token.type === 'startTag') {
    const element = {
      type: 'element',
      children: [],
      attributes: []
    }

    // 设置标签名称
    element.tagName = token.tagName

    // 设置属性
    for (const p in token) {
      if (p !== 'type' && p !== 'tagName') {
        element.attributes.push({
          name: p,
          value: token[p]
        })
      }
    }

    top.children.push(element)
    element.parent = top

    if (!token.isSelfClosing) { stack.push(element) }

    // currentTextNode = null
  } else if (token.type === 'endTag') {
    if (top.tagName !== token.tagName) {
      throw new Error("Tag start end doesn't match!")
    } else {
      stack.pop() // 配对成功，把元素从栈里取出
    }
    // currentTextNode = null
  }
}

function data (c) {
  if (c === '<') return tagOpen
  if (c === EOF) {
    emit({ type: 'EOF' })
    return
  }
  emit({ type: 'text', content: c })
  return data
}

function tagOpen (c) {
  if (c === '/') return endTagOpen // </xxx>
  if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: 'startTag',
      tagName: ''
    }
    return tagName(c)
  }
}

function endTagOpen (c) {
  if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: 'endTag',
      tagName: ''
    }
    return tagName(c)
  }
  if (c === '>') { }
  if (c === EOF) { }
}

function tagName (c) {
  if (c.match(/^[a-zA-Z]$/)) {
    currentToken.tagName += c
    return tagName
  }
  if (c.match(/^[\t\n\f ]$/)) return beforeAttributeName
  if (c === '/') return selfClosingStartTag
  if (c === '>') {
    emit(currentToken)
    return data
  }
  return tagName
}

function beforeAttributeName (c) {
  if (c.match(/^[\t\n\f ]$/)) return beforeAttributeName
  if (c === '/' || c === '>' || c === EOF) return afterAttributeName(c)
  if (c === '=') {

  } else {
    currentAttribute = {
      name: '',
      value: ''
    }
    return attributeName(c)
  }
}

function attributeName (c) {
  if (c.match(/^[\t\n\f ]$/) || c === '/' || c === '>' || c === EOF) return afterAttributeName(c)
  if (c === '=') return beforeAttributeValue
  if (c === '\u0000') {

  } else if (c === '"' || c === "'" || c === '<') {

  } else {
    currentAttribute.name += c
    return attributeName
  }
}

function beforeAttributeValue (c) {
  if (c.match(/^[\t\n\f ]$/) || c === '>' || c === '/' || c === EOF) return beforeAttributeValue
  if (c === '"') return doubleQuotedAttributeValue
  if (c === "'") return singleQuotedAttributeValue
  if (c === '>') { }

  return UnquotedAttributeValue(c)
}

function doubleQuotedAttributeValue (c) {
  if (c === '"') {
    currentToken[currentAttribute.name] = currentAttribute.value
    return afterQuetedAttributeValue
  }

  if (c === '\u0000') {

  } else if (c === EOF) {

  } else {
    currentAttribute.value += c
    return doubleQuotedAttributeValue
  }
}

function singleQuotedAttributeValue (c) {
  if (c === "'") {
    currentToken[currentAttribute.name] = currentAttribute.value
    return afterQuetedAttributeValue
  }
  if (c === '\u0000') {

  } else if (c === EOF) {

  } else {
    currentAttribute.value += c
    return singleQuotedAttributeValue
  }
}

function afterQuetedAttributeValue (c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  } else if (c === '/') {
    return selfClosingStartTag
  } else if (c === '>') {
    currentToken[currentAttribute.name] = currentAttribute.value
    emit(currentToken)
    return data
  } else if (c === EOF) {

  } else {
    currentAttribute.value += c
    return doubleQuotedAttributeValue
  }
}

function UnquotedAttributeValue (c) {
  if (c.match(/^[\t\n\f ]$/)) {
    currentToken[currentAttribute.name] = currentAttribute.value
    return beforeAttributeName
  }
  if (c === '/') {
    currentToken[currentAttribute.name] = currentAttribute.value
    return selfClosingStartTag
  }
  if (c === '>') {
    currentToken[currentAttribute.name] = currentAttribute.value
    emit(currentToken)
    return data
  }

  if (c === '\u0000') {

  } else if (c === '"' || c === "'" || c === '<' || c === '=' || c === '`') {

  } else if (c === EOF) {

  } else {
    currentAttribute.value += c
    return UnquotedAttributeValue
  }
}

function afterAttributeName (c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return afterAttributeName
  } else if (c === '/') {
    return selfClosingStartTag
  } else if (c === '=') {
    return beforeAttributeValue
  } else if (c === '>') {
    currentToken[currentAttribute.name] = currentAttribute.value
    emit(currentToken)
    return data
  } else if (c === EOF) {

  } else {
    currentToken[currentAttribute.name] = currentAttribute.value
    currentAttribute = {
      name: '',
      value: ''
    }
    return attributeName(c)
  }
}

function selfClosingStartTag (c) {
  if (c === '>') {
    currentToken.isSelfClosing = true
    emit(currentToken)
    return data
  }
  if (c === EOF) { }
}

const EOF = Symbol('EOF')

module.exports.parseHTML = function parseHTML (html) {
  let state = data
  for (const c of html) {
    state = state(c)
  }
  state = state(EOF)
  console.log(stack[0])
}