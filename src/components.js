import * as handle from './handlers.js'
import { html } from './html.js'

const withStore = component => store => (props, ...children) => {
  const actions = Object.keys(handle)
        .reduce((acc, key) => {
          return {...acc, [key]: handle[key](store)}
        }, {})
  const newProps = {...props, store, actions}
  return component(newProps, ...children)
}

const addTodo = ({actions}) => {
  const {form, input, button, h3} = html
  return (
    form({action: '#', onSubmit: e => actions.addTodo(e)},
         h3({}, 'Add Todo', '/h3'),
         input({id: 'newTodo', type: 'text'}),
         button({type: 'submit'}, 'Add +', '/button'),
    '/form')
  )
}
export const AddTodo = withStore(addTodo)

const completeBtn = ({todo, idx, actions}) => {
  const {button} = html
  if(todo.complete) return null
  return (
    button({ onClick: e => actions.completeTodo(idx) },
       'Mark Complete',
    '/button')
  )
}
export const CompleteBtn = withStore(completeBtn)

const singleTodo = ({ todo, idx, store }) => {
  const {s, b, li} = html
  const wrapper = todo.complete ? s : b
  return (
    li({},
       wrapper({}, todo.title),
       CompleteBtn(store)({todo, idx}),
    '/li')
  )
}
export const SingleTodo = withStore(singleTodo)

export const todoList = ({todos, store}, ...children) => {
  const {div, i, ul} = html
  if(!todos.length) return i({}, `You have no todos yet, try making one!`, '/i')
  return (
    div({},
        ul({},
           ...todos.map((todo, idx) => SingleTodo(store)({ todo, idx })),
        '/ul'),
        ...children,
    '/div')
  )
}
const TodoList = withStore(todoList)

const app = ({store, todos}) => {
  const {div, h1} = html
  return (
    div({ className: 'todo-list' },
        h1({}, 'Your Todos', '/h1'),
        TodoList(store)({todos}),
        AddTodo(store)(),
    '/div')
  )
}
export const App = withStore(app)
