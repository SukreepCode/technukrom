import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import { db } from '../stores/firebaseInit'

const Index = (props) => (
  <Layout>
    <h1>Recent Posts</h1>
    <ul>
      {props.posts.map((post) => (
        <li key={post.link}>
          <Link href={post.link}>
            <a>{post.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
)

Index.getInitialProps = async function () {
  // const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  // const data = await res.json()
  let data = []

  const settings = {/* your settings... */ timestampsInSnapshots: true };
  db.settings(settings);

  try {
    const querySnapshot = await db.collection("posts").get();

    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      // data.push(doc.data());
      data.push({
        "title": doc.data().title,
        "link": doc.data().link,
      });
    });

  } catch (e) {
    console.log('something wrong ', e);
  }

  console.log(`Show data fetched. Count: ${data.length}`)
  return {
    posts: data
  }
}

export default Index
