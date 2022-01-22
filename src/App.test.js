import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Whats happening link', () => {
  render(<App />);
  const linkElement = screen.getByText(/What's happening/i);
  expect(linkElement).toBeInTheDocument();
});
