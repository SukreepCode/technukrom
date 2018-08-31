import React from 'react';
import PostList from './PostList';
import NextPageButton from './NextPageButton';

const View = ({
  isLoading, posts, onLoad, refInitQuery, isAutoload, onRef, reset, isShowLoading
}) => (
    <div>
      <PostList posts={posts} />
    
        <NextPageButton
          refInitQuery={refInitQuery}
          isLoading={isLoading}
          onLoad={onLoad}
          isAutoload={isAutoload}
          onRef={onRef}
          reset={reset}
          isShowLoading={isShowLoading} />
    </div>
  );

export default View;
