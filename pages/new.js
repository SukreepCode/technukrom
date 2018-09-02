import InfinitePostList from '../components/InfinitePostList';
import firebaseInit from '../stores/firebaseInit'
import Base from '../components/layouts/Base'

const initQuery = async () => {
  const db = await firebaseInit()
  const settings = { timestampsInSnapshots: true };
  db.settings(settings);
  return db.collection("posts").orderBy("published", "desc");
}

const New = () => (
  <Base title="Technukrom">
    <InfinitePostList 
      refInitQuery={initQuery()} 
      numData={12}
      />
  </Base>
)

export default New


