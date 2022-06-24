import React from "react";

// mui core
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

// components
import { TableNutrition } from "components/Table";

// context
import { useTodoContext } from "context/TodoContext";

// sections
import AddEditTodo from "./components/AddEditTodo";
import DeleteTodo from "./components/DeleteTodo";

// model
import { IHeadCell } from "models/ITable";
import { ITodoItem } from "models/ITodo";

const headCells: IHeadCell[] = [
  {
    id: "title",
    numeric: false,
    label: "Title",
    dataTestId: "title",
  },
  {
    id: "status",
    numeric: false,
    label: "Status",
    dataTestId: "status",
  },
  {
    id: "actions",
    numeric: false,
    label: "Actions",
    dataTestId: "actions",
  },
];

function Todo() {
  const { todos, setTodoItem, handleOpenModal, handleDeleteTodo } =
    useTodoContext();

  // edit todo
  const handleEditTodo = (rowItem: ITodoItem) => () => {
    handleOpenModal("edit");
    setTodoItem(rowItem);
  };

  return (
    <>
      <Grid
        container
        item
        sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}
      >
        <Button variant="contained" onClick={() => handleOpenModal("add")}>
          Add Todo
        </Button>
      </Grid>

      <TableNutrition
        headCells={headCells}
        rows={todos}
        renderRows={(rowItem: ITodoItem) => (
          <TableRow hover tabIndex={-1} key={rowItem.id}>
            <TableCell align="left" data-testid="title">
              {rowItem.title}
            </TableCell>
            <TableCell
              align="left"
              sx={{
                color: rowItem.completed ? "#4caf50" : "rgba(0, 0, 0, 0.87)",
              }}
            >
              {rowItem.completed ? "Completed" : "New"}
            </TableCell>
            <TableCell align="left">
              <Button variant="text" onClick={handleEditTodo(rowItem)}>
                Edit
              </Button>
              <Button
                variant="text"
                color="error"
                onClick={handleDeleteTodo(rowItem)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        )}
      />

      {/* delete todo */}
      <DeleteTodo />

      {/* section dialog add todo */}
      <AddEditTodo />
    </>
  );
}

export default Todo;
