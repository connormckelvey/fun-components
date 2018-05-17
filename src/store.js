export class Store {
  constructor(initialStore = {}) {
    this._store = { ...initialStore }
    this.handlers = {
      update: []
    }
  }

  getState() {
    return {...this._store}
  }

  update(callback) {
    this._store = { ...callback({ ...this._store }) }
    this.handlers.update.forEach(handler => handler({ ...this._store }))
  }

  on(action, handler) {
    this.handlers[action].push(handler)
    handler({ ...this._store })
  }

  off(action, handler) {
    const index = this.handlers[action].indexOf(handler)
    this.handlers[action].splice(index, 1)
  }
}
