/* eslint-disable no-empty */
const css = require('css')
let currentToken = null
let currentAttribute = null
let currentTextNode = null
const rules = []// css rules

const stack = [{ type: 'document', children: [] }]

function addCSSRules (text) {
  const ast = css.parse(text)
  rules.push(...ast.stylesheet.rules)
}

function match (element, selector) {
  // 没有属性的都是文本节点，不需要计算css
  if (!selector || !element.attributes) return false

  if (selector.charAt(0) === '#') { // ID
    const attr = element.attributes.filter(attr => attr.name === 'id')[0]
    if (attr && attr.value === selector.replace('#', '')) return true
  } else if (selector.charAt(0) === '.') { // Class
    const attr = element.attributes.filter(attr => attr.name === 'class')[0]
    if (attr && attr.value === selector.replace('.', '')) return true
  } else { // tag name
    if (element.tagName === selector) return true
  }

  return false
}

function specificity (selector) {
  const p = [0, 0, 0, 0] // 四元组
  const selectorParts = selector.split(' ')
  for (const part of selectorParts) {
    if (part.charAt(0) === '#') {
      p[1] += 1
    } else if (part.charAt(0) === '.') {
      p[2] += 1
    } else {
      p[3] += 1
    }
  }
  return p
}

function compare (sp1, sp2) {
  if (sp1[0] - sp2[0]) { return sp1[0] - sp2[0] }

  if (sp1[1] - sp2[1]) { return sp1[1] - sp2[1] }

  if (sp1[2] - sp2[2]) { return sp1[2] - sp2[2] }

  return sp1[3] - sp2[3]
}

function computeCSS (element) {
  const elements = stack.slice().reverse()
  if (!element.computedStyle) element.computedStyle = {}
  for (const rule of rules) {
    const selectorParts = rule.selectors[0].split(' ').reverse()
    if (!match(element, selectorParts[0])) continue

    let matched = false

    let j = 1
    for (let i = 0; i < elements.length; i++) {
      if (match(elements[i], selectorParts[j])) j++
    }
    if (j >= selectorParts.length) matched = true

    if (matched) {
      const sp = specificity(rule.selectors[0])
      const computedStyle = element.computedStyle
      for (const declaration of rule.declarations) {
        if (!computedStyle[declaration.property]) {
          computedStyle[declaration.property] = {}
        }
        if (!computedStyle[declaration.property].specificity) {
          computedStyle[declaration.property].value = declaration.value
          computedStyle[declaration.property].specificity = sp
        } else if (compare(computedStyle[declaration.property].specificity, sp) < 0) {
          computedStyle[declaration.property].value = declaration.value
          computedStyle[declaration.property].specificity = sp
        }
      }

      console.log(element.computedStyle)
    }
  }
}

function emit (token) {
  // console.log(token)

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
    computeCSS(element)
    top.children.push(element)
    element.parent = top
    currentTextNode = null
    if (!token.isSelfClosing) {
      stack.push(element)
    }
  } else if (token.type === 'endTag') {
    if (top.tagName !== token.tagName) {
      throw new Error("Tag start end doesn't match!")
    } else {
      if (top.tagName === 'style') {
        addCSSRules(top.children[0].content)
      }
      stack.pop() // 配对成功，把元素从栈里取出
    }
    currentTextNode = null
  } else if (token.type === 'text') {
    if (!currentTextNode) {
      currentTextNode = {
        type: 'text',
        content: ''
      }
      top.children.push(currentTextNode)
    }
    currentTextNode.content += token.content
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
  return stack[0]
}
