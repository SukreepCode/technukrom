import Base from '../components/layouts/Base'
import firebaseInit from '../stores/firebaseInit'
import dateFormat from 'dateformat';
import React from 'react';
import PostItem from '../components/PostItem';
import Document from 'next/document'
import Link from 'next/link'
// import Pagination from '../components/Pagination';

const NUM_DATA = 20;
const PAGE_URL = '/#/page/'

export default class Index extends Document {

  constructor(props) {
    super(props)
    this.state = {
      posts: this.createEmptyPosts(NUM_DATA),
      prefetch_posts: null,
      refNext: null,
      refQuery: null,
      isLoading: true,
      page: 1,
    };
    this.loadMore = this.loadMore.bind(this);

  }

  handleQueryPagination(ref, isModifyPlaceholder = true, isPrefetch = false, page = 1, isPaginated) {
    console.log(page);
    if (isModifyPlaceholder) {
      console.log(`First Load page: ${page}`);
      if (page == 1)
        this.handleQuery(ref, isModifyPlaceholder, isPrefetch, page);
      else {
        this.handleQuery(ref, isModifyPlaceholder, isPrefetch, page)
        return this.handleQueryPagination(ref, isModifyPlaceholder, isPrefetch, page - 1);
      }
    } else {
      console.log(`Load more page: ${page}`);
      this.handleQuery(ref, isModifyPlaceholder, isPrefetch, page);
    }
    this.setState({ isLoading: false });
  }

  handleQuery(ref, isModifyPlaceholder = true, isPrefetch = false, page = 1) {
    // Fetch query of given reference
    return new Promise((resolve, reject) => {
      ref.get().then((documentSnapshots) => {
        // this.setState({ isLoading: false });

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
            "isLoading": false
          });
        });

        if (isPrefetch)
          this.setState({ prefetch_posts: tmp_data })
        else {
          if (page == 1) {
            console.log("Hey");
            for (var j = 0; j < NUM_DATA; j++) {
              this.state.posts[j] = tmp_data[j];
            }
            // this.setState({ posts: this.state.posts.concat(tmp_data) })
          }else {
            // Load data to view
            console.log(tmp_data);
            this.setState({ posts: this.state.posts.concat(tmp_data) })
          }
        }

        // Build a reference for next page
        const lastVisible = documentSnapshots.docs[documentSnapshots.size - 1];
        if (!lastVisible) return;
        this.setState({ refNext: ref.startAfter(lastVisible) })

        resolve(documentSnapshots);

      })
    })
  }

  getData(isFirstLoad) {

    try {

      if (this.state.prefetch_posts) {
        // Restore prefecth page
        this.setState({ posts: this.state.posts.concat(this.state.prefetch_posts) })
      } else {
        // No prefetch data, then get current page
        if (this.state.refNext === null) {
          // Perform query from first query (first visible)
          this.handleQueryPagination(this.state.refQuery.limit(NUM_DATA), true, false, this.state.page, isFirstLoad);
        } else {
          // Perform query from last visible page
          this.handleQueryPagination(this.state.refNext.limit(NUM_DATA), false, false, this.state.page, isFirstLoad);
        }
      }

      // Finish? then, call prefetch
      if (this.state.refNext !== null)
        this.handleQuery(this.state.refNext.limit(NUM_DATA), false, true);

    } catch (e) {
      console.log('something wrong ', e);
    }
  }

  async initQuery() {
    const db = await firebaseInit()
    const settings = { timestampsInSnapshots: true };
    db.settings(settings);
    this.setState({ refQuery: db.collection("posts").orderBy("published", "desc") });
  }

  async componentDidMount() {
    const href = window.location.href;
    const search = href.search(PAGE_URL)
    let page = 1;
    if (search >= 0) {
      try {
        page = parseInt(href.substring(search + PAGE_URL.length, href.length))
      } catch (e) { }
    }
    this.setState({ page: page })
    await this.initQuery();
    this.getData(false);
  }

  async loadMore() {
    console.log(window.location.href);
    // window.location.pathname = window.location.pathname + "\#/page";
    this.setState({ isLoading: true });
    this.setState({ page: this.state.page + 1 })
    this.getData(true);
    // e.preventDefault();
  }

  render() {

    return (

      <Base title="Technukrom">
        {this.state.posts.map((post) => (
          <PostItem post={post} />
        ))}
        {/* <Pagination page={this.props.page} /> */}
        <center>
          <Link href={`${PAGE_URL}${this.state.page + 1}`}>
            <a class={`button is-primary ${this.state.isLoading ? "is-loading" : ""}`} onClick={this.loadMore}>ดูเพิ่มเติม</a>
          </Link>
        </center>
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
