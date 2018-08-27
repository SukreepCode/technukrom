import Base from '../components/layouts/Base'
import Link from 'next/link'
import firebaseInit from '../stores/firebaseInit'
import dateFormat from 'dateformat';

const Index = (props) => (
  <Base title="Technukrom">
    <h1>Recent Posts</h1>

    {props.posts.map((post) => (
      <div class="card" key={post.link}>
        <div class="card-content">
          <div class="columns is-mobile">
            <div class="column is-one-fifth">{post.published}</div>
            <div class="column">
             <a href={post.link}>"{post.title}"</a> โดย {post.author}
            </div>
          </div>
        </div>
      </div>
    ))}
  </Base>
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
      // console.log(`${doc.id} => ${doc.data().published.toDate()}`);
      data.push({
        "title": doc.data().title,
        "link": doc.data().link,
        "author": doc.data().author,
        "published": dateFormat(doc.data().published.toDate(), "mediumDate")
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
