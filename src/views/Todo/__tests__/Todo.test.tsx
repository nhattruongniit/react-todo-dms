import { render, screen, cleanup } from '@testing-library/react';
import { rest } from "msw";
import { setupServer } from 'msw/node'

// components
import Todo from 'views/Todo';

// context
import { TodoProvider } from 'context/TodoContext';

const todoResponse: any = rest.get(`https://jsonplaceholder.typicode.com/todos`, (req, res, ctx) => {
  return res(
    ctx.json([
      {
        completed: false,
        id: 1,
        title: "delectus aut autem",
        userId: 1,
      }
    ])
  )
})

const handlers = [todoResponse];
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('should fetch todo success when first render', async () => {
  // given
  render(
    <TodoProvider>
     <Todo />
    </TodoProvider>
   );

   // when
  const todoItem = await screen.findByText("delectus aut autem");

  // then
  expect(todoItem).toBeVisible();
});

test('should render column Title', async () => {
  // given
  render(<Todo />);

  // when
  const col = screen.getByTestId("title");

  // then
  expect(col).toBeVisible();
});


test('should render column Status', async () => {
  // given
  render(<Todo />);

  // when
  const col = screen.getByTestId("status");

  // then
  expect(col).toBeVisible();
});


test('should render column Actions', async () => {
  // given
  render(<Todo />);

  // when
  const col = screen.getByTestId("actions");

  // then
  expect(col).toBeVisible();
});
