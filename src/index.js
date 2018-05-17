import { Store } from './store.js'
import { App } from './components.js'

const s = new Store({ todos: [] })

s.on('update', state => {
  const root = document.querySelector(`#root`)
  root.innerHTML = ''
  root.appendChild(App(s)(state))
})
