import PostItemLayout from "./PostItemLayout";
import FadeIn from 'react-fade-in';


export default (props) => (
  <FadeIn>
    <PostItemLayout
      id={props.post.id}
      left={props.post.published}
      right={`<div><a href=${props.post.link}>${props.post.title}</a></div><div>${props.post.author}</div>`}
      isLoading={props.post.isLoading}
    />
  </FadeIn>


)

