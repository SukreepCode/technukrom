import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import firebaseInit from '../stores/firebaseInit'

const Index = (props) => (
  <Layout>
    <h1>Recent Posts</h1>
    <ul>
      {props.posts.map((post) => (
        <li key={post.link}>
          {post.published} » <Link href={post.link}><a>{post.title}</a></Link>
        </li>
      ))}
    </ul>
  </Layout>
)

Index.getInitialProps = async function () {
  const db = await firebaseInit()

  let data = []
  let querySnapshot

  const settings = {/* your settings... */ timestampsInSnapshots: true };
  db.settings(settings);

  try {
    querySnapshot = await db.collection("posts").orderBy("published", "desc").limit(14).get();
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data().published.toDate()}`);
      data.push({
        "title": doc.data().title,
        "link": doc.data().link,
        "published": doc.data().published.toDate().toDateString(),
      });
    })
  } catch (e) {
    console.log('something wrong ', e);
  }

  // await Promise.all(
  //   querySnapshot.forEach((doc) => {
  //     console.log(`${doc.id} => ${doc.data()}`);
  //     data.push({
  //       "title": doc.data().title,
  //       "link": doc.data().link,
  //     });
  //   })
  // )

  console.log(`Show data fetched. Count: ${data.length}`)
  return {
    posts: data
  }
}

export default Index
