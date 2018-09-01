import React from 'react';
import PostList from './PostList';
import NextPageButton from './NextPageButton';
import Error from './Error';

const View = ({ 
  isLoading, posts, onLoad, refInitQuery, error, errorMsg
}) => (
  <div>
      { !error && <PostList posts={posts} /> }
      { error && <Error /> }
      { refInitQuery && 
        <NextPageButton refInitQuery={refInitQuery} isLoading={isLoading} onLoad={onLoad}/>}
  </div>
);

export default View;
