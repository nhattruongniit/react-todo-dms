import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

// components
import DeleteTodo from 'views/Todo/components/DeleteTodo';

// apis
import { deleteTodo } from 'apis/todoApis';

jest.mock('apis/todoApis');
const mockDeleteTodo = deleteTodo as jest.MockedFunction<typeof deleteTodo>


test('should close modal after delete success', async () => {
  const initialState = {
    openModal: null
  }

  render(<DeleteTodo />);
  const submit = screen.getByTestId("button-submit");
  fireEvent.click(submit);
  mockDeleteTodo.mockResolvedValue({
    status: 200,
  });
  expect(mockDeleteTodo).toBeCalledTimes(1);
  expect(initialState.openModal).toEqual(null);
});


