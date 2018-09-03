

import { database } from '../../stores/firebaseInit'
import Link from 'next/link'

export default class extends React.Component {

  num_tags = 20;

  state = {
    tags: [],
    isLoading: true
  }

  getDataAsync(ref) {
    return new Promise(
      resolve => {
        ref.once('value', (snapshot) => { resolve(snapshot.val()) })
      })
  }

  async loadToState() {
    let data = await this.getDataAsync(
      database.ref('stats/tag')
        .child('tag_count')
        .orderByValue()
        .limitToLast(this.num_tags))

    let out = []
    for (var key in data) {
      out.push({ 'key': key, 'value': data[key] })
    }

    function compare(a, b) {
      if (a.value > b.value) return -1
      else if (a.value < b.value) return 1
      return 0
    }

    const tags = out.sort(compare)
    console.log(tags)
    this.setState({ isLoading: false, tags: tags })
  }

  componentDidMount() {
    this.loadToState();
  }

  render() {
    const { isLoading, tags } = this.state
    return (
      <div>
        <style jsx>{`
        .tag{
          background-color: #E3F2FD;
        }
        .text-placeholder{
          height: 3.6rem;
        }
        `}</style>

        <h4>Top Topic</h4>
        <div class={`element ${isLoading?"is-loading":""}`}>
          { !isLoading && 
            <div className="is-size-6">{
              tags.map(tag => (
              <div className="tag" key={tag.key}>
              <Link href={`/search?s=${encodeURIComponent(tag.key)}`} ><a>{tag.key}</a></Link> 
              </div>
            ))
            }</div>
          }
        {isLoading && <div className="text-placeholder"></div>}
        </div>
        
      </div>
    )
  }

}
