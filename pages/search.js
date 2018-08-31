import Base from '../components/layouts/Base'
import React from 'react'
import InfinitePostList from '../components/InfinitePostList'
import firebaseInit from '../stores/firebaseInit'

const initQuery = async (keyword) => {
  const db = await firebaseInit()
  const settings = { timestampsInSnapshots: true };
  db.settings(settings);
  return db.collection("posts").where("tags", "array-contains", keyword).orderBy("published", "desc");
}

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.onSearch = this.onSearch.bind(this);
  }

  onSearch(e) {
    // e.preventDefault();
    if (e.key === 'Enter') {
      const value = e.target.value;
      console.log(`search keyword: ${value}`);
      this.child.initQuery(initQuery(value))
    }
  }

  render() {
    return (
      <Base title="Search" >
        {/* <form> */}
        <h1>ค้นหาเลย.... (Alpha) </h1>
        <input class="input is-rounded" type="text" placeholder="ค้นหา... " onKeyPress={this.onSearch} ></input>
        {/* </form> */}
        <InfinitePostList
          numData={30}
          onRef={ref => (this.child = ref)}
        />
      </Base>

    )
  }
}

