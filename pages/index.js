import InfinitePostList from '../components/InfinitePostList';
import { firestore } from '../stores/firebaseInit'

import Base from '../components/layouts/Base'
import Stat from '../components/layouts/Stat';
import PopularTags from '../components/layouts/PopularTags';

const NUM_POSTS = 5

const initQuery = async () => {
  const settings = { timestampsInSnapshots: true };
  firestore.settings(settings);
  return firestore.collection("posts").orderBy("published", "desc");
}

const Index = () => (
  <Base title="Technukrom">
    <PopularTags /> 
    <h3>{NUM_POSTS} โพสล่าสุด</h3>
    <InfinitePostList 
      refInitQuery={initQuery()} 
      numData={NUM_POSTS}
      />
      <Stat />
  </Base>
)

export default Index
