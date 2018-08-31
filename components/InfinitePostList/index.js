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
      posts: this.props.showPlaceholder ? this.createEmptyPosts(this.props.numData) : [],
      prefetch_posts: null,
      refNext: null,
      refQuery: null,
      isLoading: true,
      reset: () => this.setState({refNext: null, posts: [] })
    };

    this.load = this.load.bind(this);
  }

  manageData(data, isFirstLoad, isPrefetch = false) {
    console.log(`manageData `)
    console.log(data)
    try {
      if (isPrefetch)
        this.setState({ prefetch_posts: data })
      else {
        if (isFirstLoad) {
          console.log(`${this.state.posts.length} >>> `)

          if (this.props.showPlaceholder && data.length >= this.props.numData) {
            for (var j = 0; j < this.state.posts.length; j++)
              this.state.posts[j] = data[j];
          } else
            this.setState({ posts: data })


        } else
          this.setState({ posts: this.state.posts.concat(data) })
      }
    } catch (ex) {
      console.log(ex);
      this.setState({ isLoading: false, error: true });
    }
  }

  async load(...args) {
    try {
      this.setState({ isLoading: true, error: false });
      const isFirstLoad = this.state.refNext ? false : true;

      if (this.state.prefetch_posts) {
        this.manageData(this.state.prefetch_posts, isFirstLoad);
        this.setState({ isLoading: false });
      } else {
        const incoming = await loadData(this.props.numData, this.state.refNext, ...args);
        if (incoming.data !== undefined)
          this.manageData(incoming.data, isFirstLoad);
        else
          throw Error("incoming.data is undefined")
        console.log(`Length data: ${incoming.data.length}`)
        this.setState({ isLoading: false, refNext: incoming.refNext });

        // Prefetch
        if (this.props.prefetch) {
          console.log("Enable prefetch data")
          const prefetch = await loadData(this.props.numData, this.state.refNext, ...args);
          this.manageData(prefetch.data, isFirstLoad, true);
          this.setState({ isLoading: false, refNext: prefetch.refNext });
        }
      }

    } catch (ex) {
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

