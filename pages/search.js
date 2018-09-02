import InfinitePostList from '../components/InfinitePostList'
import firebaseInit from '../stores/firebaseInit'
import Base from '../components/layouts/Base'
import { withRouter } from 'next/router'
import UnderConstruction from '../components/layouts/UnderContruction'
import Message from '../components/layouts/Message';

const initQuery = async (keyword) => {
  const db = await firebaseInit()
  const settings = { timestampsInSnapshots: true };
  db.settings(settings);
  return db.collection("posts")
    .where("generated_tags", "array-contains", keyword)
    .orderBy("published", "desc");
}


const onSearch = () => {
  // console.log("enter");
}

class Search extends React.Component {

  state = {
    query: this.props.router.query.s
  }

  onSearchChange(value) {
    this.setState({
      query: value
    });
  }

  render() {
    const props = this.props
    const { query } = this.state;
    // let query_strings = props.router.query.s == undefined ?[]:props.router.query.s.replace(/ +(?= )/g,'').split(" ");
    return (
      <Base title="Search">
        <h1>ค้นหา</h1>
        <p>ค้นหาหัวข้อตามที่สนใจจ้า</p>
        <Message>
          ค้นหาได้แค่ทีละคำนะครับ เป็นข้อจำกัดของ Firestore beta เช่น react
        </Message>
        <form onSubmit={onSearch}>
          <input class="input is-rounded" type="text" name="s" placeholder="keyword, tag, หัวข้อสำคัญ ต่างๆ " value={query} onChange={e => this.onSearchChange(e.target.value)} />
        </form>
        {props.router.query.s &&
          <InfinitePostList
            refInitQuery={initQuery(props.router.query.s)}
            numData={10}
          />}
      </Base>
    )
  }
}

export default withRouter(Search);
