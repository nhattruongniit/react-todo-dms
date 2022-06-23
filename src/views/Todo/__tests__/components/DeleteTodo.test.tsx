import { render, screen, fireEvent } from '@testing-library/react';

// components
import DeleteTodo from 'views/Todo/components/DeleteTodo';

test('should close modal after click Cancel button', async () => {
  const initialValue = {
    openModal: null
  }
  render(<DeleteTodo />);
  const submit = screen.getByTestId("button-cancel");
  fireEvent.click(submit);
  expect(initialValue.openModal).toBe(null);
  expect(submit).toHaveTextContent("Cancel");
});

test('should delete todo after click Submit button', async () => {
  const initialValue = {
    openModal: null
  }
  render(<DeleteTodo />);
  const submit = screen.getByTestId("button-submit");
  fireEvent.click(submit);
  expect(initialValue.openModal).toBe(null);
  expect(submit).toHaveTextContent("Ok");
});
