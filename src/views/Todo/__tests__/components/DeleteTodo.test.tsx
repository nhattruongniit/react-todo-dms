import { render, screen, fireEvent } from '@testing-library/react';

// components
import DeleteTodo from 'views/Todo/components/DeleteTodo';

test('should close modal after click Cancel button', async () => {
  // given
  const initialValue = {
    openModal: null
  }
  render(<DeleteTodo />);
  const submit = screen.getByTestId("button-cancel");
  
  // when
  fireEvent.click(submit);

  // then
  expect(initialValue.openModal).toBe(null);
  expect(submit).toHaveTextContent("Cancel");
});

test('should delete todo after click Submit button', async () => {
  /// given
  const initialValue = {
    openModal: null
  }
  render(<DeleteTodo />);
  const submit = screen.getByTestId("button-submit");

  // when
  fireEvent.click(submit);

  // then
  expect(initialValue.openModal).toBe(null);
  expect(submit).toHaveTextContent("Ok");
});
