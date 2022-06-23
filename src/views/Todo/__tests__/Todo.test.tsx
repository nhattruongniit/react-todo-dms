import { render, screen } from '@testing-library/react';

// components
import Todo from 'views/Todo';

test('should render column Title', async () => {
  render(<Todo />);
  const col = screen.getByTestId("title");
  expect(col).toBeVisible();
});


test('should render column Status', async () => {
  render(<Todo />);
  const col = screen.getByTestId("status");
  expect(col).toBeVisible();
});


test('should render column Actions', async () => {
  render(<Todo />);
  const col = screen.getByTestId("actions");
  expect(col).toBeVisible();
});
