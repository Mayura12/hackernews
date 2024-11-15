import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoadMoreButton from '../components/LoadMoreButton';

describe('LoadMoreButton Component', () => {
    test('renders Load More button with correct label', () => {
        render(<LoadMoreButton loadMore={jest.fn()} />);
        const button = screen.getByRole('button', { name: /Load More/i });
        expect(button).toBeInTheDocument();
    });

    test('calls loadMore function when button is clicked', () => {
        const loadMoreMock = jest.fn();
        render(<LoadMoreButton loadMore={loadMoreMock} />);

        const button = screen.getByRole('button', { name: /Load More/i });
        fireEvent.click(button);

        expect(loadMoreMock).toHaveBeenCalledTimes(1);
    });
});
