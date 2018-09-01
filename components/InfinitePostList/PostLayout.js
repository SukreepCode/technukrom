
export class Tags extends React.Component {

  render() {
    if (this.props.tags !== undefined)
      return <div className="">{
        this.props.tags.map(tag => (
          <div class="tag">#{tag}</div>
        ))
      }</div>
  }
}

export default (props) => (
  <div class="card" key={props.id}>
    <div class="card-content">
      <div class="columns is-mobile">

        <div class="column is-one-fifth">
          {props.isLoading && <div class="ph-row"><div class="ph-col-6 big" /></div>}
          {!props.isLoading && <div class="is-size-7-mobile" dangerouslySetInnerHTML={{ __html: props.left }} />}
        </div>
        <div class="column word-wrap">
          {props.isLoading && <div class="ph-row"><div class="ph-col-12 big" /><div class="ph-col-4" /></div>}
          {!props.isLoading && <div dangerouslySetInnerHTML={{ __html: props.right }} />}
          {/* {!props.isLoading && <Tags tags={props.tags} />} */}
        </div>

      </div>
    </div>
  </div>
)

