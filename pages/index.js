import InfinitePostList from '../components/InfinitePostList';
import { firestore } from '../stores/firebaseInit'

import Base from '../components/layouts/Base'
import Stat from '../components/Stat';
import PopularTags from '../components/PopularTags';

const NUM_POSTS = 5

const initQuery = async () => {
  const settings = { timestampsInSnapshots: true };
  firestore.settings(settings);
  return firestore.collection("posts").orderBy("published", "desc");
}

const Index = () => (
  <Base title="Technukrom">
    <PopularTags /> 
    <h3>Recent Posts</h3>
    <InfinitePostList 
      refInitQuery={initQuery()} 
      numData={NUM_POSTS}
      />
      <Stat />
  </Base>
)

export default Index
