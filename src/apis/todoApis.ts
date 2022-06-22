export async function fetchTodos(): Promise<[]> {
  return fetch(`${process.env.REACT_APP_ENPOINT}/todos?_page=1&_limit=10`)
            .then(res => res.json())
            .then(data => data)
}

export async function deleteTodos(todoId: number | undefined) {
  return fetch(`${process.env.REACT_APP_ENPOINT}/todos/${todoId}`, {
    method: 'DELETE'
  })
}