import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import HomePage from './components/pages/HomePage';

test('renders learn react link', () => {
  render(<App pageToShow={<HomePage/>} />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
