import React from 'react';
import "../styles/LoadMore.css"
interface LoadMoreButtonProps {
  loadMore: () => void;
}
const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ loadMore }) => (
  <button className='load-more-button' onClick={loadMore}>Load More</button>
);
export default LoadMoreButton;