export function createElement(type, attributes, ...children) {
  let ele
  // console.log(typeof type);
  if (typeof type === 'string') {
    ele = new ElementWarpper(type)
  } else { 
    ele = new type
  }
  for (const name in attributes) { 
    ele.setAttribute(name, attributes[name])
  }
  for (const child of children) { 
    if (typeof child === 'string') {
      child = new TextWarpper(child)
    }
    ele.appendChild(child)
  }
  return ele
}

export class Component {
  constructor(type) { 
    // this.root = this.render()
  }
  setAttribute(name,value) {
    this.root.setAttribute(name,value)
   }
  appendChild(child) { 
    child.mountTo(this.root)
  }
  mountTo(parent) { 
    parent.appendChild(this.root)
  }
}

class ElementWarpper extends Component{ 
  constructor(type) { 
    this.root = document.createElement(type)
  }
}

class TextWarpper extends Component{ 
  constructor(content) { 
    this.root = document.createTextNode(content)
  }
}
