import { ITodoItem } from 'models/ITodo';

export async function fetchTodos(): Promise<[]> {
  return fetch(`${process.env.REACT_APP_ENPOINT}/todos?_page=1&_limit=10`)
            .then(res => res.json())
            .then(data => data)
}

export async function deleteTodo(todoId: number | undefined) {
  return fetch(`${process.env.REACT_APP_ENPOINT}/todos/${todoId}`, {
    method: 'DELETE'
  })
}

export async function addTodo(bodyData: ITodoItem) {
  return fetch(`${process.env.REACT_APP_ENPOINT}/todos`, {
    method: 'POST',
    body: JSON.stringify(bodyData),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}

export async function editTodo(todoId: number | undefined, bodyData: ITodoItem) {
  return fetch(`${process.env.REACT_APP_ENPOINT}/todos/${todoId}`, {
    method: 'PUT',
    body: JSON.stringify(bodyData),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}