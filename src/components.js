import * as handle from './handlers.js'
import { component } from './html.js'

export const completeBtn = component(({button}) => store => (todo, idx) => {
  if(todo.complete) return null
  return (
    button({ onClick: handle.completeTodo(store, idx) },
      'Mark Complete',
    '/button')
  )
})

export const singleTodo = component(({li, s, b}) => store => (todo, idx) => {
  const w = todo.complete ? s : b
  return (
    li({},
      w({}, todo.title),
       completeBtn(store)(todo, idx),
    '/li')
  )
})

export const addTodo = component(({form, h3, input, button}) => store => () => {
  return (
    form({action: '#', onSubmit: handle.addTodo(store)},
      h3({}, 'Add Todo', '/h3'),
      input({id: 'newTodo', type: 'text'}),
      button({type: 'submit'}, 'Add +', '/button'),
    '/form')
  )
})

export const todoList = component(({i, ul}) => store => (todos) => {
  if(!todos.length) return i({}, `You have no todos yet, try making one!`, '/i')
  return (
    ul({}, ...todos.map(singleTodo(store)), '/ul')
  )
})
