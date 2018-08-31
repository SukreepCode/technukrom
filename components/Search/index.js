import View from './View';
import loadData from './loadData';
import React from 'react';


export default class extends React.Component {

  createEmptyPosts(numData) {
    let posts = []
    for (var i = 0; i < numData; i++) {
      posts.push({ "isLoading": true, tags: [] })
    }
    return posts
  }
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true
    };

    this.load = this.load.bind(this);
  }

  async load(...args) {
    
    try {
      this.setState({ isLoading: true, error: false });
      const incoming = await loadData(this.props.numData, this.state.refNext, ...args);
      this.setState({ isLoading: false });

    } catch(ex) {
    console.log(ex);
    this.setState({ isLoading: false, error: true });
  }
}

render() {
  return (
    <View {...this.props} {...this.state} onLoad={this.load} />
  );
}
}

