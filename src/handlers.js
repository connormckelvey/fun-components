export const completeTodo = s => idx => {
  s.update(store => {
    const t = { ...store.todos[idx], complete: true }
    const todos = Object.assign([], store.todos, { [idx]: t })
    return { ...store, todos }
  })
}

export const addTodo = s => e => {
  e.preventDefault()
  const input = document.querySelector("#newTodo")
  const title = input.value
  const todo = { title, complete: false }

  if(!title) return

  input.value = ''
  s.update(store => ({...store, todos: [...store.todos, todo]}))
}
