import React from 'react';

// components
import { DialogSimple } from 'components/Dialog';

// apis
import * as todoApis from 'apis/todoApis';

// models
import { ITodoItem } from 'models/ITodo';

// context
import { useTodoContext } from 'context/TodoContext';

function DeleteTodo() {
  const { openModal, todos, setTodos, todoItem, handleCloseModal } = useTodoContext();

  async function handleSubmit() {
    try {
      await todoApis.deleteTodo(todoItem?.id);
      const newTodos = [...todos];
      const todoIndex: number = newTodos.findIndex((todo: ITodoItem) => todo.id === todoItem?.id);
      newTodos.splice(todoIndex, 1);
      setTodos(newTodos);
      handleCloseModal();
    } catch (err) {
      // some thing error
      console.log(err)
    }
  }

  return (
    <DialogSimple 
      open={openModal === 'confirm'}
      handleClose={handleCloseModal}
      handleSubmit={handleSubmit}
      buttonOkId="button-submit"
      buttonCancelId="button-cancel"
      renderTitle="Confirm"
      renderContext={
        <>
          Do you want to delete id: <b>{todoItem?.id}</b> ?
        </>
      }
    />

  )
}

export default DeleteTodo