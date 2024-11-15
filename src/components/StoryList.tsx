import React, { useState } from 'react';
import { Story } from '../types/story';
import "../styles/StoryList.css";

interface StoryListProps {
    stories: Story[];
    start: number;
}

const StoryList: React.FC<StoryListProps> = ({ stories, start }) => {
    // State to track which stories have been clicked
    const [clickedStories, setClickedStories] = useState<Set<number>>(new Set());

    const handleClick = (storyId: number) => {
        setClickedStories(prevClicked => new Set(prevClicked).add(storyId));
    };

    return (
        
        <div className='notes-body'>
            {stories.map((story, index) => (
                <div key={story.id} className='card'>
                    <div className="serial-title">
                        <span>{start + index + 1}. </span>
                        <a
                            href={story.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => handleClick(story.id)}
                        >
                            <div className="title" style={{ color: clickedStories.has(story.id) ? 'gray' : 'black' }}>
                                {story.title}
                            </div>
                        </a>
                    </div>
                    <div className='story-by'>By {story.by} | Score: {story.score}</div>
                </div>
            ))}
        </div>
    );
};

export default StoryList;
