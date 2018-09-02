import InfinitePostList from '../components/InfinitePostList';
import { firestore } from '../stores/firebaseInit'
import Base from '../components/layouts/Base'

const initQuery = async () => {
  const settings = { timestampsInSnapshots: true };
  firestore.settings(settings);
  return firestore.collection("posts").orderBy("published", "desc");
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


