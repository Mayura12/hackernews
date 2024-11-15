import { renderHook, act } from '@testing-library/react-hooks';
import { useStories } from '../hooks/useStories';
import { StoryType } from '../types/story';

global.fetch = jest.fn();

describe('useStories', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch and return stories', async () => {
        (fetch as jest.Mock)
            .mockResolvedValueOnce({
                json: async () => [1, 2, 3],
            })
            .mockResolvedValueOnce({
                json: async () => ({ id: 1, title: 'Story 1' }),
            })
            .mockResolvedValueOnce({
                json: async () => ({ id: 2, title: 'Story 2' }),
            })
            .mockResolvedValueOnce({
                json: async () => ({ id: 3, title: 'Story 3' }),
            });

        const { result, waitForNextUpdate } = renderHook(() =>
            useStories('top', 0, 3)
        );


        // Initial state
        expect(result.current.loading).toBe(true);
        expect(result.current.error).toBeNull();
        expect(result.current.stories).toEqual([]);

        // Wait for updates after async fetch
        await waitForNextUpdate();

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
        expect(result.current.stories).toEqual([
            { id: 1, title: 'Story 1' },
            { id: 2, title: 'Story 2' },
            { id: 3, title: 'Story 3' },
        ]);
    });

    it('should set loading state correctly', async () => {
        (fetch as jest.Mock).mockResolvedValue({
            json: async () => [1, 2, 3],
        });

        const { result, waitForNextUpdate } = renderHook(() =>
            useStories('top', 0, 3)
        );

        expect(result.current.loading).toBe(true);
        await waitForNextUpdate();
        expect(result.current.loading).toBe(false);
    });

    it('should set an error if fetching stories fails', async () => {
        // Mock fetch to throw an error
        (fetch as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));

        const { result, waitForNextUpdate } = renderHook(() =>
            useStories('top', 0, 3)
        );

        await waitForNextUpdate();

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe('Failed to fetch stories');
        expect(result.current.stories).toEqual([]);
    });
});
