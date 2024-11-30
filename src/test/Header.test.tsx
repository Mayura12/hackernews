import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../components/Header';
import { StoryType } from '../types/story';

describe('Header Component', () => {
    let setStoryType: jest.Mock;
    let resetPagination: jest.Mock;

    beforeEach(() => {
        setStoryType = jest.fn();
        resetPagination = jest.fn();
        render(<Header setStoryType={setStoryType} resetPagination={resetPagination} />);
    });

    test('renders header title correctly', () => {
        expect(screen.getByText(/HACKER/i)).toBeInTheDocument();
        expect(screen.getByText(/NEWS/i)).toBeInTheDocument();
    });

    test('renders all buttons with correct labels', () => {
        expect(screen.getByRole('button', { name: /Newest/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Top/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Ask HN/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Show HN/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Jobs/i })).toBeInTheDocument();
    });

    test('sets the correct button as active', () => {
        const newestButton = screen.getByRole('button', { name: /Newest/i });
        expect(newestButton).toHaveClass('active');
    });

    test('updates active button and calls handlers on click', () => {
        const topButton = screen.getByRole('button', { name: /Top/i });
        fireEvent.click(topButton);

        expect(setStoryType).toHaveBeenCalledWith('top');
        expect(resetPagination).toHaveBeenCalled();
        expect(topButton).toHaveClass('active');
    });

    test('handles Ask HN button click correctly', () => {
        const askButton = screen.getByRole('button', { name: /Ask HN/i });
        fireEvent.click(askButton);

        expect(setStoryType).toHaveBeenCalledWith('ask');
        expect(resetPagination).toHaveBeenCalled();
        expect(askButton).toHaveClass('active');
    });
});
