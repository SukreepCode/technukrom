import InfinitePostList from '../components/InfinitePostList'
import firebaseInit from '../stores/firebaseInit'
import Base from '../components/layouts/Base'
import { withRouter } from 'next/router'

const initQuery = async (keyword) => {
  const db = await firebaseInit()
  const settings = { timestampsInSnapshots: true };
  db.settings(settings);
  return db.collection("posts").where("generated_tags", "array-contains", keyword).orderBy("published", "desc");
}


const onSearch = () => {
  console.log("enter");
}

const Search = withRouter((props) => (
  <Base title="Search">
    <h1>ค้นหา</h1>
    <p>ค้นหาหัวข้อตามที่สนใจจ้า</p>
    <form onSubmit={onSearch}>
      <input class="input is-rounded" type="text" name="s" placeholder="keyword, tag, หัวข้อสำคัญๆ ต่างๆ "  value={props.router.query.s} />
    </form>
    {console.log(props.router.query.s)}
    {props.router.query.s &&
    <InfinitePostList
      refInitQuery={initQuery(props.router.query.s)}
      numData={30}
    /> }
  </Base>
))

export default Search
