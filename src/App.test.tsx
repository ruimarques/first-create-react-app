import { render, screen } from '@testing-library/react';
import App from './App';

test('renders search input', () => {
  render(<App />);
  const element = screen.getAllByPlaceholderText(/Postal Code/i);

  expect(element[0]).toBeInTheDocument();
});
