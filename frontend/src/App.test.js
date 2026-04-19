import { render, screen } from '@testing-library/react';
import App from './App';

test('renders main Music World heading', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /Music World/i })).toBeInTheDocument();
});
