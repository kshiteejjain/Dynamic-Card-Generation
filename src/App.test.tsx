import React from 'react';
import { renderWithProviders } from '../src/test-utils';
import { screen } from '@testing-library/react'
import App from './App';
import Form from './features/Form/Form';
import UserCard from './features/UserCard/UserCard';
import { createMemoryHistory } from "history";

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock('./app/utils/variable.scss', () => '')

describe('Should Render <App />', () => {
  
  // const renderProvider = () => {
  //   const initialState = {}
  //   const mockStore = configureStore();
  //   let store = mockStore(initialState);
  //   const history = createMemoryHistory({ initialEntries: ['/'] });
  //   render(<Provider store={store} history={history}> <App /> <Form /> <UserCard /> </Provider>)
  // }

  it('renders correctly without error', async () => {
    renderWithProviders(<App />);

    expect(renderWithProviders).toMatchSnapshot();
  });

it('Render Header Logo and Title', () => {
  renderWithProviders(<App />)

  expect(screen.getByTestId('renderLogo')).toBeInTheDocument();
  expect(screen.getByTestId('renderTitle')).toBeInTheDocument();
});

it("Redirects to Form Page", () => {
  const history = createMemoryHistory();
  renderWithProviders(<Form />);

  expect(history.location.pathname).toBe("/");
});

it('Renders Form component by default', async() => {
  renderWithProviders(<Form />);

  const form = screen.getAllByTestId('form');
  await(() => expect(form).toBeInTheDocument())
});

it('Renders UserCard component', async () => {
  renderWithProviders(<UserCard />);

  const form = screen.getAllByTestId('cardWrapper');
  await(() => expect(form).toBeInTheDocument())
});

});