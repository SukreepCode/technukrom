import Base from '../components/layouts/Base'
import firebaseInit from '../stores/firebaseInit'
import dateFormat from 'dateformat';
import React from 'react';
import PostItem from '../components/PostItem';
import Document from 'next/document'
// import Pagination from '../components/Pagination';

const NUM_DATA = 20;

export default class New extends Document {

  constructor(props) {
    super(props)
    this.state = {
      posts: this.createEmptyPosts(NUM_DATA),
      prefetch_posts: null,
      refNext: null,
      refQuery: null,
      isLoading: true,
    };
    this.loadMore = this.loadMore.bind(this);
  }

  handleQuery(ref, isFirstLoad, isPrefetch = false) {
    // Fetch query of given reference
    return new Promise((resolve, reject) => {
      ref.get().then((documentSnapshots) => {
        this.setState({ isLoading: false });

        // If documentSnapshots is empty, then we have loaded all
        if (documentSnapshots.empty) {
          resolve(documentSnapshots);
        };

        let i = 0;
        // if (isClear) this.setState({ posts: [] });

        var tmp_data = []

        documentSnapshots.forEach((doc) => {

          tmp_data.push({
            "post_index": i++,
            "id": doc.id,
            "title": doc.data().title,
            "link": doc.data().link,
            "author": doc.data().author,
            "published": dateFormat(doc.data().published.toDate(), "mediumDate"),
            "isLoading": false,
          });
        });

        console.log(tmp_data)

        if (isPrefetch)
          this.setState({ prefetch_posts: tmp_data })
        else {
          if (isFirstLoad) {
            for (var j = 0; j < NUM_DATA; j++) {
              this.state.posts[j] = tmp_data[j];
            }
            // this.setState({ posts: this.state.posts.concat(tmp_data) })
          } else
            this.setState({ posts: this.state.posts.concat(tmp_data) })
        }

        // Build a reference for next page
        const lastVisible = documentSnapshots.docs[documentSnapshots.size - 1];
        if (!lastVisible) return;
        this.setState({ refNext: ref.startAfter(lastVisible) })

        resolve(documentSnapshots);

      })
    })
  }

  getData() {
    try {

      if (this.state.prefetch_posts) {
        // Restore prefecth page
        this.setState({ posts: this.state.posts.concat(this.state.prefetch_posts) })
      } else {
        // No prefetch data, then get current page
        if (this.state.refNext === null) {
          // clear state.posts for loading animation
          // Perform query from first query (first visible)
          this.handleQuery(this.state.refQuery.limit(NUM_DATA), true);
        } else {
          // Perform query from last visible page
          this.handleQuery(this.state.refNext.limit(NUM_DATA), false);
        }
      }

      // Finish? then, call prefetch
      this.handleQuery(this.state.refNext.limit(NUM_DATA), false, true);

    } catch (e) {
      console.log('something wrong ', e);
    }
  }

  async initQuery() {
    const db = await firebaseInit()
    const settings = {/* your settings... */ timestampsInSnapshots: true };
    db.settings(settings);
    this.setState({ refQuery: db.collection("posts").orderBy("published", "desc") });
  }

  async componentDidMount() {
    await this.initQuery();
    this.getData();
  }

  async loadMore() {
    this.setState({ isLoading: true });
    this.getData();
    // e.preventDefault();
  }

  render() {

    return (

      <Base title="Technukrom">
        {this.state.posts.map((post) => (
          <PostItem post={post} />
        ))}
        {/* <Pagination page={this.props.page} /> */}
        <center><a class={`button is-primary ${this.state.isLoading ? "is-loading" : ""}`} onClick={this.loadMore}>ดูเพิ่มเติม</a></center>
      </Base>
    )
  }

  static async getInitialProps({ pathname, query }) {
    const page = query.page === undefined ? 1 : query.page;
    return { page: page };
  }

  createEmptyPosts(numData) {
    let posts = []
    for (var i = 0; i < numData; i++) {
      posts.push({ "isLoading": true })
    }
    return posts
  }

}
