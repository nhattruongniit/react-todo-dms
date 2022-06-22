import React, { useState, useContext, createContext } from 'react';

// model
import { ITodoItem } from 'models/ITodo';

// apis
import * as todoApis from 'apis/todoApis';

type IProps = {
  children: React.ReactNode;
};

type ITypeModal = 'confirm' | 'add' | 'edit';

type IContext = {
  openModal: string | null;
  todos: ITodoItem[];
  todoItem: ITodoItem | null;
  setTodos: (prevState: ITodoItem[]) => void;
  setTodoItem: (prevState: ITodoItem | null) => void;
  handleOpenModal: (typeModal: ITypeModal | null) => void;
  handleCloseModal: () => void;
  handleDeleteTodo: (rowItem: ITodoItem) => () => void;
};

export const initialState = {
  openModal: 'confirm',
  todos: [],
  todoItem: null,
  setTodos: () => {},
  setTodoItem: () => {},
  handleOpenModal: () => {},
  handleCloseModal: () => {},
  handleDeleteTodo: () => () => {}
};

const TodoContext = createContext<IContext>(initialState);

const TodoProvider = ({ children }: IProps) => {
  const [todos, setTodos] = useState<ITodoItem[]>([]);
  const [todoItem, setTodoItem] = useState<ITodoItem | null>(null);
  const [openModal, setOpenModal] = useState<ITypeModal | null>(null);

  // initial todos
  React.useEffect(() => {
    async function _handleFetchTodos() {
      try {
        const data = await todoApis.fetchTodos();
        setTodos(data)
      } catch (err) {
        // some thing error
        console.log(err)
      }
    };
    _handleFetchTodos();
  }, [setTodos]);


  function handleOpenModal(typeModal: ITypeModal | null) {
    setOpenModal(typeModal)
  }

  function handleCloseModal() {
    setOpenModal(null);
    setTodoItem(null);
  }

  const handleDeleteTodo = (rowItem: ITodoItem) => () => {
    setTodoItem(rowItem);
    handleOpenModal('confirm')
  }

  return (
    <TodoContext.Provider
      value={{
        // state
        openModal,
        todos,
        todoItem,
        // actions
        setTodos,
        setTodoItem,
        handleOpenModal,
        handleCloseModal,
        handleDeleteTodo
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

const useTodoContext = () => useContext(TodoContext);

export { TodoContext, TodoProvider, useTodoContext };
