import Base from '../components/layouts/Base'
import firebaseInit from '../stores/firebaseInit'
import dateFormat from 'dateformat';
import React from 'react';
import PostItem from '../components/PostItem';
import Document from 'next/document'
import Pagination from '../components/Pagination';

const NUM_DATA = 14;

export default class Index extends Document {

  constructor(props) {
    super(props)
    this.state = {
      posts: createEmptyPosts()
    };
  }

  async getData(page) {
    const db = await firebaseInit()
    let data = []
    let querySnapshot
    const settings = {/* your settings... */ timestampsInSnapshots: true };
    db.settings(settings);
    try {
      let first = db.collection("posts").orderBy("published", "desc").limit(NUM_DATA)
      if (page == 1)
        querySnapshot = await first.get()
      else {
        querySnapshot = await first.get().then(function (documentSnapshots) {
          // Get the last visible document
          var lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - page];
          console.log("last", lastVisible);

          // Construct a new query starting at this document,
          var next = db.collection("posts").orderBy("published", "desc").startAfter(lastVisible).limit(NUM_DATA)
          return next.get();
        });
      }

      let i = 0;
      querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data().published.toDate()}`);
        data.push({
          "post_index": i++,
          "id": doc.id,
          "title": doc.data().title,
          "link": doc.data().link,
          "author": doc.data().author,
          "published": dateFormat(doc.data().published.toDate(), "mediumDate"),
          "isLoading": false
        });
      })
    } catch (e) {
      console.log('something wrong ', e);
    }

    // console.log(`Show data fetched. Count: ${data.length}`)
    this.setState({ posts: data })
  }
  async componentDidMount() {
    await this.getData(this.props.page);
  }

  render() {
    return (

      <Base title="Technukrom">
        <h1>Recent Posts</h1>
        <Pagination page={this.props.page} />

        {this.state.posts.map((post) => (
          <PostItem post={post} />
        ))}
        <Pagination page={this.props.page} />
      </Base>
    )
  }

  static async getInitialProps({ pathname, query }) {
    // const feed = pathname === '/' ? '/news' : pathname
    console.log(query.page);
    const page = query.page === undefined ? 1 : query.page;
    console.log(page);
    return { page: page };
  }
}

export function createEmptyPosts() {
  let posts = []
  for (var i = 0; i < NUM_DATA; i++) {
    posts.push({ "isLoading": true })
  }
  return posts
}

