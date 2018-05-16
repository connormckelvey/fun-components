function _(tag, attrs, ...children) {
  const el = document.createElement(tag)
  Object.keys(attrs).forEach(key => {
    const unsafeKey = key
      .replace('className', 'class')
    const val = attrs[key]

    if(typeof val === "function") {
      return el[key.toLowerCase()] = val
    }

    el.setAttribute(unsafeKey, attrs[key])
  })
  children.forEach(c => {
    if(!c) return
    if(typeof c === "string") {
      return c.startsWith('/')
               ? null
               : el.appendChild(document.createTextNode(c))
    }
    return el.appendChild(c)
  })
  return el
}

export const html = new Proxy({}, {
  get: function (target, key, receiver) {
    return (attrs, ...children) => _(key, attrs, ...children)
  }
})

export const component = (componentFactory) => {
  return componentFactory(html)
}
