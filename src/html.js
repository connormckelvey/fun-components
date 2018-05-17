function getSafeName(attr) {
  return attr
    .replace('className', 'class')
}

function setAttributes(node, attrs) {
  for(let key in attrs) {
    const val = attrs[key]
    if(typeof val === "function") {
      node[key.toLowerCase()] = val
      continue
    }
    node.setAttribute(getSafeName(key), val)
  }
}

function isRealChild(child) {
  if(!child || child.startsWith && child.startsWith('/')) {
    return false
  }
  return true
}

function appendChildren(node, children) {
  const last = children.length - 1
  const realChildren = isRealChild(children[last])
        ? children
        : children.slice(0, last)

  for(let c of realChildren) {
    if(!c) continue
    if(typeof c === 'string') {
      node.appendChild(document.createTextNode(c))
    } else {
      node.appendChild(c)
    }
  }
}

function createElement(tag, attrs, ...children) {
  const el = document.createElement(tag)
  setAttributes(el, attrs)
  appendChildren(el, children)
  return el
}

export const html = new Proxy({}, {
  get: function (target, key, receiver) {
    return (attrs, ...children) => createElement(key, attrs, ...children)
  }
})
