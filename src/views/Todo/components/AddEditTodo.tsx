import * as React from 'react';

// mui core
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

// components
import { DialogSimple } from 'components/Dialog';

// models
import { ITodoItem } from 'models/ITodo';

// apis
import * as todoApis from 'apis/todoApis';

// context
import { useTodoContext } from 'context/TodoContext';

const AddEditTodo = () => {
  const { openModal, todos, setTodos, todoItem, handleCloseModal } = useTodoContext();
  const [isError, setIsError] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [status, setStatus] = React.useState("false");

  React.useEffect(() => {
    if(!todoItem) {
      resetForm();
      return;
    }
    setTitle(todoItem?.title);
    setStatus(todoItem?.completed.toString())
  }, [todoItem])

  // reset form
  function resetForm() {
    setTitle('');
    setStatus("false")
  }

  // submit add todo
  async function handleSubmit() {
    if(!title) {
      setIsError(true);
      return;
    }

    const isStatus = status === 'true' ? true : false;
    const newItem: ITodoItem = {
      id: new Date().getTime(),
      userId: new Date().getTime() + 1,
      completed: isStatus,
      title,
    }

    // add todo
    if(openModal === 'add') {
      try {
        await todoApis.addTodo(newItem);
        const newTodos = [newItem, ...todos];
        setTodos(newTodos);
        handleCloseModal();
        resetForm();
      } catch (err) {
        console.log(err)
      }
      return;
    }

    // edit todo
    try {
      await todoApis.editTodo(todoItem?.id, newItem);
      const newTodos = [...todos];
      const todoIndex: number = newTodos.findIndex((todo: ITodoItem) => todo.id === todoItem?.id);
      newTodos[todoIndex].completed = newItem.completed;
      newTodos[todoIndex].title = newItem.title;
      setTodos(newTodos);
      handleCloseModal();
      resetForm();
    } catch (err) {
      console.log(err)
    }
    
  }
  
  function onChangeTitle(e: { target: { value: React.SetStateAction<string>; }; }){
    setTitle(e.target.value);
  }

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
  };

  return (
    <DialogSimple 
      open={openModal === 'add' || openModal === 'edit'}
      handleClose={handleCloseModal}
      handleSubmit={handleSubmit}
      renderTitle={openModal === 'add' ? "Add Todo" : "Edit Todo"}
      renderContext={
        <div>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            data-testid="name"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={title}
            onChange={onChangeTitle}
            error={isError}
          />
          <FormControl variant="standard" fullWidth sx={{ mt: 2 }}>
            <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={status}
              onChange={handleChange}
              label="Status"
              fullWidth
            >
              <MenuItem value="false">New</MenuItem>
              <MenuItem value="true">Completed</MenuItem>
            </Select>
          </FormControl>
        </div>
      }
    />
  );
}

export default AddEditTodo;