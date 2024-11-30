import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StoryList from '../components/StoryList';
import { Story } from '../types/story';

describe('StoryList Component', () => {
    const stories: Story[] = [
        { id: 1, title: 'Story 1', url: 'http://example.com/1', by: 'Author 1', score: 100, time: 12 },
        { id: 2, title: 'Story 2', url: 'http://example.com/2', by: 'Author 2', score: 200, time: 12 },
        { id: 3, title: 'Story 3', url: 'http://example.com/3', by: 'Author 3', score: 300, time: 12 }
    ];

    const start = 0;

    beforeEach(() => {
        render(<StoryList stories={stories} start={start} />);
    });

    test('renders the correct number of stories', () => {
        const storyItems = screen.getAllByRole('link');
        expect(storyItems).toHaveLength(stories.length);
    });

    test('renders story title and details correctly', () => {
        const storyTitle = screen.getByText('Story 1');
        expect(storyTitle).toBeInTheDocument();
        expect(screen.getByText('By Author 1 | Score: 100')).toBeInTheDocument();
    });

    test('title color changes after click', () => {
        const storyTitle = screen.getByText('Story 1');
        fireEvent.click(storyTitle);

        // Check that the color changes to gray after click
        expect(storyTitle).toHaveStyle('color: gray');
    });

    test('title color remains black initially', () => {
        const storyTitle = screen.getByText('Story 1');
        expect(storyTitle).toHaveStyle('color: black');
    });

    test('clicking a story updates clickedStories state', () => {
        const storyTitle = screen.getByText('Story 1');
        fireEvent.click(storyTitle);

        // Check that the color is gray after the click, indicating it's been clicked
        expect(storyTitle).toHaveStyle('color: gray');
    });

    test('clicking the link opens the URL in a new tab', () => {
        const storyLink = screen.getByText('Story 1').closest('a');
        expect(storyLink).toHaveAttribute('href', 'http://example.com/1');
        expect(storyLink).toHaveAttribute('target', '_blank');
        expect(storyLink).toHaveAttribute('rel', 'noopener noreferrer');
    });
});
