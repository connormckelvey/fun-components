export class Store {
  constructor(initialStore = {}) {
    this.store = { ...initialStore }
    this.handlers = {
      update: []
    }
  }

  update(callback) {
    this.store = { ...callback({ ...this.store }) }
    this.handlers.update.forEach(handler => handler({ ...this.store }))
  }

  on(action, handler) {
    this.handlers[action].push(handler)
    handler({ ...this.store })
  }

  off(action, handler) {
    const index = this.handlers[action].indexOf(handler)
    this.handlers[action].splice(index, 1)
  }
}
