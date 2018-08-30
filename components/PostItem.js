import PostItemLayout from "./PostItemLayout";
import FadeIn from 'react-fade-in';

export default (props) => (
  <FadeIn>
    <PostItemLayout
      id={props.post.id}
      left={props.post.published} 
      tags={props.post.tags}
      right={`<div class="is-size-7">${props.post.author}</div><div class="has-text-weight-bold"><a href=${props.post.link}>${props.post.title}</a></div>`}
      isLoading={props.post.isLoading}
    />
  </FadeIn>


)

