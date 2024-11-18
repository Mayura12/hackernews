import React, { useState } from "react";
import { Story } from "../types/story";
import "../styles/StoryList.css";

interface StoryListProps {
  stories: Story[];
  start: number;
}

const StoryList: React.FC<StoryListProps> = ({ stories, start }) => {
  // State to track which stories have been clicked
  const [clickedStories, setClickedStories] = useState<Set<number>>(new Set());

  const handleClick = (storyId: number) => {
    setClickedStories((prevClicked) => new Set(prevClicked).add(storyId));
  };

  const computedStories = stories.map((story, index) => {
    const serialNumber = start + index + 1;
    const color = clickedStories.has(story.id) ? "gray" : "black";

    return { ...story, serialNumber, color };
  });

  return (
    <div className="notes-body">
      {computedStories.map(
        ({ id, url, title, by, score, serialNumber, color }) => (
          <div key={id} className="card">
            <div className="serial-title">
              <span>{serialNumber}. </span>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleClick(id)}
              >
                <div className="title" style={{ color }}>
                  {title}
                </div>
              </a>
            </div>
            <div className="story-by">
              By {by} | Score: {score}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default StoryList;
