import React from 'react';

// mui core
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';

// components
import { TableNutrition } from 'components/Table';
import { FabAdd } from 'components/Fab';
import { DialogConfirm } from 'components/Dialog';

// sections
import TodoAdd from './components/TodoAdd';

// model
import{ IHeadCell } from 'models/ITable';
import { ITodoItem } from 'models/ITodo';

// apis
import * as todoApis from 'apis/todoApis';

const headCells: IHeadCell[] = [
  {
    id: 'title',
    numeric: false,
    label: 'Title',
  },
  {
    id: 'status',
    numeric: false,
    label: 'Status',
  },
  {
    id: 'actions',
    numeric: false,
    label: 'Actions',
  }
];

function Todo() {
  const [todos, setTodos] = React.useState<ITodoItem[]>([]);
  const [todoItem, setTodoItem] = React.useState<ITodoItem | null>(null);
  const [openModalAdd, setOpenModalAdd] = React.useState(false);

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
  }, []);

  // delete todo
  const handleDeleteTodo = (rowItem: ITodoItem) => () => {
    setTodoItem(rowItem)
  }

  function handleCloseModalConfirm() {
    setTodoItem(null);
  }

  async  function handleSubmit() {
    try {
      await todoApis.deleteTodos(todoItem?.id);
      setTodos(prevState => {
        const newTodos = [...prevState];
        const todoIndex: number = newTodos.findIndex((todo: ITodoItem) => todo.id === todoItem?.id);
        newTodos.splice(todoIndex, 1);
        return newTodos
      });
      handleCloseModalConfirm();
    } catch (err) {
      // some thing error
      console.log(err)
    }
  }

  // add todo
  function showModalAddTodo() {
    setOpenModalAdd(true);
  }

  function handleCloseModalAdd() {
    setOpenModalAdd(false)
  }

  console.log(todos)

  return (
    <>
      <TableNutrition 
        headCells={headCells}
        rows={todos}
        renderRows={(rowItem: ITodoItem) => (
          <TableRow
            hover
            tabIndex={-1}
            key={rowItem.id}
          >
            <TableCell align="left">{rowItem.title}</TableCell>
            <TableCell 
              align="left"
              sx={{ color: rowItem.completed ? "#4caf50" : "rgba(0, 0, 0, 0.87)" }}
            >
              {rowItem.completed ? "Completed" : "New"}
            </TableCell>
            <TableCell align="left">
              <Button variant="text">Edit</Button>  
              <Button variant="text" color='error' onClick={handleDeleteTodo(rowItem)}>Delete</Button>  
            </TableCell>
          </TableRow>
        )}
      />

      {/* section dialog confirm */}
      <DialogConfirm 
        open={!!todoItem}
        handleClose={handleCloseModalConfirm}
        handleSubmit={handleSubmit}
        renderContext={
          <>
            Do you want to delete id: <b>{todoItem?.id}</b> ?
          </>
        }
      />

      {/* section dialog add todo */}
      <TodoAdd 
        open={openModalAdd}
        handleClose={handleCloseModalAdd}
        handleSubmit={() => {}}
      />

      {/* section button add */}
      <FabAdd 
        onClick={showModalAddTodo}
      />
    </>
  )
}

export default Todo