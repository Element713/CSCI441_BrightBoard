// written by: Conner Erckert and Shadow Love-Erckert
  // tested by: Conner Erckert and Shadow Love-Erckert
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
