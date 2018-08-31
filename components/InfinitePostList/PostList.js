

import React from 'react';
import Post from './Post';

export default (props) => (
  <div>
    {props.posts.map((post) => (
      <Post post={post} />
    ))}
  </div>
);
