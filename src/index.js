import { component } from './html.js'
import { Store } from './store.js'
import { todoList, addTodo } from './components.js'

const s = new Store({ todos: [] })

const app = component(({div, h1}) => store => state => {
  return (
    div({ className: 'todo-list' },
        h1({}, 'Your Todos', '/h1'),
        todoList(store)(state.todos),
        addTodo(store)(),
    '/div')
  )
})

s.on('update', state => {
  const root = document.querySelector(`#root`)
  root.innerHTML = ''
  root.appendChild(app(s)(state))
})
