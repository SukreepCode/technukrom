import PostItemLayout from "./PostItemLayout";

export default (props) => (
  <PostItemLayout 
    id={props.post.id}
    left={props.post.published}
    right={`<div><a href=${props.post.link}>${props.post.title}</a> โดย ${props.post.author}</div>`}
    isLoading={props.post.isLoading}
    />
)

