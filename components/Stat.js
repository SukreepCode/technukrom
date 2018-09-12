

import { database } from '../stores/firebaseInit'

export default class extends React.Component {

  state = {
    numPost: 0,
    numSource: 0,
    isLoading: true
  }

  getDataAsync(ref) {
    return new Promise(
      resolve => {
        ref.once('value', (snapshot) => { resolve(snapshot.val()) })
      })
  }

  async loadToState() {
    let data = await this.getDataAsync(database.ref('stats').child('post'))
    this.setState({ numPost: data.num_all_posts} )
    data = await this.getDataAsync(database.ref('stats').child('source'))
    this.setState({ isLoading: false, numSource: data.num_sources })
  }

  componentDidMount(){
    this.loadToState();
  }

  render() {
    const { isLoading } = this.state
    return (
      <div>
        <style jsx>{`
          .text-placeholder{
            height: 1.5rem;
          }
        `}</style>
        <h3>สถิติ</h3>
        <div className="columns is-mobile">
          <div className="column">
            <div className="card"><div className="card-content has-text-centered">
              <h5># บทความ</h5>
              <div className={`element ${isLoading?"is-loading":""}`}>
                {!isLoading && this.state.numPost}
                {isLoading && <div className="text-placeholder"></div>}
              </div>
            </div></div>
          </div>
          <div className="column">
            <div className="card"><div className="card-content has-text-centered">
              <h5># แหล่งที่มา</h5>
              <div className={`element ${isLoading?"is-loading":""}`}>
                {!isLoading && this.state.numSource}
                {isLoading && <div className="text-placeholder"></div>}
              </div>
            </div></div>
          </div>
        </div>
      </div>
    )
  }

}
