import { useEffect, useState } from 'react';
import { Story, StoryType } from '../types/story';
const storyTypeEndpointMap: { [key in StoryType]: string } = {
  new: 'newstories',
  top: 'topstories',
  ask: 'askstories',
  show: 'showstories',
  jobs: 'jobstories',
};
const fetchStories = async (type: StoryType) => {
  const endpoint = storyTypeEndpointMap[type];
  const response = await fetch(`https://hacker-news.firebaseio.com/v0/${endpoint}.json`);
  const storyIds = await response.json();
  return storyIds; // Return all story IDs for pagination
};
export const useStories = (type: StoryType, start: number, end: number) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  useEffect(() => {
    setLoading(true);
    setError(null);
    const fetchAndSetStories = async () => {
      try {
        const storyIds = await fetchStories(type);
        const storyData = await Promise.all(
          storyIds.slice(start, end).map(async (id: number) => {
            const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
            return res.json();
          })
        );
        setStories(storyData);
      } catch (e) {
        setError('Failed to fetch stories');
      } finally {
        setLoading(false);
      }
    };
    fetchAndSetStories();
  }, [type, start, end]);
  console.log(stories,"stories");
  
  return { stories, loading, error };
};









