import React, { useState } from "react";
import { StoryType } from "../types/story";
import "../styles/Header.css";

interface HeaderProps {
  setStoryType: (type: StoryType) => void;
  resetPagination: () => void;
}

const storyTypes: { type: StoryType; label: string }[] = [
  { type: "new", label: "Newest" },
  { type: "top", label: "Top" },
  { type: "ask", label: "Ask HN" },
  { type: "show", label: "Show HN" },
  { type: "jobs", label: "Jobs" },
];

const Header: React.FC<HeaderProps> = ({ setStoryType, resetPagination }) => {
  const [activeType, setActiveType] = useState<StoryType>("new");

  const handleClick = (type: StoryType) => {
    setStoryType(type);
    resetPagination();
    setActiveType(type);
  };

  return (
    <header>
      <div className="header-title">
        <p className="hacker">HACKER</p>
        <p>NEWS</p>
        <p className="hacker">.</p>
      </div>
      <nav>
        {storyTypes.map(({ type, label }) => (
          <button
            key={type}
            className={
              type === activeType ? "active buttons" : "inactive buttons"
            }
            onClick={() => handleClick(type)}
          >
            {label}
          </button>
        ))}
      </nav>
    </header>
  );
};

export default Header;
