import React from 'react'
import {render, screen} from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom'

test('renders home screen', () => {
    render(<App/>);
    const linkElement = screen.getByText(/Home Screen/i);
    expect(linkElement).toBeInTheDocument();
});
