import React from 'react';

// mui core
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';

// components
import { TableNutrition } from 'components/Table';
import { FabAdd } from 'components/Fab';

// context
import { useTodoContext } from 'context/TodoContext';

// sections
import AddEditTodo from './components/AddEditTodo';
import DeleteTodo from './components/DeleteTodo';

// model
import{ IHeadCell } from 'models/ITable';
import { ITodoItem } from 'models/ITodo';

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
  const { todos, setTodoItem, handleOpenModal, handleDeleteTodo } = useTodoContext();

  // edit todo
  const handleEditTodo = (rowItem: ITodoItem) => () => {
    handleOpenModal('edit');
    setTodoItem(rowItem);
  }

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
              <Button variant="text" onClick={handleEditTodo(rowItem)}>Edit</Button>  
              <Button variant="text" color='error' onClick={handleDeleteTodo(rowItem)}>Delete</Button>  
            </TableCell>
          </TableRow>
        )}
      />

      {/* delete todo */}
      <DeleteTodo />

      {/* section dialog add todo */}
      <AddEditTodo  />

      {/* section button add */}
      <FabAdd 
        onClick={() => handleOpenModal('add')}
      />
    </>
  )
}

export default Todo