import React, { useState } from "react";
import StoryList from "./StoryList";
import Header from "./Header";
import LoadMoreButton from "./LoadMoreButton";
import { useStories } from "../hooks/useStories";
import { StoryType } from "../types/story";

import Spinner from "./Spinner";

const Hackernews = () => {
  const [storyType, setStoryType] = useState<StoryType>("new");
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(20);
  const { stories, loading, error } = useStories(storyType, start, end);

  const loadMore = () => {
    setStart(start + 20);
    setEnd(end + 20);
  };

  return (
    <div className="app-body">
      <Header
        setStoryType={setStoryType}
        resetPagination={() => {
          setStart(0);
          setEnd(20);
        }}
      />
      {loading && <Spinner />}
      {error && <p>{error}</p>}
      {!loading && (
        <>
          <StoryList stories={stories} start={start} />
          <div className="load-more-button-body">
            {stories.length > 0 && <LoadMoreButton loadMore={loadMore} />}
          </div>
          <div className="footer">HACKERNEWS.</div>
        </>
      )}
    </div>
  );
};
export default Hackernews;
