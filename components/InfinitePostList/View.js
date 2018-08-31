import React from 'react';
import PostList from './PostList';
import NextPageButton from './NextPageButton';

const View = ({ 
  isLoading, posts, onLoad, refInitQuery
}) => (
  <div>
      <PostList posts={posts} />
      <NextPageButton refInitQuery={refInitQuery} isLoading={isLoading} onLoad={onLoad}/>
  </div>
);

export default View;
