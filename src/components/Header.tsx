import React, { useState } from 'react';
import { StoryType } from '../types/story';
import '../styles/Header.css';

interface HeaderProps {
    setStoryType: (type: StoryType) => void;
    resetPagination: () => void;
}

const Header: React.FC<HeaderProps> = ({ setStoryType, resetPagination }) => {
    const [activeType, setActiveType] = useState<StoryType>('new');

    const handleClick = (type: StoryType) => {
        setStoryType(type);
        resetPagination();
        setActiveType(type);
    };

    return (
        <>
            <div className='header-title'>
                <p className='hacker'>HACKER</p>
                <p>NEWS </p>
                <p className='hacker'>.</p>
            </div>
            <header>
                <button
                    className={activeType === 'new' ? 'active' : 'inactive'}
                    onClick={() => handleClick('new')}
                >
                    Newest
                </button>
                <button
                    className={activeType === 'top' ? 'active' : 'inactive'}
                    onClick={() => handleClick('top')}
                >
                    Top
                </button>
                <button
                    className={activeType === 'ask' ? 'active' : 'inactive'}
                    onClick={() => handleClick('ask')}
                >
                    Ask HN
                </button>
                <button
                    className={activeType === 'show' ? 'active' : 'inactive'}
                    onClick={() => handleClick('show')}
                >
                    Show HN
                </button>
                <button
                    className={activeType === 'jobs' ? 'active' : 'inactive'}
                    onClick={() => handleClick('jobs')}
                >
                    Jobs
                </button>
            </header>
        </>
    );
};

export default Header;
